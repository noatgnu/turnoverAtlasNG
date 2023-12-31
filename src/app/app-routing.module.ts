import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ProteinViewComponent} from "./protein-view/protein-view.component";
import {HomeComponent} from "./home/home.component";
import {ProteinSummaryComponent} from "./protein-summary/protein-summary.component";

const routes: Routes = [
  {path: 'protein-view/:proteinGroup', component: ProteinViewComponent},
  {path: 'protein-summary/:proteinGroup', component: ProteinSummaryComponent},
  {path: 'home', component: HomeComponent},
  {path: '', redirectTo: '/home', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true, bindToComponentInputs: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
