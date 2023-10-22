import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ProteinViewComponent} from "./protein-view/protein-view.component";

const routes: Routes = [
  {path: 'protein-view/:proteinGroup', component: ProteinViewComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true, bindToComponentInputs: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
