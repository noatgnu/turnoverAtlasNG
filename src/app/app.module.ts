import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


import * as PlotlyJS from 'plotly.js-dist-min';
import { PlotlyModule } from 'angular-plotly.js';
import {HttpClientModule} from "@angular/common/http";
import { ProteinSearchComponent } from './protein-search/protein-search.component';
import { NavbarComponent } from './navbar/navbar.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { ProteinViewComponent } from './protein-view/protein-view.component';
import {provideRouter} from "@angular/router";
import { ScatterTimePlotComponent } from './scatter-time-plot/scatter-time-plot.component';
import { ProteinViewPeptideContainerComponent } from './protein-view-peptide-container/protein-view-peptide-container.component';
import { ProteinViewScatterHVsLComponent } from './protein-view-scatter-h-vs-l/protein-view-scatter-h-vs-l.component';
import { ProteinViewTissueBasedComponent } from './protein-view-tissue-based/protein-view-tissue-based.component';
import { ProteinViewPeptideCollectionComponent } from './protein-view-peptide-collection/protein-view-peptide-collection.component';
import { ViolinTimePlotComponent } from './violin-time-plot/violin-time-plot.component';

PlotlyModule.plotlyjs = PlotlyJS;
@NgModule({
  declarations: [
    AppComponent,
    ProteinSearchComponent,
    NavbarComponent,
    ProteinViewComponent,
    ScatterTimePlotComponent,
    ProteinViewPeptideContainerComponent,
    ProteinViewScatterHVsLComponent,
    ProteinViewTissueBasedComponent,
    ProteinViewPeptideCollectionComponent,
    ViolinTimePlotComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    PlotlyModule, HttpClientModule, FormsModule, ReactiveFormsModule
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
