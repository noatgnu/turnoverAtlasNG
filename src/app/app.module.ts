import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


import * as PlotlyJS from 'plotly.js-dist-min';
import { PlotlyModule } from 'angular-plotly.js';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
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
import { ProteinModellingCollectionComponent } from './protein-modelling-collection/protein-modelling-collection.component';
import { ProteinModellingComponent } from './protein-modelling/protein-modelling.component';
import { ProteinTauDistributionComponent } from './protein-tau-distribution/protein-tau-distribution.component';
import { ProteinTauCollectionComponent } from './protein-tau-collection/protein-tau-collection.component';
import { ToastComponent } from './toast/toast.component';
import { FloatingPanelsComponent } from './floating-panels/floating-panels.component';
import {NgxColorsModule} from "ngx-colors";
import { MergePromptComponent } from './merge-prompt/merge-prompt.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { CoveragePlotComponent } from './coverage-plot/coverage-plot.component';
import { VariantSelectorComponent } from './variant-selector/variant-selector.component';
import { HomeComponent } from './home/home.component';
import {AuthInterceptor} from "./auth.interceptor";

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
    ViolinTimePlotComponent,
    ProteinModellingCollectionComponent,
    ProteinModellingComponent,
    ProteinTauDistributionComponent,
    ProteinTauCollectionComponent,
    ToastComponent,
    FloatingPanelsComponent,
    MergePromptComponent,
    CoveragePlotComponent,
    VariantSelectorComponent,
    HomeComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        NgbModule,
        PlotlyModule, HttpClientModule, FormsModule, ReactiveFormsModule, NgxColorsModule, BrowserAnimationsModule
    ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
