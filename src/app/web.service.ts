import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, of, Subject} from "rxjs";
import {AccessionMap, AccessionMapQuery} from "./accession-map";
import {Sample, SampleQuery} from "./sample";
import {MSDataQuery} from "./msdata";

@Injectable({
  providedIn: 'root'
})
export class WebService {

  sampleMap: {[key: string]: Sample} = {}
  baseUrl = "http://localhost:8000"
  selectedSamples: string[] = []
  defaultColorList: string[] = [
    "#fd7f6f",
    "#7eb0d5",
    "#b2e061",
    "#bd7ebe",
    "#ffb55a",
    "#ffee65",
    "#beb9db",
    "#fdcce5",
    "#8bd3c7",
  ]

  colorMap: any = {}

  redrawSubject: Subject<boolean> = new Subject<boolean>()
  constructor(private http: HttpClient) { }

  searchProtein(proteinGroup: string, distinct: boolean = true) {
    if (proteinGroup === "") {
      return of([])
    }

    const params: any =  {Protein_Group: proteinGroup}
    if (distinct) {
      params["distinct"] = "Protein_Group"
    }

    return this.http.get<AccessionMapQuery>(`${this.baseUrl}/api/accessionmap/`, {params:params}).pipe(
      map((data: AccessionMapQuery) => {return data.results.map((d: AccessionMap) => d.Protein_Group)})
    )
  }

  getSampleMetadata() {
    return this.http.get<SampleQuery>(`${this.baseUrl}/api/samplegroupmetadata/`, {responseType: 'json', observe: 'body', params: {page_size: "60"}}).pipe(
      map((data: SampleQuery) => {return data.results})
    )
  }

  getMSData(proteinGroup: string) {
    return this.http.get<MSDataQuery>(`${this.baseUrl}/api/turnoverdata/`, {responseType: 'json', observe: 'body', params: {Protein_Group: proteinGroup, page_size: 100000}}).pipe(
      map((data: MSDataQuery) => {return data.results})
    )
  }
}
