import { Component } from '@angular/core';
import {catchError, debounceTime, distinctUntilChanged, Observable, of, OperatorFunction, switchMap, tap} from "rxjs";
import {WebService} from "../web.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  proteinSearchModel: string = ""
  searching = false
  searchFailed = false
  //typeahead function for search model
  search: OperatorFunction<string, readonly string[]> = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      tap(() => this.searching = true),
      switchMap((term: string) =>
          this.web.typeAheadSearchTerm(term, this.searchType).pipe(
        tap(() => this.searchFailed = false),
        catchError(() => {
          this.searchFailed = true;
          return of([]);
          }),
        ),
      ),
      tap(() => this.searching = false)
    )

  searchType = "Protein_Group"

  resultFormatter = (x: string, term: string) => {
    //truncate long protein names to maximum 10 characters that match the search term
    if (x.length > 10) {
      const position = x.toLowerCase().indexOf(term.toLowerCase())
      // get 5 characters before and after the search term
      const start = Math.max(0, position - 5)
      const end = Math.min(x.length, position + 5)
      const result = x.substring(start, end)
      return result
    } else {
      return x
    }
  }

  constructor(private web: WebService, private router: Router) {
  }

  searchData() {
    this.router.navigate(['protein-view', this.proteinSearchModel]).then(r => console.log(r))
  }

  save() {
    this.web.settings.download()
  }

  loadSettingFromFile(event: any) {
    if ("target" in event && "files" in event.target && event.target.files.length > 0) {
      const file = event.target.files[0]
        const reader = new FileReader()
        reader.onload = (e) => {
          if (e.target) {
            const target = e.target as FileReader
            this.web.settings.import(JSON.parse(target.result as string))
            this.web.restoreSubject.next(true)
          }
        }
        reader.readAsText(file)
    }
  }
}
