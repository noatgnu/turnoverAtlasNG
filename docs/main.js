"use strict";
(self["webpackChunkturnoverAtlasNG"] = self["webpackChunkturnoverAtlasNG"] || []).push([["main"],{

/***/ 3580:
/*!*************************************!*\
  !*** ./src/app/accounts.service.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AccountsService: () => (/* binding */ AccountsService)
/* harmony export */ });
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ 4860);
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../environments/environment */ 553);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 1699);




class AccountsService {
  constructor(http) {
    this.http = http;
    this.token = "";
    this.loggedIn = false;
    this.baseUrl = _environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.baseUrl;
  }
  login(username, password) {
    this.loggedIn = false;
    const headers = new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__.HttpHeaders();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    return this.http.post(this.baseUrl + "/api-token-auth/", {
      username: username,
      password: password
    });
  }
  static #_ = this.ɵfac = function AccountsService_Factory(t) {
    return new (t || AccountsService)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_1__.HttpClient));
  };
  static #_2 = this.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjectable"]({
    token: AccountsService,
    factory: AccountsService.ɵfac,
    providedIn: 'root'
  });
}

/***/ }),

/***/ 3966:
/*!***************************************!*\
  !*** ./src/app/app-routing.module.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AppRoutingModule: () => (/* binding */ AppRoutingModule)
/* harmony export */ });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ 7947);
/* harmony import */ var _protein_view_protein_view_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./protein-view/protein-view.component */ 2569);
/* harmony import */ var _home_home_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./home/home.component */ 6459);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 1699);





const routes = [{
  path: 'protein-view/:proteinGroup',
  component: _protein_view_protein_view_component__WEBPACK_IMPORTED_MODULE_0__.ProteinViewComponent
}, {
  path: 'home',
  component: _home_home_component__WEBPACK_IMPORTED_MODULE_1__.HomeComponent
}, {
  path: '',
  redirectTo: '/home',
  pathMatch: 'full'
}];
class AppRoutingModule {
  static #_ = this.ɵfac = function AppRoutingModule_Factory(t) {
    return new (t || AppRoutingModule)();
  };
  static #_2 = this.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineNgModule"]({
    type: AppRoutingModule
  });
  static #_3 = this.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjector"]({
    imports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule.forRoot(routes, {
      useHash: true,
      bindToComponentInputs: true
    }), _angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule]
  });
}
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵsetNgModuleScope"](AppRoutingModule, {
    imports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule],
    exports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule]
  });
})();

/***/ }),

/***/ 6401:
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AppComponent: () => (/* binding */ AppComponent)
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs */ 4300);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 1699);
/* harmony import */ var _web_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./web.service */ 5148);
/* harmony import */ var _toast_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./toast.service */ 6837);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/router */ 7947);
/* harmony import */ var _navbar_navbar_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./navbar/navbar.component */ 2247);
/* harmony import */ var _toast_toast_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./toast/toast.component */ 2080);







class AppComponent {
  constructor(web, toastService) {
    this.web = web;
    this.toastService = toastService;
    this.initialize();
    this.web.initializeModelParameters.asObservable().subscribe(data => {
      this.initialize();
    });
  }
  initialize() {
    (0,rxjs__WEBPACK_IMPORTED_MODULE_4__.forkJoin)([this.web.getSampleMetadata(), this.web.getAllModelParameters()]).subscribe(data => {
      this.toastService.show('Initialization', 'Loading sample metadata and model parameters...');
      for (const s of data[0]) {
        this.web.settings.sampleMap[s.Sample_Name] = s;
      }
      this.web.modelParameters = data[1];
    }, error => {
      this.toastService.show('Initialization', 'Error loading sample metadata and model parameters. Please log in.');
    });
  }
  static #_ = this.ɵfac = function AppComponent_Factory(t) {
    return new (t || AppComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](_web_service__WEBPACK_IMPORTED_MODULE_0__.WebService), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](_toast_service__WEBPACK_IMPORTED_MODULE_1__.ToastService));
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineComponent"]({
    type: AppComponent,
    selectors: [["app-root"]],
    decls: 3,
    vars: 0,
    template: function AppComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](0, "app-toast")(1, "app-navbar")(2, "router-outlet");
      }
    },
    dependencies: [_angular_router__WEBPACK_IMPORTED_MODULE_6__.RouterOutlet, _navbar_navbar_component__WEBPACK_IMPORTED_MODULE_2__.NavbarComponent, _toast_toast_component__WEBPACK_IMPORTED_MODULE_3__.ToastComponent],
    styles: ["/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsInNvdXJjZVJvb3QiOiIifQ== */"]
  });
}

/***/ }),

/***/ 8629:
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AppModule: () => (/* binding */ AppModule)
/* harmony export */ });
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! @angular/platform-browser */ 6480);
/* harmony import */ var _app_routing_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./app-routing.module */ 3966);
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./app.component */ 6401);
/* harmony import */ var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ 6101);
/* harmony import */ var plotly_js_dist_min__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! plotly.js-dist-min */ 5045);
/* harmony import */ var plotly_js_dist_min__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(plotly_js_dist_min__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var angular_plotly_js__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! angular-plotly.js */ 4676);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! @angular/common/http */ 4860);
/* harmony import */ var _protein_search_protein_search_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./protein-search/protein-search.component */ 8796);
/* harmony import */ var _navbar_navbar_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./navbar/navbar.component */ 2247);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! @angular/forms */ 8849);
/* harmony import */ var _protein_view_protein_view_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./protein-view/protein-view.component */ 2569);
/* harmony import */ var _scatter_time_plot_scatter_time_plot_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./scatter-time-plot/scatter-time-plot.component */ 945);
/* harmony import */ var _protein_view_peptide_container_protein_view_peptide_container_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./protein-view-peptide-container/protein-view-peptide-container.component */ 3187);
/* harmony import */ var _protein_view_scatter_h_vs_l_protein_view_scatter_h_vs_l_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./protein-view-scatter-h-vs-l/protein-view-scatter-h-vs-l.component */ 7650);
/* harmony import */ var _protein_view_tissue_based_protein_view_tissue_based_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./protein-view-tissue-based/protein-view-tissue-based.component */ 3618);
/* harmony import */ var _protein_view_peptide_collection_protein_view_peptide_collection_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./protein-view-peptide-collection/protein-view-peptide-collection.component */ 225);
/* harmony import */ var _violin_time_plot_violin_time_plot_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./violin-time-plot/violin-time-plot.component */ 7396);
/* harmony import */ var _protein_modelling_collection_protein_modelling_collection_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./protein-modelling-collection/protein-modelling-collection.component */ 6280);
/* harmony import */ var _protein_modelling_protein_modelling_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./protein-modelling/protein-modelling.component */ 798);
/* harmony import */ var _protein_tau_distribution_protein_tau_distribution_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./protein-tau-distribution/protein-tau-distribution.component */ 1910);
/* harmony import */ var _protein_tau_collection_protein_tau_collection_component__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./protein-tau-collection/protein-tau-collection.component */ 4977);
/* harmony import */ var _toast_toast_component__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./toast/toast.component */ 2080);
/* harmony import */ var _floating_panels_floating_panels_component__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./floating-panels/floating-panels.component */ 9897);
/* harmony import */ var ngx_colors__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! ngx-colors */ 6334);
/* harmony import */ var _merge_prompt_merge_prompt_component__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./merge-prompt/merge-prompt.component */ 7572);
/* harmony import */ var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(/*! @angular/platform-browser/animations */ 4987);
/* harmony import */ var _coverage_plot_coverage_plot_component__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./coverage-plot/coverage-plot.component */ 3156);
/* harmony import */ var _variant_selector_variant_selector_component__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./variant-selector/variant-selector.component */ 8150);
/* harmony import */ var _home_home_component__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./home/home.component */ 6459);
/* harmony import */ var _auth_interceptor__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./auth.interceptor */ 1763);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! @angular/core */ 1699);































angular_plotly_js__WEBPACK_IMPORTED_MODULE_23__.PlotlyModule.plotlyjs = plotly_js_dist_min__WEBPACK_IMPORTED_MODULE_2__;
class AppModule {
  static #_ = this.ɵfac = function AppModule_Factory(t) {
    return new (t || AppModule)();
  };
  static #_2 = this.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵdefineNgModule"]({
    type: AppModule,
    bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_1__.AppComponent]
  });
  static #_3 = this.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵdefineInjector"]({
    providers: [{
      provide: _angular_common_http__WEBPACK_IMPORTED_MODULE_25__.HTTP_INTERCEPTORS,
      useClass: _auth_interceptor__WEBPACK_IMPORTED_MODULE_22__.AuthInterceptor,
      multi: true
    }],
    imports: [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_26__.BrowserModule, _app_routing_module__WEBPACK_IMPORTED_MODULE_0__.AppRoutingModule, _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_27__.NgbModule, angular_plotly_js__WEBPACK_IMPORTED_MODULE_23__.PlotlyModule, _angular_common_http__WEBPACK_IMPORTED_MODULE_25__.HttpClientModule, _angular_forms__WEBPACK_IMPORTED_MODULE_28__.FormsModule, _angular_forms__WEBPACK_IMPORTED_MODULE_28__.ReactiveFormsModule, ngx_colors__WEBPACK_IMPORTED_MODULE_29__.NgxColorsModule, _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_30__.BrowserAnimationsModule]
  });
}
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵsetNgModuleScope"](AppModule, {
    declarations: [_app_component__WEBPACK_IMPORTED_MODULE_1__.AppComponent, _protein_search_protein_search_component__WEBPACK_IMPORTED_MODULE_3__.ProteinSearchComponent, _navbar_navbar_component__WEBPACK_IMPORTED_MODULE_4__.NavbarComponent, _protein_view_protein_view_component__WEBPACK_IMPORTED_MODULE_5__.ProteinViewComponent, _scatter_time_plot_scatter_time_plot_component__WEBPACK_IMPORTED_MODULE_6__.ScatterTimePlotComponent, _protein_view_peptide_container_protein_view_peptide_container_component__WEBPACK_IMPORTED_MODULE_7__.ProteinViewPeptideContainerComponent, _protein_view_scatter_h_vs_l_protein_view_scatter_h_vs_l_component__WEBPACK_IMPORTED_MODULE_8__.ProteinViewScatterHVsLComponent, _protein_view_tissue_based_protein_view_tissue_based_component__WEBPACK_IMPORTED_MODULE_9__.ProteinViewTissueBasedComponent, _protein_view_peptide_collection_protein_view_peptide_collection_component__WEBPACK_IMPORTED_MODULE_10__.ProteinViewPeptideCollectionComponent, _violin_time_plot_violin_time_plot_component__WEBPACK_IMPORTED_MODULE_11__.ViolinTimePlotComponent, _protein_modelling_collection_protein_modelling_collection_component__WEBPACK_IMPORTED_MODULE_12__.ProteinModellingCollectionComponent, _protein_modelling_protein_modelling_component__WEBPACK_IMPORTED_MODULE_13__.ProteinModellingComponent, _protein_tau_distribution_protein_tau_distribution_component__WEBPACK_IMPORTED_MODULE_14__.ProteinTauDistributionComponent, _protein_tau_collection_protein_tau_collection_component__WEBPACK_IMPORTED_MODULE_15__.ProteinTauCollectionComponent, _toast_toast_component__WEBPACK_IMPORTED_MODULE_16__.ToastComponent, _floating_panels_floating_panels_component__WEBPACK_IMPORTED_MODULE_17__.FloatingPanelsComponent, _merge_prompt_merge_prompt_component__WEBPACK_IMPORTED_MODULE_18__.MergePromptComponent, _coverage_plot_coverage_plot_component__WEBPACK_IMPORTED_MODULE_19__.CoveragePlotComponent, _variant_selector_variant_selector_component__WEBPACK_IMPORTED_MODULE_20__.VariantSelectorComponent, _home_home_component__WEBPACK_IMPORTED_MODULE_21__.HomeComponent],
    imports: [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_26__.BrowserModule, _app_routing_module__WEBPACK_IMPORTED_MODULE_0__.AppRoutingModule, _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_27__.NgbModule, angular_plotly_js__WEBPACK_IMPORTED_MODULE_23__.PlotlyModule, _angular_common_http__WEBPACK_IMPORTED_MODULE_25__.HttpClientModule, _angular_forms__WEBPACK_IMPORTED_MODULE_28__.FormsModule, _angular_forms__WEBPACK_IMPORTED_MODULE_28__.ReactiveFormsModule, ngx_colors__WEBPACK_IMPORTED_MODULE_29__.NgxColorsModule, _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_30__.BrowserAnimationsModule]
  });
})();

/***/ }),

/***/ 1763:
/*!*************************************!*\
  !*** ./src/app/auth.interceptor.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AuthInterceptor: () => (/* binding */ AuthInterceptor)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 1699);
/* harmony import */ var _accounts_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./accounts.service */ 3580);


class AuthInterceptor {
  constructor(accounts) {
    this.accounts = accounts;
  }
  intercept(request, next) {
    // add authorization header with token if available from accounts service
    if (this.accounts.token !== "" && !request.url.endsWith("/api-token-auth/")) {
      request = request.clone({
        setHeaders: {
          Authorization: `Token ${this.accounts.token}`
        }
      });
    }
    console.log(request);
    return next.handle(request);
  }
  static #_ = this.ɵfac = function AuthInterceptor_Factory(t) {
    return new (t || AuthInterceptor)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_accounts_service__WEBPACK_IMPORTED_MODULE_0__.AccountsService));
  };
  static #_2 = this.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({
    token: AuthInterceptor,
    factory: AuthInterceptor.ɵfac
  });
}

/***/ }),

/***/ 3156:
/*!**********************************************************!*\
  !*** ./src/app/coverage-plot/coverage-plot.component.ts ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CoveragePlotComponent: () => (/* binding */ CoveragePlotComponent)
/* harmony export */ });
/* harmony import */ var data_forge__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! data-forge */ 7090);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ 8849);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 1699);
/* harmony import */ var _web_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../web.service */ 5148);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ 6575);
/* harmony import */ var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ 6101);
/* harmony import */ var angular_plotly_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! angular-plotly.js */ 4676);








function CoveragePlotComponent_option_13_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "option", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const tissue_r3 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("value", tissue_r3);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](tissue_r3);
  }
}
function CoveragePlotComponent_plotly_plot_22_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](0, "plotly-plot", 19);
  }
  if (rf & 2) {
    const e_r4 = ctx.$implicit;
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("revision", ctx_r2.revision)("data", ctx_r2.graphDataMap[e_r4])("layout", ctx_r2.graphLayoutMap[e_r4]);
  }
}
const _c0 = function (a1) {
  return {
    "accordion-button": true,
    "collapsed": a1
  };
};
class CoveragePlotComponent {
  set coverageData(value) {
    this._coverageData = value;
    this.df = new data_forge__WEBPACK_IMPORTED_MODULE_0__.DataFrame(Object.values(value.turnover_data));
    this.tissues = this.df.getSeries("Tissue").distinct().toArray();
    this.form.controls['tissues'].setValue(this.tissues[0]);
    this.updateDisplay();
  }
  get coverageData() {
    return this._coverageData;
  }
  constructor(web, fb) {
    this.web = web;
    this.fb = fb;
    this._coverageData = undefined;
    this.df = new data_forge__WEBPACK_IMPORTED_MODULE_0__.DataFrame();
    this.tissues = [];
    this.displayDF = new data_forge__WEBPACK_IMPORTED_MODULE_0__.DataFrame();
    this.engines = [];
    this.iscollapse = true;
    this.revision = 0;
    this.graphData = [];
    this.graphLayout = {
      title: "",
      autosize: true,
      width: 1200,
      hovermode: false,
      xaxis: {
        title: "Position",
        range: [0, 100],
        showticklabels: false,
        showgrid: false,
        zeroline: false,
        visible: false
      },
      yaxis: {
        showticklabels: false,
        range: [0, 100],
        type: "category",
        fixedrange: true,
        showgrid: false,
        zeroline: false,
        visible: false
      },
      shapes: []
    };
    this.graphLayoutMap = {};
    this.graphDataMap = {};
    this.form = this.fb.group({
      tissues: new _angular_forms__WEBPACK_IMPORTED_MODULE_3__.FormControl("", _angular_forms__WEBPACK_IMPORTED_MODULE_3__.Validators.required),
      valid_tau: new _angular_forms__WEBPACK_IMPORTED_MODULE_3__.FormControl(true),
      selected_only: new _angular_forms__WEBPACK_IMPORTED_MODULE_3__.FormControl(false)
    });
    this.form.valueChanges.subscribe(data => {
      this.updateDisplay();
    });
    this.web.redrawSubject.subscribe(() => {
      this.updateDisplay();
    });
  }
  drawCoveragePlot() {
    this.graphLayoutMap = {};
    this.graphDataMap = {};
    if (this.coverageData && this.displayDF.count() > 0) {
      this.displayDF.groupBy(row => {
        return row.Engine;
      }).forEach(group => {
        const graphData = [];
        const graphLayout = JSON.parse(JSON.stringify(this.graphLayout));
        graphLayout.title = group.first().Engine;
        const heightMap = {};
        const dataMap = {};
        const lineShapeFromData = {
          type: "line",
          x0: 1,
          y0: 0,
          x1: this.coverageData.protein_sequence.length,
          y1: 0,
          line: {
            color: "black",
            width: 1
          }
        };
        graphLayout.shapes.push(lineShapeFromData);
        const df = group.orderByDescending(row => {
          return row.Stripped_Sequence.length;
        }).bake();
        df.forEach(row => {
          let previousHeight = 0;
          for (const i in this.coverageData.coverage) {
            // @ts-ignore
            if (this.coverageData.coverage[i].includes(row.id)) {
              if (!(i in heightMap)) {
                heightMap[i] = {
                  highest: 0
                };
              }
              if (!(row.id in heightMap[i])) {
                heightMap[i].highest += 1;
                if (previousHeight == 0) {
                  previousHeight = heightMap[i].highest;
                } else {
                  heightMap[i].highest = previousHeight;
                }
              }
              heightMap[i][row.id] = heightMap[i].highest;
              if (!dataMap[row.id]) {
                dataMap[row.id] = {
                  x: [],
                  y: []
                };
              }
              dataMap[row.id].x.push(parseInt(i) + 1);
              dataMap[row.id].y.push(heightMap[i][row.id]);
            }
          }
        });
        graphLayout.xaxis.range = [1, this.coverageData.protein_sequence.length];
        let highest = 0;
        for (const i in dataMap) {
          const x0 = dataMap[i].x[0];
          const x1 = dataMap[i].x[dataMap[i].x.length - 1];
          const y0 = dataMap[i].y[0];
          const y1 = dataMap[i].y[dataMap[i].y.length - 1];
          const lineShape = {
            type: "line",
            x0: x0,
            y0: y0,
            x1: x1,
            y1: y1,
            line: {
              color: "rgb(101,101,101)",
              width: 4
            }
          };
          if (this.web.settings.searchMap[i]) {
            lineShape.line.color = this.web.settings.colorMap[this.web.settings.searchMap[i][this.web.settings.searchMap[i].length - 1]].slice();
          }
          if (y1 > highest) {
            highest = y1;
          }
          graphLayout.shapes.push(lineShape);
        }
        graphLayout.yaxis.range = [0, highest];
        this.graphLayoutMap[group.first().Engine] = graphLayout;
        this.graphDataMap[group.first().Engine] = [];
      });
      this.revision += 1;
    }
    console.log(this.graphDataMap);
  }
  updateDisplay() {
    this.displayDF = this.df.where(row => {
      return row.Tissue === this.form.controls['tissues'].value;
    });
    if (this.form.controls['valid_tau'].value) {
      this.displayDF = this.displayDF.where(row => {
        return row.tau_POI !== null;
      });
    }
    if (this.form.controls['selected_only'].value) {
      this.displayDF = this.displayDF.where(row => {
        return this.web.settings.selectedMSDataID.includes(row.id);
      });
    }
    this.displayDF = this.displayDF.bake();
    this.engines = this.displayDF.getSeries("Engine").distinct().toArray();
    this.drawCoveragePlot();
  }
  static #_ = this.ɵfac = function CoveragePlotComponent_Factory(t) {
    return new (t || CoveragePlotComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_web_service__WEBPACK_IMPORTED_MODULE_1__.WebService), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_forms__WEBPACK_IMPORTED_MODULE_3__.FormBuilder));
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineComponent"]({
    type: CoveragePlotComponent,
    selectors: [["app-coverage-plot"]],
    inputs: {
      coverageData: "coverageData"
    },
    decls: 23,
    vars: 7,
    consts: [[1, "accordion"], [1, "accordion-item"], [1, "accordion-header"], ["type", "button", 3, "ngClass", "click"], [3, "ngbCollapse", "ngbCollapseChange"], ["collapse", "ngbCollapse"], [1, "accordion-body"], [1, "d-flex", "flex-row", "gap-1", 3, "formGroup"], [1, "form-group"], ["for", "tissues"], ["id", "tissues", "formControlName", "tissues", 1, "form-control"], [3, "value", 4, "ngFor", "ngForOf"], [1, "form-check"], ["type", "checkbox", "id", "valid_tau", "formControlName", "valid_tau", 1, "form-check-input"], ["for", "valid_tau", 1, "form-check-label"], ["type", "checkbox", "id", "selected_only", "formControlName", "selected_only", 1, "form-check-input"], ["for", "selected_only", 1, "form-check-label"], [3, "revision", "data", "layout", 4, "ngFor", "ngForOf"], [3, "value"], [3, "revision", "data", "layout"]],
    template: function CoveragePlotComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 0)(1, "div", 1)(2, "h2", 2)(3, "button", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function CoveragePlotComponent_Template_button_click_3_listener() {
          return ctx.iscollapse = !ctx.iscollapse;
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](4, " Coverage plot ");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](5, "div", 4, 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("ngbCollapseChange", function CoveragePlotComponent_Template_div_ngbCollapseChange_5_listener($event) {
          return ctx.iscollapse = $event;
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](7, "div", 6)(8, "form", 7)(9, "div", 8)(10, "label", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](11, " Tissue selection ");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](12, "select", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](13, CoveragePlotComponent_option_13_Template, 2, 2, "option", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](14, "div", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](15, "input", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](16, "label", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](17, " Valid tau only ");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](18, "div", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](19, "input", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](20, "label", 16);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](21, " Selected peptide only ");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](22, CoveragePlotComponent_plotly_plot_22_Template, 1, 3, "plotly-plot", 17);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()()()();
      }
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpureFunction1"](5, _c0, ctx.iscollapse));
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngbCollapse", ctx.iscollapse);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("formGroup", ctx.form);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngForOf", ctx.tissues);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](9);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngForOf", ctx.engines);
      }
    },
    dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_4__.NgClass, _angular_common__WEBPACK_IMPORTED_MODULE_4__.NgForOf, _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_5__.NgbCollapse, angular_plotly_js__WEBPACK_IMPORTED_MODULE_6__.PlotlyComponent, _angular_forms__WEBPACK_IMPORTED_MODULE_3__["ɵNgNoValidate"], _angular_forms__WEBPACK_IMPORTED_MODULE_3__.NgSelectOption, _angular_forms__WEBPACK_IMPORTED_MODULE_3__["ɵNgSelectMultipleOption"], _angular_forms__WEBPACK_IMPORTED_MODULE_3__.CheckboxControlValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_3__.SelectControlValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_3__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_3__.NgControlStatusGroup, _angular_forms__WEBPACK_IMPORTED_MODULE_3__.FormGroupDirective, _angular_forms__WEBPACK_IMPORTED_MODULE_3__.FormControlName],
    styles: ["/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsInNvdXJjZVJvb3QiOiIifQ== */"]
  });
}

/***/ }),

/***/ 9897:
/*!**************************************************************!*\
  !*** ./src/app/floating-panels/floating-panels.component.ts ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   FloatingPanelsComponent: () => (/* binding */ FloatingPanelsComponent)
/* harmony export */ });
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/forms */ 8849);
/* harmony import */ var _merge_prompt_merge_prompt_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../merge-prompt/merge-prompt.component */ 7572);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs */ 655);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs */ 3317);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! rxjs */ 9736);
/* harmony import */ var data_forge__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! data-forge */ 7090);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 1699);
/* harmony import */ var _web_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../web.service */ 5148);
/* harmony import */ var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ 6101);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/common */ 6575);
/* harmony import */ var ngx_colors__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ngx-colors */ 6334);










function FloatingPanelsComponent_div_0_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](0, "div", 7);
  }
}
const _c0 = function () {
  return {
    standalone: true
  };
};
function FloatingPanelsComponent_div_1_div_23_div_6_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div")(1, "div", 30)(2, "div", 12)(3, "input", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("change", function FloatingPanelsComponent_div_1_div_23_div_6_Template_input_change_3_listener() {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r6);
      const l_r4 = restoredCtx.$implicit;
      const ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](3);
      return _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵresetView"](ctx_r5.updateSelected(l_r4));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](4, "ngx-colors", 32);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("ngModelChange", function FloatingPanelsComponent_div_1_div_23_div_6_Template_ngx_colors_ngModelChange_4_listener($event) {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r6);
      const l_r4 = restoredCtx.$implicit;
      const ctx_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](3);
      return _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵresetView"](ctx_r7.colorMap[l_r4] = $event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](5, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const l_r4 = ctx.$implicit;
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("formControlName", l_r4);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngModel", ctx_r3.colorMap[l_r4])("ngModelOptions", _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpureFunction0"](4, _c0));
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate"](l_r4);
  }
}
function FloatingPanelsComponent_div_1_div_23_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 23)(1, "div", 10)(2, "h5", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](3, "Selected Data");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](4, "form", 24)(5, "div", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](6, FloatingPanelsComponent_div_1_div_23_div_6_Template, 7, 5, "div", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](7, "div", 20)(8, "div", 27)(9, "button", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function FloatingPanelsComponent_div_1_div_23_Template_button_click_9_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r9);
      const ctx_r8 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵresetView"](ctx_r8.updateColorMap());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](10, "Update");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](11, "button", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function FloatingPanelsComponent_div_1_div_23_Template_button_click_11_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r9);
      const ctx_r10 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵresetView"](ctx_r10.mergeSelected());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](12);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](13, "button", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function FloatingPanelsComponent_div_1_div_23_Template_button_click_13_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r9);
      const ctx_r11 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵresetView"](ctx_r11.removeSelected());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](14);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()()();
  }
  if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("formGroup", ctx_r2.form);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngForOf", ctx_r2.legends);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"]("Merge (", ctx_r2.selected.length, ")");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"]("Remove (", ctx_r2.selected.length, ")");
  }
}
function FloatingPanelsComponent_div_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r13 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 8)(1, "div", 9)(2, "div", 10)(3, "h5", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](4, "Search sequence");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](5, "form")(6, "div", 12)(7, "input", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("ngModelChange", function FloatingPanelsComponent_div_1_Template_input_ngModelChange_7_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r13);
      const ctx_r12 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵresetView"](ctx_r12.validTau = $event);
    })("change", function FloatingPanelsComponent_div_1_Template_input_change_7_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r13);
      const ctx_r14 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵresetView"](ctx_r14.updateParams());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](8, "label", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](9, "Valid TAU only");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](10, "div", 15)(11, "input", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("ngModelChange", function FloatingPanelsComponent_div_1_Template_input_ngModelChange_11_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r13);
      const ctx_r15 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵresetView"](ctx_r15.typeaheadModel = $event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](12, "div", 15)(13, "label");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](14, "Search by");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](15, "select", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("ngModelChange", function FloatingPanelsComponent_div_1_Template_select_ngModelChange_15_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r13);
      const ctx_r16 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵresetView"](ctx_r16.searchBy = $event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](16, "option", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](17, " Precursor_Id ");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](18, "option", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](19, " Stripped_Sequence ");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](20, "div", 20)(21, "button", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function FloatingPanelsComponent_div_1_Template_button_click_21_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r13);
      const ctx_r17 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵresetView"](ctx_r17.matchSearch());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](22, "Submit");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](23, FloatingPanelsComponent_div_1_div_23_Template, 15, 4, "div", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngModel", ctx_r1.validTau)("ngModelOptions", _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpureFunction0"](8, _c0));
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngModelOptions", _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpureFunction0"](9, _c0))("ngModel", ctx_r1.typeaheadModel)("ngbTypeahead", ctx_r1.search);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngModel", ctx_r1.searchBy)("ngModelOptions", _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpureFunction0"](10, _c0));
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](8);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx_r1.legends.length > 0);
  }
}
class FloatingPanelsComponent {
  set filteredDF(value) {
    this._filteredDF = value;
    this.displayDF = value;
    if (this.validTau) {
      this.displayDF = this.displayDF.where(row => {
        return row["tau_POI"] !== null;
      });
    }
    this.precursorList = this.displayDF.getSeries("Precursor_Id").distinct().toArray();
    this.sequenceList = this.displayDF.getSeries("Stripped_Sequence").distinct().toArray();
  }
  get filteredDF() {
    return this._filteredDF;
  }
  togglePanels() {
    this.panelOpenState = !this.panelOpenState;
  }
  constructor(web, fb, modal) {
    this.web = web;
    this.fb = fb;
    this.modal = modal;
    this.precursorList = [];
    this.sequenceList = [];
    this._filteredDF = new data_forge__WEBPACK_IMPORTED_MODULE_1__.DataFrame();
    this.displayDF = new data_forge__WEBPACK_IMPORTED_MODULE_1__.DataFrame();
    this.searchBy = "Precursor_Id";
    this.panelOpenState = false;
    this.selected = [];
    this.validTau = true;
    this.legends = Object.keys(this.web.settings.colorMap);
    this.colorMap = Object.assign({}, this.web.settings.colorMap);
    this.typeaheadModel = "";
    this.search = text$ => text$.pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_4__.debounceTime)(200), (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.distinctUntilChanged)(), (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.map)(term => {
      if (term.length < 1) {
        return [];
      } else {
        if (this.searchBy === "Precursor_Id") {
          return this.precursorList.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10);
        } else {
          return this.sequenceList.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10);
        }
      }
    }));
    this.form = this.fb.group({});
    this.web.selectionSubject.subscribe(() => {
      this.legends = Object.keys(this.web.settings.colorMap);
      this.colorMap = Object.assign({}, this.web.settings.colorMap);
      const form = this.fb.group({});
      for (const l of this.legends) {
        form.addControl(l, new _angular_forms__WEBPACK_IMPORTED_MODULE_7__.FormControl(false));
      }
      this.form = form;
    });
  }
  updateColorMap() {
    for (const i of this.legends) {
      this.web.settings.colorMap[i] = this.colorMap[i];
    }
    this.web.redrawSubject.next(true);
  }
  updateSelected(e) {
    if (this.selected.includes(e)) {
      if (this.form.value[e] === true) {
        this.selected.splice(this.selected.indexOf(e), 1);
      }
    } else {
      this.selected.push(e);
    }
  }
  mergeSelected() {
    if (this.selected.length > 1) {
      const ref = this.modal.open(_merge_prompt_merge_prompt_component__WEBPACK_IMPORTED_MODULE_0__.MergePromptComponent);
      ref.closed.subscribe(result => {
        this.web.mergeSearchOperations(this.selected, result.color, result.name, result.remove);
        this.web.redrawSubject.next(true);
        this.web.selectionSubject.next(true);
      });
    }
  }
  removeSelected() {
    for (const s of this.selected) {
      this.web.removeSearchOperation(s);
    }
    this.form.reset();
    this.selected = [];
    this.web.redrawSubject.next(true);
    this.legends = Object.keys(this.web.settings.colorMap);
  }
  matchSearch() {
    const ids = this.filteredDF.where(row => {
      return row[this.searchBy] === this.typeaheadModel;
    }).bake().getSeries("id").toArray().map(id => {
      return parseInt(id);
    });
    console.log(ids);
    if (ids.length > 0) {
      ids.forEach(id => {
        if (!this.web.settings.searchMap[id]) {
          this.web.settings.searchMap[id] = [];
        }
        if (!this.web.settings.searchMap[id].includes(this.typeaheadModel)) {
          this.web.settings.searchMap[id].push(this.typeaheadModel);
        }
      });
      this.web.setOperationColor(this.typeaheadModel);
      this.web.settings.searchOperations.push(this.typeaheadModel);
      this.web.selectionHandler(ids);
    }
  }
  updateParams() {
    if (this.validTau) {
      this.displayDF = this.filteredDF.where(row => {
        return row["tau_POI"] !== null;
      });
    }
    this.precursorList = this.displayDF.getSeries("Precursor_Id").distinct().toArray();
    this.sequenceList = this.displayDF.getSeries("Stripped_Sequence").distinct().toArray();
  }
  static #_ = this.ɵfac = function FloatingPanelsComponent_Factory(t) {
    return new (t || FloatingPanelsComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_web_service__WEBPACK_IMPORTED_MODULE_2__.WebService), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_angular_forms__WEBPACK_IMPORTED_MODULE_7__.FormBuilder), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_8__.NgbModal));
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineComponent"]({
    type: FloatingPanelsComponent,
    selectors: [["app-floating-panels"]],
    inputs: {
      filteredDF: "filteredDF"
    },
    decls: 7,
    vars: 2,
    consts: [["style", "position: fixed; z-index: 1030; bottom: 110px; left: 10px;", 4, "ngIf"], ["style", "position: fixed; z-index: 1030; bottom: 110px; left: 10px;", "class", "d-flex flex-column gap-1", 4, "ngIf"], [1, "float-start", 2, "position", "fixed", "z-index", "1030", "bottom", "50px", "left", "10px"], [1, "d-flex"], [1, "p-2"], [1, "btn", "btn-sm", "btn-outline-info", 3, "click"], [1, "bi", "bi-database"], [2, "position", "fixed", "z-index", "1030", "bottom", "110px", "left", "10px"], [1, "d-flex", "flex-column", "gap-1", 2, "position", "fixed", "z-index", "1030", "bottom", "110px", "left", "10px"], [1, "card", 2, "min-width", "200px", "max-width", "300px", "min-height", "250px"], [1, "card-body"], [1, "card-title"], [1, "form-check"], ["type", "checkbox", 1, "form-check-input", 3, "ngModel", "ngModelOptions", "ngModelChange", "change"], [1, "form-check-label"], [1, "form-group"], ["type", "text", "placeholder", "Search term", 1, "form-control", 3, "ngModelOptions", "ngModel", "ngbTypeahead", "ngModelChange"], [1, "form-control", 3, "ngModel", "ngModelOptions", "ngModelChange"], ["value", "Precursor_Id"], ["value", "Stripped_Sequence"], [1, "card-footer"], [1, "btn", "btn-sm", "btn-primary", 3, "click"], ["class", "card", "style", "min-width: 200px; max-width: 300px; min-height: 400px; max-height: 400px", 4, "ngIf"], [1, "card", 2, "min-width", "200px", "max-width", "300px", "min-height", "400px", "max-height", "400px"], [3, "formGroup"], [1, "flex-column", "gap-1", "overflow-auto", 2, "height", "250px"], [4, "ngFor", "ngForOf"], [1, "d-flex", "gap-1"], [1, "btn", "btn-sm", "btn-secondary", 3, "click"], [1, "btn", "btn-sm", "btn-warning", 3, "click"], [1, "d-flex", "align-items-center", "gap-1", "p-2"], ["type", "checkbox", 1, "form-check-input", 3, "formControlName", "change"], ["ngx-colors-trigger", "", 3, "ngModel", "ngModelOptions", "ngModelChange"]],
    template: function FloatingPanelsComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](0, FloatingPanelsComponent_div_0_Template, 1, 0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](1, FloatingPanelsComponent_div_1_Template, 24, 11, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](2, "div", 2)(3, "div", 3)(4, "div", 4)(5, "button", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function FloatingPanelsComponent_Template_button_click_5_listener() {
          return ctx.togglePanels();
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](6, "span", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()()();
      }
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx.panelOpenState);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx.panelOpenState);
      }
    },
    dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_9__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_9__.NgIf, _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_8__.NgbTypeahead, _angular_forms__WEBPACK_IMPORTED_MODULE_7__["ɵNgNoValidate"], _angular_forms__WEBPACK_IMPORTED_MODULE_7__.NgSelectOption, _angular_forms__WEBPACK_IMPORTED_MODULE_7__["ɵNgSelectMultipleOption"], _angular_forms__WEBPACK_IMPORTED_MODULE_7__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_7__.CheckboxControlValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_7__.SelectControlValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_7__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_7__.NgControlStatusGroup, _angular_forms__WEBPACK_IMPORTED_MODULE_7__.NgModel, _angular_forms__WEBPACK_IMPORTED_MODULE_7__.NgForm, _angular_forms__WEBPACK_IMPORTED_MODULE_7__.FormGroupDirective, _angular_forms__WEBPACK_IMPORTED_MODULE_7__.FormControlName, ngx_colors__WEBPACK_IMPORTED_MODULE_10__.NgxColorsComponent, ngx_colors__WEBPACK_IMPORTED_MODULE_10__.NgxColorsTriggerDirective],
    styles: ["/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsInNvdXJjZVJvb3QiOiIifQ== */"]
  });
}

/***/ }),

/***/ 6459:
/*!****************************************!*\
  !*** ./src/app/home/home.component.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   HomeComponent: () => (/* binding */ HomeComponent)
/* harmony export */ });
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ 8849);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 1699);
/* harmony import */ var _accounts_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../accounts.service */ 3580);
/* harmony import */ var _toast_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../toast.service */ 6837);
/* harmony import */ var _web_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../web.service */ 5148);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common */ 6575);







function HomeComponent_div_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 1)(1, "div", 2)(2, "div", 3)(3, "h5", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](4, "Login");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](5, "form", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("ngSubmit", function HomeComponent_div_0_Template_form_ngSubmit_5_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r2);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵresetView"](ctx_r1.loginHandler());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](6, "div", 6)(7, "label", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](8, " Username ");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](9, "input", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](10, "div", 6)(11, "label", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](12, " Password ");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](13, "input", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](14, "div", 11)(15, "button", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function HomeComponent_div_0_Template_button_click_15_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r2);
      const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵresetView"](ctx_r3.loginHandler());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](16, "Login");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()()();
  }
  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("formGroup", ctx_r0.form);
  }
}
class HomeComponent {
  constructor(accounts, fb, toast, web) {
    this.accounts = accounts;
    this.fb = fb;
    this.toast = toast;
    this.web = web;
    this.form = this.fb.group({
      username: new _angular_forms__WEBPACK_IMPORTED_MODULE_4__.FormControl('', _angular_forms__WEBPACK_IMPORTED_MODULE_4__.Validators.required),
      password: new _angular_forms__WEBPACK_IMPORTED_MODULE_4__.FormControl('', _angular_forms__WEBPACK_IMPORTED_MODULE_4__.Validators.required)
    });
  }
  loginHandler() {
    if (this.form.valid) {
      if (this.form.value.username && this.form.value.password) {
        this.toast.show("User information", "Logging in...");
        this.accounts.login(this.form.value["username"], this.form.value["password"]).subscribe(data => {
          this.accounts.token = data.token;
          this.accounts.loggedIn = true;
          this.toast.show("User information", "Logged in successfully");
          this.web.initializeModelParameters.next(true);
        });
      }
    }
  }
  static #_ = this.ɵfac = function HomeComponent_Factory(t) {
    return new (t || HomeComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_accounts_service__WEBPACK_IMPORTED_MODULE_0__.AccountsService), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_angular_forms__WEBPACK_IMPORTED_MODULE_4__.FormBuilder), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_toast_service__WEBPACK_IMPORTED_MODULE_1__.ToastService), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_web_service__WEBPACK_IMPORTED_MODULE_2__.WebService));
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineComponent"]({
    type: HomeComponent,
    selectors: [["app-home"]],
    decls: 1,
    vars: 1,
    consts: [["class", "flex justify-content-center align-items-center mt-5", 4, "ngIf"], [1, "flex", "justify-content-center", "align-items-center", "mt-5"], [1, "card", "login-box"], [1, "card-body"], [1, "card-title"], [3, "formGroup", "ngSubmit"], [1, "form-group"], ["for", "username"], ["type", "text", "formControlName", "username", "id", "username", 1, "form-control"], ["for", "password"], ["type", "password", "formControlName", "password", "id", "password", 1, "form-control"], [1, "card-footer"], [1, "btn", "btn-primary", 3, "click"]],
    template: function HomeComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](0, HomeComponent_div_0_Template, 17, 1, "div", 0);
      }
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx.accounts.token === "");
      }
    },
    dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_5__.NgIf, _angular_forms__WEBPACK_IMPORTED_MODULE_4__["ɵNgNoValidate"], _angular_forms__WEBPACK_IMPORTED_MODULE_4__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.NgControlStatusGroup, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.FormGroupDirective, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.FormControlName],
    styles: [".login-box[_ngcontent-%COMP%] {\n  margin-top: 75px;\n  height: 300px;\n  width: 400px;\n  background-color: #fff;\n  border-radius: 10px;\n  box-shadow: 0px 0px 10px 0px #000;\n  margin-left: auto;\n  margin-right: auto;\n  padding: 20px;\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvaG9tZS9ob21lLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBO0VBQ0UsZ0JBQUE7RUFDQSxhQUFBO0VBQ0EsWUFBQTtFQUNBLHNCQUFBO0VBQ0EsbUJBQUE7RUFDQSxpQ0FBQTtFQUNBLGlCQUFBO0VBQ0Esa0JBQUE7RUFDQSxhQUFBO0FBQUYiLCJzb3VyY2VzQ29udGVudCI6WyIvL2NzcyBmb3IgbG9naW4gYm94IHRvIGJlIGRpc3BsYXllZCBpbiB0aGUgZW50ZXIgb2YgdGhlIHNjcmVlblxyXG4ubG9naW4tYm94IHtcclxuICBtYXJnaW4tdG9wOiA3NXB4O1xyXG4gIGhlaWdodDogMzAwcHg7XHJcbiAgd2lkdGg6IDQwMHB4O1xyXG4gIGJhY2tncm91bmQtY29sb3I6ICNmZmY7XHJcbiAgYm9yZGVyLXJhZGl1czogMTBweDtcclxuICBib3gtc2hhZG93OiAwcHggMHB4IDEwcHggMHB4ICMwMDA7XHJcbiAgbWFyZ2luLWxlZnQ6IGF1dG87XHJcbiAgbWFyZ2luLXJpZ2h0OiBhdXRvO1xyXG4gIHBhZGRpbmc6IDIwcHg7XHJcbn1cclxuIl0sInNvdXJjZVJvb3QiOiIifQ== */"]
  });
}

/***/ }),

/***/ 7572:
/*!********************************************************!*\
  !*** ./src/app/merge-prompt/merge-prompt.component.ts ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   MergePromptComponent: () => (/* binding */ MergePromptComponent)
/* harmony export */ });
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/forms */ 8849);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 1699);
/* harmony import */ var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ 6101);
/* harmony import */ var ngx_colors__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ngx-colors */ 6334);





class MergePromptComponent {
  constructor(fb, modal) {
    this.fb = fb;
    this.modal = modal;
    this.form = this.fb.group({
      name: new _angular_forms__WEBPACK_IMPORTED_MODULE_0__.FormControl('', _angular_forms__WEBPACK_IMPORTED_MODULE_0__.Validators.required),
      color: new _angular_forms__WEBPACK_IMPORTED_MODULE_0__.FormControl('#000000', _angular_forms__WEBPACK_IMPORTED_MODULE_0__.Validators.required),
      remove: new _angular_forms__WEBPACK_IMPORTED_MODULE_0__.FormControl(false)
    });
  }
  save() {
    this.modal.close(this.form.value);
  }
  cancel() {
    this.modal.dismiss();
  }
  static #_ = this.ɵfac = function MergePromptComponent_Factory(t) {
    return new (t || MergePromptComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_forms__WEBPACK_IMPORTED_MODULE_0__.FormBuilder), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_2__.NgbActiveModal));
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({
    type: MergePromptComponent,
    selectors: [["app-merge-prompt"]],
    decls: 19,
    vars: 1,
    consts: [[1, "modal-header"], [1, "modal-title"], [1, "modal-body"], [3, "formGroup"], [1, "d-flex", "align-content-center", "gap-1"], ["ngx-colors-trigger", "", "formControlName", "color"], [1, "form-group"], ["id", "selection-title", "type", "text", "formControlName", "name", "placeholder", "Selection title", 1, "form-control"], [1, "form-check"], ["type", "checkbox", "formControlName", "remove", 1, "form-check-input"], [1, "form-check-label"], [1, "modal-footer"], ["type", "button", 1, "btn", "btn-secondary", 3, "click"], ["type", "button", 1, "btn", "btn-primary", 3, "click"]],
    template: function MergePromptComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 0)(1, "h5", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2, "Selection assignment");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "div", 2)(4, "form", 3)(5, "div", 4)(6, "div");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](7, "ngx-colors", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](8, "div", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](9, "input", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](10, "div", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](11, "input", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](12, "label", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](13, "Remove original selection");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](14, "div", 11)(15, "button", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function MergePromptComponent_Template_button_click_15_listener() {
          return ctx.cancel();
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](16, "Cancel");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](17, "button", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function MergePromptComponent_Template_button_click_17_listener() {
          return ctx.save();
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](18, "Save");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
      }
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("formGroup", ctx.form);
      }
    },
    dependencies: [_angular_forms__WEBPACK_IMPORTED_MODULE_0__["ɵNgNoValidate"], _angular_forms__WEBPACK_IMPORTED_MODULE_0__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_0__.CheckboxControlValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_0__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_0__.NgControlStatusGroup, _angular_forms__WEBPACK_IMPORTED_MODULE_0__.FormGroupDirective, _angular_forms__WEBPACK_IMPORTED_MODULE_0__.FormControlName, ngx_colors__WEBPACK_IMPORTED_MODULE_3__.NgxColorsComponent, ngx_colors__WEBPACK_IMPORTED_MODULE_3__.NgxColorsTriggerDirective],
    styles: ["/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsInNvdXJjZVJvb3QiOiIifQ== */"]
  });
}

/***/ }),

/***/ 2247:
/*!********************************************!*\
  !*** ./src/app/navbar/navbar.component.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   NavbarComponent: () => (/* binding */ NavbarComponent)
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs */ 655);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! rxjs */ 3317);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! rxjs */ 3738);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! rxjs */ 1891);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! rxjs */ 2389);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! rxjs */ 4980);
/* harmony import */ var _variant_selector_variant_selector_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../variant-selector/variant-selector.component */ 8150);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 1699);
/* harmony import */ var _web_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../web.service */ 5148);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/router */ 7947);
/* harmony import */ var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ 6101);
/* harmony import */ var _toast_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../toast.service */ 6837);
/* harmony import */ var _accounts_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../accounts.service */ 3580);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/common */ 6575);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/forms */ 8849);










const _c0 = function () {
  return {
    standalone: true
  };
};
function NavbarComponent_form_5_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "form", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("ngSubmit", function NavbarComponent_form_5_Template_form_ngSubmit_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r5);
      const ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵresetView"](ctx_r4.searchData());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](1, "input", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("ngModelChange", function NavbarComponent_form_5_Template_input_ngModelChange_1_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r5);
      const ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵresetView"](ctx_r6.proteinSearchModel = $event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](2, "div", 14)(3, "select", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("ngModelChange", function NavbarComponent_form_5_Template_select_ngModelChange_3_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r5);
      const ctx_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵresetView"](ctx_r7.searchType = $event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](4, "option", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](5, " Protein Group ");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](6, "option", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](7, " Gene ");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](8, "button", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](9, "i", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();
    const _r2 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵreference"](18);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵclassProp"]("is-invalid", ctx_r0.searchFailed);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("resultTemplate", _r2)("editable", false)("ngModel", ctx_r0.proteinSearchModel)("ngbTypeahead", ctx_r0.search)("ngModelOptions", _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpureFunction0"](9, _c0));
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngModel", ctx_r0.searchType)("ngModelOptions", _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpureFunction0"](10, _c0));
  }
}
function NavbarComponent_ng_template_17_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](0, "ngb-highlight", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1);
  }
  if (rf & 2) {
    const r_r8 = ctx.result;
    const t_r9 = ctx.term;
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("result", ctx_r3.resultFormatter(r_r8, t_r9))("term", t_r9);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate1"](" - (", r_r8.split(";").length, " Shared)\n");
  }
}
class NavbarComponent {
  constructor(web, router, modal, toast, accounts) {
    this.web = web;
    this.router = router;
    this.modal = modal;
    this.toast = toast;
    this.accounts = accounts;
    this.proteinSearchModel = "";
    this.searching = false;
    this.searchFailed = false;
    //typeahead function for search model
    this.search = text$ => text$.pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_5__.debounceTime)(200), (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.distinctUntilChanged)(), (0,rxjs__WEBPACK_IMPORTED_MODULE_7__.tap)(() => this.searching = true), (0,rxjs__WEBPACK_IMPORTED_MODULE_8__.switchMap)(term => this.web.typeAheadSearchTerm(term, this.searchType).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_7__.tap)(() => this.searchFailed = false), (0,rxjs__WEBPACK_IMPORTED_MODULE_9__.catchError)(() => {
      this.searchFailed = true;
      return (0,rxjs__WEBPACK_IMPORTED_MODULE_10__.of)([]);
    }))), (0,rxjs__WEBPACK_IMPORTED_MODULE_7__.tap)(() => this.searching = false));
    this.searchType = "Protein_Group";
    this.resultFormatter = (x, term) => {
      //truncate long protein names to maximum 10 characters that match the search term
      if (x.length > 10) {
        const position = x.toLowerCase().indexOf(term.toLowerCase());
        // get 5 characters before and after the search term
        const start = Math.max(0, position - 5);
        const end = Math.min(x.length, position + 5);
        const result = x.substring(start, end);
        return result;
      } else {
        return x;
      }
    };
  }
  searchData() {
    if (this.searchType === "Protein_Group") {
      this.router.navigate(['protein-view', this.proteinSearchModel]).then(r => console.log(r));
    } else {
      this.web.getExactAccFromGene(this.proteinSearchModel).subscribe(data => {
        console.log(data);
        const ref = this.modal.open(_variant_selector_variant_selector_component__WEBPACK_IMPORTED_MODULE_0__.VariantSelectorComponent);
        ref.componentInstance.data = data;
        ref.closed.subscribe(result => {
          console.log(result);
          if (result) {
            this.router.navigate(['protein-view', result]).then(r => console.log(r));
          }
        });
      });
    }
  }
  save() {
    this.web.settings.download();
  }
  loadSettingFromFile(event) {
    if ("target" in event && "files" in event.target && event.target.files.length > 0) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = e => {
        if (e.target) {
          const target = e.target;
          this.web.settings.import(JSON.parse(target.result));
          this.web.restoreSubject.next(true);
        }
      };
      reader.readAsText(file);
    }
  }
  static #_ = this.ɵfac = function NavbarComponent_Factory(t) {
    return new (t || NavbarComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_web_service__WEBPACK_IMPORTED_MODULE_1__.WebService), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_11__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_12__.NgbModal), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_toast_service__WEBPACK_IMPORTED_MODULE_2__.ToastService), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_accounts_service__WEBPACK_IMPORTED_MODULE_3__.AccountsService));
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineComponent"]({
    type: NavbarComponent,
    selectors: [["app-navbar"]],
    decls: 19,
    vars: 1,
    consts: [[1, "navbar", "navbar-expand-lg", "navbar-light", "bg-light", "fixed-top", "d-flex", "flex-wrap"], [1, "container-fluid"], ["href", "#", 1, "navbar-brand"], [1, "d-flex", "flex-row", "gap-1"], ["class", "d-flex", "style", "gap: 20px", 3, "ngSubmit", 4, "ngIf"], ["display", "dynamic", "ngbDropdown", "", 1, "d-inline-block"], ["id", "dropdownSession", "ngbDropdownToggle", "", 1, "btn", "btn-outline-primary", "ml-2"], ["ngbDropdownMenu", "", "aria-labelledby", "dropdownSession"], ["ngbDropdownItem", "", 3, "click"], ["type", "file", "id", "file", "accept", ".json", 2, "display", "none", 3, "change"], ["loadSettings", ""], ["rt", ""], [1, "d-flex", 2, "gap", "20px", 3, "ngSubmit"], ["placement", "left-top", "type", "search", "placeholder", "Search Term", "aria-label", "Search", 1, "form-control", "me-2", 3, "resultTemplate", "editable", "ngModel", "ngbTypeahead", "ngModelOptions", "ngModelChange"], [1, "form-group"], ["id", "selectionType", 1, "form-control", 2, "width", "150px", 3, "ngModel", "ngModelOptions", "ngModelChange"], ["value", "Protein_Group"], ["value", "Genes"], ["type", "submit", 1, "btn", "btn-outline-dark"], [1, "bi", "bi-search"], [3, "result", "term"]],
    template: function NavbarComponent_Template(rf, ctx) {
      if (rf & 1) {
        const _r10 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵgetCurrentView"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "nav", 0)(1, "div", 1)(2, "a", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](3, " Turnover Atlas ");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](4, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](5, NavbarComponent_form_5_Template, 10, 11, "form", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](6, "div")(7, "div", 5)(8, "button", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](9, " Session ");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](10, "div", 7)(11, "button", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("click", function NavbarComponent_Template_button_click_11_listener() {
          return ctx.save();
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](12, "Session Save");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](13, "button", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("click", function NavbarComponent_Template_button_click_13_listener() {
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r10);
          const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵreference"](16);
          return _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵresetView"](_r1.click());
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](14, "Session Load");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()()()()()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](15, "input", 9, 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("change", function NavbarComponent_Template_input_change_15_listener($event) {
          return ctx.loadSettingFromFile($event);
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](17, NavbarComponent_ng_template_17_Template, 2, 3, "ng-template", null, 11, _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplateRefExtractor"]);
      }
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", ctx.accounts.loggedIn);
      }
    },
    dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_13__.NgIf, _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_12__.NgbDropdown, _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_12__.NgbDropdownToggle, _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_12__.NgbDropdownMenu, _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_12__.NgbDropdownItem, _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_12__.NgbHighlight, _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_12__.NgbTypeahead, _angular_forms__WEBPACK_IMPORTED_MODULE_14__["ɵNgNoValidate"], _angular_forms__WEBPACK_IMPORTED_MODULE_14__.NgSelectOption, _angular_forms__WEBPACK_IMPORTED_MODULE_14__["ɵNgSelectMultipleOption"], _angular_forms__WEBPACK_IMPORTED_MODULE_14__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_14__.SelectControlValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_14__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_14__.NgControlStatusGroup, _angular_forms__WEBPACK_IMPORTED_MODULE_14__.NgModel, _angular_forms__WEBPACK_IMPORTED_MODULE_14__.NgForm],
    styles: ["/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsInNvdXJjZVJvb3QiOiIifQ== */"]
  });
}

/***/ }),

/***/ 6280:
/*!****************************************************************************************!*\
  !*** ./src/app/protein-modelling-collection/protein-modelling-collection.component.ts ***!
  \****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ProteinModellingCollectionComponent: () => (/* binding */ ProteinModellingCollectionComponent)
/* harmony export */ });
/* harmony import */ var data_forge__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! data-forge */ 7090);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ 8849);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 1699);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ 6575);
/* harmony import */ var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ 6101);
/* harmony import */ var _protein_modelling_protein_modelling_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../protein-modelling/protein-modelling.component */ 798);







function ProteinModellingCollectionComponent_option_14_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "option", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const t_r3 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("value", t_r3);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"](" ", t_r3, " ");
  }
}
function ProteinModellingCollectionComponent_div_19_div_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](1, "app-protein-modelling", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const t_r5 = ctx.$implicit;
    const ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("data", t_r5)("hideNotSelected", ctx_r4.hideNotSelected);
  }
}
function ProteinModellingCollectionComponent_div_19_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](1, ProteinModellingCollectionComponent_div_19_div_1_Template, 2, 2, "div", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngForOf", ctx_r2.groupData);
  }
}
const _c0 = function (a1) {
  return {
    "accordion-button": true,
    "collapsed": a1
  };
};
class ProteinModellingCollectionComponent {
  set data(value) {
    this._data = value;
    const tissues = [];
    this._data.forEach(df => {
      tissues.push(df.first().Tissue);
    });
    this.tissues = tissues;
    this.form.controls['selectedTissues'].setValue(this.tissues.slice(0, 1));
    this.updateGroupData();
  }
  get data() {
    return this._data;
  }
  constructor(fb) {
    this.fb = fb;
    this._data = new data_forge__WEBPACK_IMPORTED_MODULE_0__.Series();
    this.tissues = [];
    this.selectedTissues = [];
    this.iscollapse = true;
    this.groupData = new data_forge__WEBPACK_IMPORTED_MODULE_0__.Series();
    this.form = this.fb.group({
      selectedTissues: new _angular_forms__WEBPACK_IMPORTED_MODULE_3__.FormControl([], _angular_forms__WEBPACK_IMPORTED_MODULE_3__.Validators.required),
      hideNotSelected: new _angular_forms__WEBPACK_IMPORTED_MODULE_3__.FormControl(false)
    });
    this.hideNotSelected = false;
    this.form.controls.selectedTissues.valueChanges.subscribe(data => {
      this.updateGroupData();
    });
    this.form.controls.hideNotSelected.valueChanges.subscribe(data => {
      if (data !== null) {
        this.hideNotSelected = data;
      }
    });
  }
  updateGroupData() {
    if (this.form.controls.selectedTissues.value) {
      this.selectedTissues = this.form.controls.selectedTissues.value;
      this.groupData = this.data.where(df => {
        return this.selectedTissues.includes(df.first().Tissue);
      }).bake();
    }
  }
  static #_ = this.ɵfac = function ProteinModellingCollectionComponent_Factory(t) {
    return new (t || ProteinModellingCollectionComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_forms__WEBPACK_IMPORTED_MODULE_3__.FormBuilder));
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineComponent"]({
    type: ProteinModellingCollectionComponent,
    selectors: [["app-protein-modelling-collection"]],
    inputs: {
      data: "data"
    },
    decls: 20,
    vars: 7,
    consts: [[1, "accordion"], [1, "accordion-item"], [1, "accordion-header"], ["type", "button", 3, "ngClass", "click"], [3, "ngbCollapse", "ngbCollapseChange"], ["collapse", "ngbCollapse"], [1, "accordion-body"], [3, "formGroup"], [1, "flex-row", "gap-5"], [1, "form-group", 2, "width", "300px", "padding", "20px"], ["for", "tissues"], ["id", "tissues", "formControlName", "selectedTissues", "multiple", "", 1, "form-control"], [3, "value", 4, "ngFor", "ngForOf"], [1, "form-check"], ["formControlName", "hideNotSelected", "type", "checkbox", "id", "hideNotSelected", 1, "form-check-input"], ["for", "hideNotSelected", 1, "form-check-label"], [4, "ngIf"], [3, "value"], ["style", "padding: 20px", 4, "ngFor", "ngForOf"], [2, "padding", "20px"], [3, "data", "hideNotSelected"]],
    template: function ProteinModellingCollectionComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 0)(1, "div", 1)(2, "h2", 2)(3, "button", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function ProteinModellingCollectionComponent_Template_button_click_3_listener() {
          return ctx.iscollapse = !ctx.iscollapse;
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](4, " Model overview ");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](5, "div", 4, 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("ngbCollapseChange", function ProteinModellingCollectionComponent_Template_div_ngbCollapseChange_5_listener($event) {
          return ctx.iscollapse = $event;
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](7, "div", 6)(8, "form", 7)(9, "div", 8)(10, "div", 9)(11, "label", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](12, "Select tissues:");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](13, "select", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](14, ProteinModellingCollectionComponent_option_14_Template, 2, 2, "option", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](15, "div", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](16, "input", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](17, "label", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](18, "Make not selected model transparent");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](19, ProteinModellingCollectionComponent_div_19_Template, 2, 1, "div", 16);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()()()();
      }
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpureFunction1"](5, _c0, ctx.iscollapse));
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngbCollapse", ctx.iscollapse);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("formGroup", ctx.form);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](6);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngForOf", ctx.tissues);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx.selectedTissues.length > 0 && !ctx.iscollapse);
      }
    },
    dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_4__.NgClass, _angular_common__WEBPACK_IMPORTED_MODULE_4__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_4__.NgIf, _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_5__.NgbCollapse, _angular_forms__WEBPACK_IMPORTED_MODULE_3__["ɵNgNoValidate"], _angular_forms__WEBPACK_IMPORTED_MODULE_3__.NgSelectOption, _angular_forms__WEBPACK_IMPORTED_MODULE_3__["ɵNgSelectMultipleOption"], _angular_forms__WEBPACK_IMPORTED_MODULE_3__.CheckboxControlValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_3__.SelectMultipleControlValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_3__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_3__.NgControlStatusGroup, _angular_forms__WEBPACK_IMPORTED_MODULE_3__.FormGroupDirective, _angular_forms__WEBPACK_IMPORTED_MODULE_3__.FormControlName, _protein_modelling_protein_modelling_component__WEBPACK_IMPORTED_MODULE_1__.ProteinModellingComponent],
    styles: ["/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsInNvdXJjZVJvb3QiOiIifQ== */"]
  });
}

/***/ }),

/***/ 798:
/*!******************************************************************!*\
  !*** ./src/app/protein-modelling/protein-modelling.component.ts ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ProteinModellingComponent: () => (/* binding */ ProteinModellingComponent)
/* harmony export */ });
/* harmony import */ var data_forge__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! data-forge */ 7090);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 1699);
/* harmony import */ var _web_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../web.service */ 5148);
/* harmony import */ var _toast_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../toast.service */ 6837);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ 6575);
/* harmony import */ var angular_plotly_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! angular-plotly.js */ 4676);






function ProteinModellingComponent_div_0_div_5_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 6)(1, "plotly-plot", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("plotlyClick", function ProteinModellingComponent_div_0_div_5_Template_plotly_plot_plotlyClick_1_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r4);
      const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵresetView"](ctx_r3.OnClick($event));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const e_r2 = ctx.$implicit;
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("data", ctx_r1.graphDataMap[e_r2])("layout", ctx_r1.graphLayoutMap[e_r2])("revision", ctx_r1.revision);
  }
}
function ProteinModellingComponent_div_0_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 1)(1, "div", 2)(2, "h5", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](4, "div", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](5, ProteinModellingComponent_div_0_div_5_Template, 2, 3, "div", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate"](ctx_r0.data.first().Tissue);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngForOf", ctx_r0.engines);
  }
}
class ProteinModellingComponent {
  set hideNotSelected(value) {
    this._hideNotSelected = value;
    this.drawModel();
  }
  get hideNotSelected() {
    return this._hideNotSelected;
  }
  set data(value) {
    this._data = value;
    this.drawModel();
  }
  get data() {
    return this._data;
  }
  constructor(web, toasts) {
    this.web = web;
    this.toasts = toasts;
    this._data = new data_forge__WEBPACK_IMPORTED_MODULE_0__.DataFrame();
    this._hideNotSelected = false;
    this.revision = 0;
    this.graphDataMap = {};
    this.graphLayoutMap = {};
    this.graphData = [];
    this.graphLayout = {
      title: "",
      width: 400,
      xaxis: {
        title: "Time (days)",
        range: [0, 50]
      },
      yaxis: {
        title: "H + H/L"
      },
      annotations: [],
      font: {
        family: "Arial",
        color: "black"
      }
    };
    this.engines = [];
    this.web.redrawSubject.subscribe(() => {
      this.drawModel();
    });
  }
  drawModel() {
    const graphDataMap = {};
    const graphLayoutMap = {};
    console.log(this.data);
    this.data.groupBy(row => {
      return row.Engine;
    }).bake().forEach(group => {
      graphDataMap[group.first().Engine] = [];
      graphLayoutMap[group.first().Engine] = Object.assign({}, this.graphLayout);
      graphLayoutMap[group.first().Engine].title = group.first().Engine;
      const model = this.web.modelParameters.filter(row => {
        return row.Engine === group.first().Engine && row.Tissue === group.first().Tissue;
      });
      if (model.length > 0) {
        const temp = {
          x: model[0].k_pool.map(x => {
            return x.day;
          }),
          y: model[0].k_pool.map(x => {
            return x.value;
          }),
          mode: 'lines',
          name: 'K optimized',
          line: {
            color: 'rgba(191,55,55,0.5)',
            shape: 'spline'
          },
          showlegend: false,
          hovertemplate: `Day: %{x}<br>Value: %{y}<br>K optimized`
        };
        graphDataMap[group.first().Engine].push(temp);
      }
      for (const i of group) {
        if (this.web.settings.searchMap[i.id]) {
          const temp = {
            x: i.tau_model.map(x => {
              return x.day;
            }),
            y: i.tau_model.map(x => {
              return x.value;
            }),
            mode: 'lines',
            data: i.id,
            name: i.Precursor_Id,
            line: {
              color: this.web.settings.colorMap[this.web.settings.searchMap[i.id][this.web.settings.searchMap[i.id].length - 1]].slice(),
              shape: 'spline'
            },
            showlegend: false,
            hovertemplate: "Day: %{x}<br>Value: %{y}<br>" + i.Precursor_Id
          };
          graphDataMap[group.first().Engine].push(temp);
        } else {
          const temp = {
            x: i.tau_model.map(x => {
              return x.day;
            }),
            y: i.tau_model.map(x => {
              return x.value;
            }),
            mode: 'lines',
            data: i.id,
            name: i.Precursor_Id,
            line: {
              color: "rgba(140,140,140,0.13)",
              shape: 'spline'
            },
            showlegend: false,
            hovertemplate: "Day: %{x}<br>Value: %{y}<br>" + i.Precursor_Id
          };
          if (this.hideNotSelected) {
            temp.line.color = "rgba(140,140,140,0)";
          }
          graphDataMap[group.first().Engine].push(temp);
        }
      }
    });
    this.graphDataMap = graphDataMap;
    this.graphLayoutMap = graphLayoutMap;
    this.engines = Object.keys(graphDataMap);
    this.revision += 1;
  }
  OnClick(event) {
    if ("points" in event) {
      const precursorIds = [];
      for (const i of event.points) {
        precursorIds.push(i.data.name);
        this.web.setOperationColor(i.data.name);
        this.web.settings.searchOperations.push(i.data.name);
      }
      const data = this.data.where(row => {
        return precursorIds.includes(row.Precursor_Id);
      }).bake();
      const ids = [];
      data.forEach(row => {
        ids.push(row.id);
        if (!this.web.settings.searchMap[row.id]) {
          this.web.settings.searchMap[row.id] = [];
        }
        if (!this.web.settings.searchMap[row.id].includes(row.Precursor_Id)) {
          this.web.settings.searchMap[row.id].push(row.Precursor_Id);
        }
      });
      if (ids.length > 0) {
        this.web.selectionHandler(ids);
      }
    }
  }
  static #_ = this.ɵfac = function ProteinModellingComponent_Factory(t) {
    return new (t || ProteinModellingComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_web_service__WEBPACK_IMPORTED_MODULE_1__.WebService), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_toast_service__WEBPACK_IMPORTED_MODULE_2__.ToastService));
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineComponent"]({
    type: ProteinModellingComponent,
    selectors: [["app-protein-modelling"]],
    inputs: {
      hideNotSelected: "hideNotSelected",
      data: "data"
    },
    decls: 1,
    vars: 1,
    consts: [["class", "card", 4, "ngIf"], [1, "card"], [1, "card-body"], [1, "card-title"], [1, "row", "gap-1"], ["class", "col-4", 4, "ngFor", "ngForOf"], [1, "col-4"], [3, "data", "layout", "revision", "plotlyClick"]],
    template: function ProteinModellingComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](0, ProteinModellingComponent_div_0_Template, 6, 2, "div", 0);
      }
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx.engines.length > 0);
      }
    },
    dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_4__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_4__.NgIf, angular_plotly_js__WEBPACK_IMPORTED_MODULE_5__.PlotlyComponent],
    styles: ["/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsInNvdXJjZVJvb3QiOiIifQ== */"]
  });
}

/***/ }),

/***/ 8796:
/*!************************************************************!*\
  !*** ./src/app/protein-search/protein-search.component.ts ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ProteinSearchComponent: () => (/* binding */ ProteinSearchComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 1699);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ 8849);
/* harmony import */ var data_forge__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! data-forge */ 7090);
/* harmony import */ var _web_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../web.service */ 5148);
/* harmony import */ var _toast_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../toast.service */ 6837);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common */ 6575);








function ProteinSearchComponent_option_11_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "option", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const o_r3 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("value", o_r3);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate"](o_r3);
  }
}
function ProteinSearchComponent_option_16_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "option", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const o_r4 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("value", o_r4);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate"](o_r4);
  }
}
function ProteinSearchComponent_option_45_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "option", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const o_r5 = ctx.$implicit;
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("value", o_r5);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate4"]("", o_r5, " ", ctx_r2.web.settings.sampleMap[o_r5].Sample_Label, " - day ", ctx_r2.web.settings.sampleMap[o_r5].Days, " - rep ", ctx_r2.web.settings.sampleMap[o_r5].Replicate, "");
  }
}
class ProteinSearchComponent {
  set data(value) {
    this._data = value;
    this.tissues = this._data.getSeries("Tissue").distinct().toArray();
    this.engines = this._data.getSeries("Engine").distinct().toArray();
    this.form.controls['tissues'].setValue(this.tissues);
    this.form.controls['engines'].setValue(this.engines);
    // assign color to engines
    // for (let i = 0; i < this.engines.length; i++) {
    //   const position = i%this.web.defaultColorList.length
    //   if (this.web.colorMap[this.engines[position]] === undefined) {
    //     this.web.colorMap[this.engines[position]] = this.web.defaultColorList[position]
    //   }
    // }
    this.samples = Object.keys(this.web.settings.sampleMap).sort();
    this.formExperimentParameters.controls['samples'].setValue(this.samples.filter(s => {
      return this.web.settings.sampleMap[s].Sample_Label === "pulse";
    }));
    this.web.settings.selectedSamples = this.formExperimentParameters.controls['samples'].value;
    this.reloadData();
  }
  get data() {
    return this._data;
  }
  constructor(fb, web, toastService) {
    this.fb = fb;
    this.web = web;
    this.toastService = toastService;
    this.tissues = [];
    this.engines = [];
    this.samples = [];
    this.form = this.fb.group({
      tissues: new _angular_forms__WEBPACK_IMPORTED_MODULE_4__.FormControl([], _angular_forms__WEBPACK_IMPORTED_MODULE_4__.Validators.required),
      engines: new _angular_forms__WEBPACK_IMPORTED_MODULE_4__.FormControl([], _angular_forms__WEBPACK_IMPORTED_MODULE_4__.Validators.required),
      proteotypic: new _angular_forms__WEBPACK_IMPORTED_MODULE_4__.FormControl(false),
      minSamplesDetected: new _angular_forms__WEBPACK_IMPORTED_MODULE_4__.FormControl(1),
      minTimepointsDetected: new _angular_forms__WEBPACK_IMPORTED_MODULE_4__.FormControl(1)
    });
    this.formExperimentParameters = this.fb.group({
      samples: new _angular_forms__WEBPACK_IMPORTED_MODULE_4__.FormControl([], _angular_forms__WEBPACK_IMPORTED_MODULE_4__.Validators.required)
    });
    this._data = new data_forge__WEBPACK_IMPORTED_MODULE_0__.DataFrame();
    this.filteredDF = new data_forge__WEBPACK_IMPORTED_MODULE_0__.DataFrame();
    this.filteredData = new _angular_core__WEBPACK_IMPORTED_MODULE_3__.EventEmitter();
    this.web.restoreSubject.asObservable().subscribe(data => {
      if (data) {
        this.form.patchValue(this.web.settings.form);
        this.formExperimentParameters.patchValue(this.web.settings.formExperimentParameters);
        this.reloadData();
      }
    });
  }
  reloadData() {
    this.toastService.show("Data formating", "Filtering data");
    this.filteredDF = this.data.where(row => {
      return this.form.controls['tissues'].value.includes(row.Tissue) && this.form.controls['engines'].value.includes(row.Engine) && row.n_Samples >= this.form.controls['minSamplesDetected'].value && row.n_TimePoints >= this.form.controls['minTimepointsDetected'].value && this.checkIfDataIsDetectedInSelectedSamples(row.values);
    });
    if (this.form.controls['proteotypic'].value) {
      this.filteredDF = this.filteredDF.where(row => {
        return row.Proteotypic == 1;
      });
    }
    this.filteredDF = this.filteredDF.bake();
    this.web.settings.form = this.form.value;
    this.web.settings.formExperimentParameters = this.formExperimentParameters.value;
    this.filteredData.emit(this.filteredDF);
  }
  reset() {
    this.form.reset();
    this.reloadData();
  }
  updateSelection() {
    this.web.settings.selectedSamples = this.formExperimentParameters.controls['samples'].value;
    this.web.redrawSubject.next(true);
  }
  checkIfDataIsDetectedInSelectedSamples(values) {
    for (const v of values) {
      if (this.web.settings.selectedSamples.includes(v.Sample_Name)) {
        if (v.Sample_H_over_HL !== null) {
          return true;
        }
      }
    }
    return false;
  }
  static #_ = this.ɵfac = function ProteinSearchComponent_Factory(t) {
    return new (t || ProteinSearchComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_angular_forms__WEBPACK_IMPORTED_MODULE_4__.FormBuilder), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_web_service__WEBPACK_IMPORTED_MODULE_1__.WebService), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_toast_service__WEBPACK_IMPORTED_MODULE_2__.ToastService));
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineComponent"]({
    type: ProteinSearchComponent,
    selectors: [["app-protein-search"]],
    inputs: {
      data: "data"
    },
    outputs: {
      filteredData: "filteredData"
    },
    decls: 51,
    vars: 6,
    consts: [[1, "d-flex", 2, "gap", "20px"], [1, "card"], [1, "card-body"], [1, "card-title"], [1, "d-flex", 2, "gap", "20px", 3, "formGroup"], [1, "form-group", 2, "width", "300px"], ["for", "tissues"], ["id", "tissues", "formControlName", "tissues", "multiple", "", 1, "form-control"], [3, "value", 4, "ngFor", "ngForOf"], ["for", "engines"], ["id", "engines", "formControlName", "engines", "multiple", "", 1, "form-control"], [1, "form-check"], ["formControlName", "proteotypic", "id", "proteotypic", "type", "checkbox", 1, "form-check-input"], ["for", "proteotypic", 1, "form-check-label"], [1, "form-group"], ["for", "minSamples"], ["id", "minSamples", "type", "number", "formControlName", "minSamplesDetected", 1, "form-control"], ["for", "minTimepoints"], ["id", "minTimepoints", "type", "number", "formControlName", "minTimepointsDetected", 1, "form-control"], [1, "card-footer", "d-flex", 2, "gap", "20px"], [1, "btn", "btn-primary", 3, "click"], ["for", "experiment"], ["id", "experiment", "formControlName", "samples", "multiple", "", 1, "form-control"], [1, "card-footer"], [3, "value"]],
    template: function ProteinSearchComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "h5", 3)(4, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](5, " Peptide Filter Parameter Control ");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](6, "form", 4)(7, "div", 5)(8, "label", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](9, "Tissue Selection");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](10, "select", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](11, ProteinSearchComponent_option_11_Template, 2, 2, "option", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](12, "div", 5)(13, "label", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](14, "Engine Selection");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](15, "select", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](16, ProteinSearchComponent_option_16_Template, 2, 2, "option", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](17, "div")(18, "div", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](19, "input", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](20, "label", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](21, " Proteotypic Peptides Only ");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](22, "div", 14)(23, "label", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](24, "Minimum Number of Detected Samples");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](25, "input", 16);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](26, "div", 14)(27, "label", 17);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](28, "Minimum Number of Detected Timepoints");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](29, "input", 18);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](30, "div", 19)(31, "button", 20);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function ProteinSearchComponent_Template_button_click_31_listener() {
          return ctx.reloadData();
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](32, "Reload Data");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](33, "button", 20);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function ProteinSearchComponent_Template_button_click_33_listener() {
          return ctx.reset();
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](34, "Reset");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](35, "div", 1)(36, "div", 2)(37, "h5", 3)(38, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](39, " Experiment Parameters ");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](40, "form", 4)(41, "div", 5)(42, "label", 21);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](43, "Sample Selection");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](44, "select", 22);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](45, ProteinSearchComponent_option_45_Template, 2, 5, "option", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](46, "small");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](47);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](48, "div", 23)(49, "button", 20);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function ProteinSearchComponent_Template_button_click_49_listener() {
          return ctx.updateSelection();
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](50, "Update Selection");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()()();
      }
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](6);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("formGroup", ctx.form);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngForOf", ctx.tissues);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngForOf", ctx.engines);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](24);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("formGroup", ctx.formExperimentParameters);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngForOf", ctx.samples);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"]("Selected ", ctx.formExperimentParameters.value.samples.length, " samples");
      }
    },
    dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_5__.NgForOf, _angular_forms__WEBPACK_IMPORTED_MODULE_4__["ɵNgNoValidate"], _angular_forms__WEBPACK_IMPORTED_MODULE_4__.NgSelectOption, _angular_forms__WEBPACK_IMPORTED_MODULE_4__["ɵNgSelectMultipleOption"], _angular_forms__WEBPACK_IMPORTED_MODULE_4__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.NumberValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.CheckboxControlValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.SelectMultipleControlValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.NgControlStatusGroup, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.FormGroupDirective, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.FormControlName],
    styles: ["/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsInNvdXJjZVJvb3QiOiIifQ== */"]
  });
}

/***/ }),

/***/ 4977:
/*!****************************************************************************!*\
  !*** ./src/app/protein-tau-collection/protein-tau-collection.component.ts ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ProteinTauCollectionComponent: () => (/* binding */ ProteinTauCollectionComponent)
/* harmony export */ });
/* harmony import */ var data_forge__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! data-forge */ 7090);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 1699);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ 6575);
/* harmony import */ var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ 6101);
/* harmony import */ var _protein_tau_distribution_protein_tau_distribution_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../protein-tau-distribution/protein-tau-distribution.component */ 1910);





function ProteinTauCollectionComponent_div_8_div_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](1, "app-protein-tau-distribution", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const g_r5 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("data", g_r5);
  }
}
function ProteinTauCollectionComponent_div_8_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](1, ProteinTauCollectionComponent_div_8_div_1_Template, 2, 1, "div", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngForOf", ctx_r1.tissueGroupData);
  }
}
function ProteinTauCollectionComponent_ng_template_9_app_protein_tau_distribution_0_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](0, "app-protein-tau-distribution", 10);
  }
  if (rf & 2) {
    const ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("data", ctx_r6.data);
  }
}
function ProteinTauCollectionComponent_ng_template_9_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](0, ProteinTauCollectionComponent_ng_template_9_app_protein_tau_distribution_0_Template, 1, 1, "app-protein-tau-distribution", 11);
  }
  if (rf & 2) {
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", !ctx_r3.iscollapse);
  }
}
const _c0 = function (a1) {
  return {
    "accordion-button": true,
    "collapsed": a1
  };
};
class ProteinTauCollectionComponent {
  constructor() {
    this._data = new data_forge__WEBPACK_IMPORTED_MODULE_0__.DataFrame();
    this.iscollapse = true;
    this.tissueGroupData = new data_forge__WEBPACK_IMPORTED_MODULE_0__.Series();
    this.combinedPlot = true;
  }
  set data(value) {
    this._data = value;
    this.tissueGroupData = this._data.groupBy(row => row.Tissue).bake();
  }
  get data() {
    return this._data;
  }
  static #_ = this.ɵfac = function ProteinTauCollectionComponent_Factory(t) {
    return new (t || ProteinTauCollectionComponent)();
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineComponent"]({
    type: ProteinTauCollectionComponent,
    selectors: [["app-protein-tau-collection"]],
    inputs: {
      data: "data"
    },
    decls: 11,
    vars: 6,
    consts: [[1, "accordion"], [1, "accordion-item"], [1, "accordion-header"], ["type", "button", 3, "ngClass", "click"], [3, "ngbCollapse", "ngbCollapseChange"], ["collapse", "ngbCollapse"], [1, "accordion-body"], [4, "ngIf", "ngIfElse"], ["combined", ""], [4, "ngFor", "ngForOf"], [3, "data"], [3, "data", 4, "ngIf"]],
    template: function ProteinTauCollectionComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 0)(1, "div", 1)(2, "h2", 2)(3, "button", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function ProteinTauCollectionComponent_Template_button_click_3_listener() {
          return ctx.iscollapse = !ctx.iscollapse;
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](4, " TAU distribution overview ");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](5, "div", 4, 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("ngbCollapseChange", function ProteinTauCollectionComponent_Template_div_ngbCollapseChange_5_listener($event) {
          return ctx.iscollapse = $event;
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](7, "div", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](8, ProteinTauCollectionComponent_div_8_Template, 2, 1, "div", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](9, ProteinTauCollectionComponent_ng_template_9_Template, 1, 1, "ng-template", null, 8, _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()()()();
      }
      if (rf & 2) {
        const _r2 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵreference"](10);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpureFunction1"](4, _c0, ctx.iscollapse));
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngbCollapse", ctx.iscollapse);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", !ctx.combinedPlot)("ngIfElse", _r2);
      }
    },
    dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_3__.NgClass, _angular_common__WEBPACK_IMPORTED_MODULE_3__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_3__.NgIf, _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_4__.NgbCollapse, _protein_tau_distribution_protein_tau_distribution_component__WEBPACK_IMPORTED_MODULE_1__.ProteinTauDistributionComponent],
    styles: ["/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsInNvdXJjZVJvb3QiOiIifQ== */"]
  });
}

/***/ }),

/***/ 1910:
/*!********************************************************************************!*\
  !*** ./src/app/protein-tau-distribution/protein-tau-distribution.component.ts ***!
  \********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ProteinTauDistributionComponent: () => (/* binding */ ProteinTauDistributionComponent)
/* harmony export */ });
/* harmony import */ var data_forge__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! data-forge */ 7090);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ 8849);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 1699);
/* harmony import */ var _web_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../web.service */ 5148);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ 6575);
/* harmony import */ var angular_plotly_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! angular-plotly.js */ 4676);







function ProteinTauDistributionComponent_div_7_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div")(1, "plotly-plot", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("plotlyClick", function ProteinTauDistributionComponent_div_7_Template_plotly_plot_plotlyClick_1_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r3);
      const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵresetView"](ctx_r2.OnClick($event));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const e_r1 = ctx.$implicit;
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("data", ctx_r0.graphDataMap[e_r1])("layout", ctx_r0.graphLayoutMap[e_r1])("revision", ctx_r0.revision);
  }
}
class ProteinTauDistributionComponent {
  set data(value) {
    this._data = value;
    this.drawGraph();
  }
  get data() {
    return this._data;
  }
  constructor(web, fb) {
    this.web = web;
    this.fb = fb;
    this._data = new data_forge__WEBPACK_IMPORTED_MODULE_0__.DataFrame();
    this.revision = 0;
    this.graphDataMap = {};
    this.graphLayoutBase = {
      title: "",
      xaxis: {
        title: "Tissue",
        type: "category",
        tickmode: "array"
      },
      yaxis: {
        title: "log2(TAU)"
      },
      annotations: [],
      font: {
        family: "Arial",
        color: "black"
      }
    };
    this.graphLayoutMap = {};
    this.form = this.fb.group({
      hideNotSelected: new _angular_forms__WEBPACK_IMPORTED_MODULE_3__.FormControl(false)
    });
    this.engineList = [];
    this.web.redrawSubject.subscribe(() => {
      this.drawGraph();
    });
  }
  drawGraph() {
    // draw box plot for tau distribution with y-axis being tau value and x axis being tissue, the box plot should also show individual data points as well with the data points being on the left outside of the box plot
    const temp = {};
    this.graphDataMap = {};
    this.graphLayoutMap = {};
    for (const row of this.data) {
      if (!(row.Engine in temp)) {
        temp[row.Engine] = {};
      }
      if (!(row.Tissue in temp[row.Engine])) {
        temp[row.Engine][row.Tissue] = {
          x: [],
          y: [],
          text: [],
          name: row.Tissue,
          type: "box",
          boxpoints: "all",
          jitter: 0.3,
          pointpos: -1.8,
          showlegend: false,
          marker: {
            color: []
          },
          fillcolor: "rgba(236,96,99,0.78)",
          hovertemplate: "Tissue: %{x}<br>log2(TAU): %{y}<br>Precursor ID: %{text}<extra></extra>"
        };
      }
      temp[row.Engine][row.Tissue].x.push(row.Tissue);
      temp[row.Engine][row.Tissue].y.push(Math.log2(row.tau_POI));
      if (this.web.settings.selectedMSDataID.includes(row.id)) {
        if (this.web.settings.searchMap[row.id]) {
          temp[row.Engine][row.Tissue].marker.color.push(this.web.settings.colorMap[this.web.settings.searchMap[row.id][this.web.settings.searchMap[row.id].length - 1]].slice());
        }
      } else {
        if (this.form.value.hideNotSelected) {
          temp[row.Engine][row.Tissue].marker.color.push("rgba(140,140,140,0)");
        } else {
          temp[row.Engine][row.Tissue].marker.color.push("rgba(140,140,140,0.13)");
        }
      }
      temp[row.Engine][row.Tissue].text.push(row.Precursor_Id);
    }
    for (const engine in temp) {
      if (!(engine in this.graphLayoutMap)) {
        this.graphLayoutMap[engine] = Object.assign({}, this.graphLayoutBase);
        this.graphLayoutMap[engine].title = engine;
        this.graphDataMap[engine] = [];
      }
      for (const tissue in temp[engine]) {
        this.graphDataMap[engine].push(temp[engine][tissue]);
      }
    }
    this.engineList = Object.keys(this.graphLayoutMap);
    this.revision += 1;
  }
  OnClick(event) {
    console.log(event);
    if ("points" in event) {
      const selectedData = [];
      for (const point of event.points) {
        if (!("hoverOnBox" in point)) {
          selectedData.push(point.data.text[point.pointNumber]);
          this.web.setOperationColor(point.data.text[point.pointNumber]);
          this.web.settings.searchOperations.push(point.data.text[point.pointNumber]);
        }
      }
      if (selectedData.length > 0) {
        const data = this.data.where(row => {
          return selectedData.includes(row.Precursor_Id);
        }).bake();
        const ids = [];
        data.forEach(row => {
          ids.push(row.id);
          if (!this.web.settings.searchMap[row.id]) {
            this.web.settings.searchMap[row.id] = [];
          }
          if (!this.web.settings.searchMap[row.id].includes(row.Precursor_Id)) {
            this.web.settings.searchMap[row.id].push(row.Precursor_Id);
          }
        });
        if (ids.length > 0) {
          this.web.selectionHandler(ids);
        }
      }
    }
  }
  updatePlot() {
    this.drawGraph();
  }
  static #_ = this.ɵfac = function ProteinTauDistributionComponent_Factory(t) {
    return new (t || ProteinTauDistributionComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_web_service__WEBPACK_IMPORTED_MODULE_1__.WebService), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_forms__WEBPACK_IMPORTED_MODULE_3__.FormBuilder));
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineComponent"]({
    type: ProteinTauDistributionComponent,
    selectors: [["app-protein-tau-distribution"]],
    inputs: {
      data: "data"
    },
    decls: 8,
    vars: 2,
    consts: [[3, "formGroup", "ngSubmit"], [1, "form-check"], ["id", "hideNotSelected", "formControlName", "hideNotSelected", "type", "checkbox", 1, "form-check-input"], ["for", "hideNotSelected"], ["type", "submit", 1, "btn", "btn-primary"], [4, "ngFor", "ngForOf"], [3, "data", "layout", "revision", "plotlyClick"]],
    template: function ProteinTauDistributionComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "form", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("ngSubmit", function ProteinTauDistributionComponent_Template_form_ngSubmit_0_listener() {
          return ctx.updatePlot();
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](1, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](2, "input", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](3, "label", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](4, "Make not selected dot points transparent");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](5, "button", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](6, "Redraw");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](7, ProteinTauDistributionComponent_div_7_Template, 2, 3, "div", 5);
      }
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("formGroup", ctx.form);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](7);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngForOf", ctx.engineList);
      }
    },
    dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_4__.NgForOf, angular_plotly_js__WEBPACK_IMPORTED_MODULE_5__.PlotlyComponent, _angular_forms__WEBPACK_IMPORTED_MODULE_3__["ɵNgNoValidate"], _angular_forms__WEBPACK_IMPORTED_MODULE_3__.CheckboxControlValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_3__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_3__.NgControlStatusGroup, _angular_forms__WEBPACK_IMPORTED_MODULE_3__.FormGroupDirective, _angular_forms__WEBPACK_IMPORTED_MODULE_3__.FormControlName],
    styles: ["/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsInNvdXJjZVJvb3QiOiIifQ== */"]
  });
}

/***/ }),

/***/ 225:
/*!**********************************************************************************************!*\
  !*** ./src/app/protein-view-peptide-collection/protein-view-peptide-collection.component.ts ***!
  \**********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ProteinViewPeptideCollectionComponent: () => (/* binding */ ProteinViewPeptideCollectionComponent)
/* harmony export */ });
/* harmony import */ var data_forge__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! data-forge */ 7090);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ 8849);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 1699);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ 6575);
/* harmony import */ var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ 6101);
/* harmony import */ var _protein_view_peptide_container_protein_view_peptide_container_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../protein-view-peptide-container/protein-view-peptide-container.component */ 3187);







function ProteinViewPeptideCollectionComponent_ng_template_18_li_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "li", 16)(1, "div", 17)(2, "label", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](3, "Page");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](4, "input", 19, 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("keyup.enter", function ProteinViewPeptideCollectionComponent_ng_template_18_li_0_Template_input_keyup_enter_4_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r8);
      const _r6 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵreference"](5);
      const ctx_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵresetView"](ctx_r7.selectPage(_r6.value));
    })("blur", function ProteinViewPeptideCollectionComponent_ng_template_18_li_0_Template_input_blur_4_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r8);
      const _r6 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵreference"](5);
      const ctx_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵresetView"](ctx_r9.selectPage(_r6.value));
    })("input", function ProteinViewPeptideCollectionComponent_ng_template_18_li_0_Template_input_input_4_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r8);
      const ctx_r10 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵresetView"](ctx_r10.formatInput($event.target));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](6, "span", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const ctx_r11 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
    const page_r3 = ctx_r11.$implicit;
    const pages_r4 = ctx_r11.pages;
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("value", page_r3);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"](" of ", pages_r4.length, "");
  }
}
function ProteinViewPeptideCollectionComponent_ng_template_18_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](0, ProteinViewPeptideCollectionComponent_ng_template_18_li_0_Template, 8, 2, "li", 15);
  }
  if (rf & 2) {
    const pages_r4 = ctx.pages;
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", pages_r4.length > 0);
  }
}
function ProteinViewPeptideCollectionComponent_ng_container_19_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](1, "app-protein-view-peptide-container", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const r_r12 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("data", r_r12);
  }
}
function ProteinViewPeptideCollectionComponent_ng_template_22_li_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r18 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "li", 16)(1, "div", 17)(2, "label", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](3, "Page");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](4, "input", 24, 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("keyup.enter", function ProteinViewPeptideCollectionComponent_ng_template_22_li_0_Template_input_keyup_enter_4_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r18);
      const _r16 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵreference"](5);
      const ctx_r17 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵresetView"](ctx_r17.selectPage(_r16.value));
    })("blur", function ProteinViewPeptideCollectionComponent_ng_template_22_li_0_Template_input_blur_4_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r18);
      const _r16 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵreference"](5);
      const ctx_r19 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵresetView"](ctx_r19.selectPage(_r16.value));
    })("input", function ProteinViewPeptideCollectionComponent_ng_template_22_li_0_Template_input_input_4_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r18);
      const ctx_r20 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵresetView"](ctx_r20.formatInput($event.target));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](6, "span", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const ctx_r21 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
    const page_r13 = ctx_r21.$implicit;
    const pages_r14 = ctx_r21.pages;
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("value", page_r13);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"](" of ", pages_r14.length, "");
  }
}
function ProteinViewPeptideCollectionComponent_ng_template_22_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](0, ProteinViewPeptideCollectionComponent_ng_template_22_li_0_Template, 8, 2, "li", 15);
  }
  if (rf & 2) {
    const pages_r14 = ctx.pages;
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", pages_r14.length > 0);
  }
}
class ProteinViewPeptideCollectionComponent {
  set data(value) {
    this._data = value;
    if (this.form.value.validTAUPOI) {
      this.displayDF = value.where(row => row.tau_POI !== null).bake();
    } else {
      this.displayDF = value;
    }
    this.precursorID = this._data.getSeries("Precursor_Id").distinct().toArray();
  }
  get data() {
    return this._data;
  }
  constructor(fb) {
    this.fb = fb;
    this._data = new data_forge__WEBPACK_IMPORTED_MODULE_0__.DataFrame();
    this.displayDF = new data_forge__WEBPACK_IMPORTED_MODULE_0__.DataFrame();
    this.precursorID = [];
    this.page = 1;
    this.pageSize = 10;
    this.form = this.fb.group({
      filterPrecursorID: new _angular_forms__WEBPACK_IMPORTED_MODULE_3__.FormControl(""),
      pageSize: new _angular_forms__WEBPACK_IMPORTED_MODULE_3__.FormControl(10, [_angular_forms__WEBPACK_IMPORTED_MODULE_3__.Validators.required, _angular_forms__WEBPACK_IMPORTED_MODULE_3__.Validators.min(1)]),
      validTAUPOI: new _angular_forms__WEBPACK_IMPORTED_MODULE_3__.FormControl(true)
    });
    this.FILTER_PAG_REGEX = /[^0-9]/g;
    this.form.controls['filterPrecursorID'].valueChanges.subscribe(value => {
      this.displayDF = this.data.where(row => row.Precursor_Id.indexOf(value.filterPrecursorID.toUpperCase()) > -1);
    });
    this.form.controls['pageSize'].valueChanges.subscribe(value => {
      if (value > 0) {
        this.pageSize = value;
      }
    });
    this.form.valueChanges.subscribe(value => {
      if (value.filterPrecursorID === "") {
        this.displayDF = this.data;
      } else {
        this.displayDF = this.data.where(row => row.Precursor_Id.indexOf(value.filterPrecursorID.toUpperCase()) > -1);
      }
      if (value.validTAUPOI) {
        this.displayDF = this.displayDF.where(row => row.tau_POI !== null);
      }
      this.displayDF = this.displayDF.bake();
      this.pageSize = value.pageSize;
    });
  }
  selectPage(page) {
    this.page = parseInt(page, 10) || 1;
  }
  formatInput(input) {
    input.value = input.value.replace(this.FILTER_PAG_REGEX, '');
  }
  static #_ = this.ɵfac = function ProteinViewPeptideCollectionComponent_Factory(t) {
    return new (t || ProteinViewPeptideCollectionComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_forms__WEBPACK_IMPORTED_MODULE_3__.FormBuilder));
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineComponent"]({
    type: ProteinViewPeptideCollectionComponent,
    selectors: [["app-protein-view-peptide-collection"]],
    inputs: {
      data: "data"
    },
    decls: 23,
    vars: 16,
    consts: [[1, "d-flex", 2, "gap", "20px"], [1, "card", "mb-5"], [1, "card-body"], [3, "formGroup"], [1, "form-group"], ["for", "filterPrecursorID"], ["type", "search", "id", "filterPrecursorID", "placeholder", "Precursor ID", "formControlName", "filterPrecursorID", 1, "form-control"], ["for", "pageSize"], ["type", "number", "id", "pageSize", "placeholder", "Page Size", "formControlName", "pageSize", 1, "form-control"], [1, "form-check"], ["type", "checkbox", "id", "validTAUPOI", "formControlName", "validTAUPOI", 1, "form-check-input"], ["for", "validTAUPOI", 1, "form-check-label"], [3, "collectionSize", "page", "boundaryLinks", "rotate", "pageSize", "pageChange"], ["ngbPaginationPages", ""], [4, "ngFor", "ngForOf"], ["class", "ngb-custom-pages-item", 4, "ngIf"], [1, "ngb-custom-pages-item"], [1, "mb-3", "d-flex", "flex-nowrap", "px-2"], ["id", "paginationInputLabel", "for", "paginationInput", 1, "col-form-label", "me-2", "ms-1"], ["type", "text", "inputmode", "numeric", "pattern", "[0-9]*", "id", "paginationInput", "aria-labelledby", "paginationInputLabel paginationDescription", 1, "form-control", "custom-pages-input", 2, "width", "2.5rem", 3, "value", "keyup.enter", "blur", "input"], ["i", ""], ["id", "paginationDescription", 1, "col-form-label", "text-nowrap", "px-2"], [3, "data"], ["id", "paginationInputLabelBottom", "for", "paginationInput", 1, "col-form-label", "me-2", "ms-1"], ["type", "text", "inputmode", "numeric", "pattern", "[0-9]*", "id", "paginationInputBottom", "aria-labelledby", "paginationInputLabel paginationDescription", 1, "form-control", "custom-pages-input", 2, "width", "2.5rem", 3, "value", "keyup.enter", "blur", "input"], ["id", "paginationDescriptionBottom", 1, "col-form-label", "text-nowrap", "px-2"]],
    template: function ProteinViewPeptideCollectionComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "form", 3)(4, "div", 0)(5, "div", 4)(6, "label", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](7, " Precursor ID Display Filter ");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](8, "input", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](9, "div", 4)(10, "label", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](11, " Page Size ");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](12, "input", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](13, "div", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](14, "input", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](15, "label", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](16, " Valid TAU_POI only ");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()()()()()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](17, "ngb-pagination", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("pageChange", function ProteinViewPeptideCollectionComponent_Template_ngb_pagination_pageChange_17_listener($event) {
          return ctx.page = $event;
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](18, ProteinViewPeptideCollectionComponent_ng_template_18_Template, 1, 1, "ng-template", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](19, ProteinViewPeptideCollectionComponent_ng_container_19_Template, 2, 1, "ng-container", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipe"](20, "slice");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](21, "ngb-pagination", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("pageChange", function ProteinViewPeptideCollectionComponent_Template_ngb_pagination_pageChange_21_listener($event) {
          return ctx.page = $event;
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](22, ProteinViewPeptideCollectionComponent_ng_template_22_Template, 1, 1, "ng-template", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
      }
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("formGroup", ctx.form);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](14);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("collectionSize", ctx.displayDF.count())("page", ctx.page)("boundaryLinks", true)("rotate", true)("pageSize", ctx.pageSize);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngForOf", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipeBind3"](20, 12, ctx.displayDF.toArray(), (ctx.page - 1) * ctx.pageSize, ctx.page * ctx.pageSize));
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("collectionSize", ctx.displayDF.count())("page", ctx.page)("boundaryLinks", true)("rotate", true)("pageSize", ctx.pageSize);
      }
    },
    dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_4__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_4__.NgIf, _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_5__.NgbPagination, _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_5__.NgbPaginationPages, _angular_forms__WEBPACK_IMPORTED_MODULE_3__["ɵNgNoValidate"], _angular_forms__WEBPACK_IMPORTED_MODULE_3__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_3__.NumberValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_3__.CheckboxControlValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_3__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_3__.NgControlStatusGroup, _angular_forms__WEBPACK_IMPORTED_MODULE_3__.FormGroupDirective, _angular_forms__WEBPACK_IMPORTED_MODULE_3__.FormControlName, _protein_view_peptide_container_protein_view_peptide_container_component__WEBPACK_IMPORTED_MODULE_1__.ProteinViewPeptideContainerComponent, _angular_common__WEBPACK_IMPORTED_MODULE_4__.SlicePipe],
    styles: ["/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsInNvdXJjZVJvb3QiOiIifQ== */"]
  });
}

/***/ }),

/***/ 3187:
/*!********************************************************************************************!*\
  !*** ./src/app/protein-view-peptide-container/protein-view-peptide-container.component.ts ***!
  \********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ProteinViewPeptideContainerComponent: () => (/* binding */ ProteinViewPeptideContainerComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 1699);
/* harmony import */ var _web_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../web.service */ 5148);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ 6575);
/* harmony import */ var _scatter_time_plot_scatter_time_plot_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../scatter-time-plot/scatter-time-plot.component */ 945);
/* harmony import */ var _violin_time_plot_violin_time_plot_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../violin-time-plot/violin-time-plot.component */ 7396);





const _c0 = function (a0) {
  return {
    "color": a0
  };
};
function ProteinViewPeptideContainerComponent_div_0_b_5_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "b", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngStyle", _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpureFunction1"](2, _c0, ctx_r1.web.settings.colorMap[ctx_r1.data.Precursor_Id]));
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"](" ", ctx_r1.data.Precursor_Id, " ");
  }
}
function ProteinViewPeptideContainerComponent_div_0_ng_template_6_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "b", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"](" ", ctx_r3.data.Precursor_Id, " ");
  }
}
function ProteinViewPeptideContainerComponent_div_0_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](1, "hr");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](2, "div", 2)(3, "div", 3)(4, "div", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](5, ProteinViewPeptideContainerComponent_div_0_b_5_Template, 2, 4, "b", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](6, ProteinViewPeptideContainerComponent_div_0_ng_template_6_Template, 2, 1, "ng-template", null, 6, _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplateRefExtractor"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](8, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](9);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](10, "br");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](11);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](12, "br");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](13);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](14, "br");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](15);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](16, "br");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](17);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](18, "br");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](19);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](20, "br");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](21);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](22, "br");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](23);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](24, "br");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](25);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](26, "br");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](27);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](28, "br");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](29);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](30, "br");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](31);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](32, "br");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](33);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](34, "br");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](35);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](36, "br");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](37);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](38, "br");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](39);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](40, "br");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](41);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](42, "br");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](43);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](44, "br");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](45, "div", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](46, "app-scatter-time-plot", 8)(47, "app-violin-time-plot", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const _r2 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵreference"](7);
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx_r0.web.settings.colorMap[ctx_r0.data.Precursor_Id])("ngIfElse", _r2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"](" Proteotypic: ", ctx_r0.data.Proteotypic, " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"](" Strip Sequence: ", ctx_r0.data.Stripped_Sequence, " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"](" Time Points: ", ctx_r0.data.n_TimePoints, " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"](" Samples: ", ctx_r0.data.n_Samples, " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"](" TAU POI: ", ctx_r0.data.tau_POI, " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"](" TAU POI Range: ", ctx_r0.data.tau_POI_range, " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"](" TAU POI Range Relative: ", ctx_r0.data.tau_POI_range_relative, " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"](" TAU POI Lower Bound: ", ctx_r0.data.tau_POI_lower_bound, " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"](" TAU POI Upper Bound: ", ctx_r0.data.tau_POI_upper_bound, " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"](" Halflife POI: ", ctx_r0.data.HalfLife_POI, " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"](" Halflife POI Range: ", ctx_r0.data.HalfLife_POI_range, " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"](" Halflife POI Range Relative: ", ctx_r0.data.HalfLife_POI_range_relative, " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"](" Halflife POI Lower Bound: ", ctx_r0.data.HalfLife_POI_lower_bound, " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"](" Halflife POI Upper Bound: ", ctx_r0.data.HalfLife_POI_upper_bound, " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"](" rss: ", ctx_r0.data.rss, " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"](" AverageRSS: ", ctx_r0.data.AverageRSS, " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"](" Engine: ", ctx_r0.data.Engine, " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"](" Tissue: ", ctx_r0.data.Tissue, " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("data", ctx_r0.data);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("data", ctx_r0.data.values);
  }
}
class ProteinViewPeptideContainerComponent {
  set data(value) {
    this._data = value;
  }
  get data() {
    return this._data;
  }
  constructor(web) {
    this.web = web;
    this._data = undefined;
  }
  static #_ = this.ɵfac = function ProteinViewPeptideContainerComponent_Factory(t) {
    return new (t || ProteinViewPeptideContainerComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_web_service__WEBPACK_IMPORTED_MODULE_0__.WebService));
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineComponent"]({
    type: ProteinViewPeptideContainerComponent,
    selectors: [["app-protein-view-peptide-container"]],
    inputs: {
      data: "data"
    },
    decls: 1,
    vars: 1,
    consts: [["class", "row m-5", 4, "ngIf"], [1, "row", "m-5"], [1, "col-3"], [1, "card"], [1, "card-body"], ["class", "card-title", 3, "ngStyle", 4, "ngIf", "ngIfElse"], ["normal", ""], [1, "col-9"], [3, "data"], [1, "card-title", 3, "ngStyle"], [1, "card-title"]],
    template: function ProteinViewPeptideContainerComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](0, ProteinViewPeptideContainerComponent_div_0_Template, 48, 22, "div", 0);
      }
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx.data);
      }
    },
    dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_4__.NgIf, _angular_common__WEBPACK_IMPORTED_MODULE_4__.NgStyle, _scatter_time_plot_scatter_time_plot_component__WEBPACK_IMPORTED_MODULE_1__.ScatterTimePlotComponent, _violin_time_plot_violin_time_plot_component__WEBPACK_IMPORTED_MODULE_2__.ViolinTimePlotComponent],
    styles: ["/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsInNvdXJjZVJvb3QiOiIifQ== */"]
  });
}

/***/ }),

/***/ 7650:
/*!**************************************************************************************!*\
  !*** ./src/app/protein-view-scatter-h-vs-l/protein-view-scatter-h-vs-l.component.ts ***!
  \**************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ProteinViewScatterHVsLComponent: () => (/* binding */ ProteinViewScatterHVsLComponent)
/* harmony export */ });
/* harmony import */ var data_forge__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! data-forge */ 7090);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 1699);
/* harmony import */ var _web_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../web.service */ 5148);
/* harmony import */ var angular_plotly_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! angular-plotly.js */ 4676);




class ProteinViewScatterHVsLComponent {
  set data(values) {
    this._data = values;
    this.tissueName = this._data.first().Tissue;
    this.drawGraph();
  }
  get data() {
    return this._data;
  }
  constructor(web) {
    this.web = web;
    this._data = new data_forge__WEBPACK_IMPORTED_MODULE_0__.DataFrame();
    this.tissueName = "";
    this.graphData = [];
    this.graphLayout = {
      title: this.tissueName,
      xaxis: {
        title: "Log2 H"
      },
      yaxis: {
        title: "Log2 L"
      }
    };
  }
  drawGraph() {
    const graphData = [];
    const temp = {};
    this.data.forEach(row => {
      if (!(row.Engine in temp)) {
        temp[row.Engine] = {
          x: [],
          y: [],
          text: [],
          mode: 'markers',
          type: 'scatter',
          marker: {
            size: 5,
            color: this.web.settings.colorMap[row.Engine]
          },
          name: row.Engine
        };
      }
      row.values.forEach(value => {
        if (value.Sample_H_over_HL !== null) {
          temp[row.Engine].x.push(Math.log2(value.SampleH));
          temp[row.Engine].y.push(Math.log2(value.SampleL));
          temp[row.Engine].text.push(`${value.Sample_Name}<br> ${row.Precursor_Id}<br> H/L: ${value.Sample_H_over_HL}<br> ${row.Engine}`);
        }
      });
    });
    for (const i in temp) {
      graphData.push(temp[i]);
    }
    this.graphLayout.title = this.tissueName;
    this.graphData = graphData;
  }
  static #_ = this.ɵfac = function ProteinViewScatterHVsLComponent_Factory(t) {
    return new (t || ProteinViewScatterHVsLComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_web_service__WEBPACK_IMPORTED_MODULE_1__.WebService));
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineComponent"]({
    type: ProteinViewScatterHVsLComponent,
    selectors: [["app-protein-view-scatter-h-vs-l"]],
    inputs: {
      data: "data"
    },
    decls: 1,
    vars: 4,
    consts: [[3, "data", "layout", "updateOnDataChange", "updateOnLayoutChange"]],
    template: function ProteinViewScatterHVsLComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](0, "plotly-plot", 0);
      }
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("data", ctx.graphData)("layout", ctx.graphLayout)("updateOnDataChange", true)("updateOnLayoutChange", true);
      }
    },
    dependencies: [angular_plotly_js__WEBPACK_IMPORTED_MODULE_3__.PlotlyComponent],
    styles: ["/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsInNvdXJjZVJvb3QiOiIifQ== */"]
  });
}

/***/ }),

/***/ 3618:
/*!**********************************************************************************!*\
  !*** ./src/app/protein-view-tissue-based/protein-view-tissue-based.component.ts ***!
  \**********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ProteinViewTissueBasedComponent: () => (/* binding */ ProteinViewTissueBasedComponent)
/* harmony export */ });
/* harmony import */ var data_forge__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! data-forge */ 7090);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 1699);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ 6575);
/* harmony import */ var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ 6101);
/* harmony import */ var _protein_view_scatter_h_vs_l_protein_view_scatter_h_vs_l_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../protein-view-scatter-h-vs-l/protein-view-scatter-h-vs-l.component */ 7650);





function ProteinViewTissueBasedComponent_div_8_div_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](1, "app-protein-view-scatter-h-vs-l", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const t_r3 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("data", t_r3);
  }
}
function ProteinViewTissueBasedComponent_div_8_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](1, ProteinViewTissueBasedComponent_div_8_div_1_Template, 2, 1, "div", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngForOf", ctx_r1.groupData);
  }
}
const _c0 = function (a1) {
  return {
    "accordion-button": true,
    "collapsed": a1
  };
};
class ProteinViewTissueBasedComponent {
  set data(values) {
    this._data = values;
    this.groupData = this._data.groupBy(row => row.Tissue).bake();
  }
  get data() {
    return this._data;
  }
  constructor() {
    this.iscollapse = false;
    this._data = new data_forge__WEBPACK_IMPORTED_MODULE_0__.DataFrame();
    this.groupData = new data_forge__WEBPACK_IMPORTED_MODULE_0__.Series();
  }
  static #_ = this.ɵfac = function ProteinViewTissueBasedComponent_Factory(t) {
    return new (t || ProteinViewTissueBasedComponent)();
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineComponent"]({
    type: ProteinViewTissueBasedComponent,
    selectors: [["app-protein-view-tissue-based"]],
    inputs: {
      data: "data"
    },
    decls: 9,
    vars: 5,
    consts: [[1, "accordion"], [1, "accordion-item"], [1, "accordion-header"], ["type", "button", 3, "ngClass", "click"], [3, "ngbCollapse", "ngbCollapseChange"], ["collapse", "ngbCollapse"], [1, "accordion-body"], ["class", "row", 4, "ngIf"], [1, "row"], ["class", "col-4", 4, "ngFor", "ngForOf"], [1, "col-4"], [3, "data"]],
    template: function ProteinViewTissueBasedComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 0)(1, "div", 1)(2, "h2", 2)(3, "button", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function ProteinViewTissueBasedComponent_Template_button_click_3_listener() {
          return ctx.iscollapse = !ctx.iscollapse;
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](4, " Tissue overview ");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](5, "div", 4, 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("ngbCollapseChange", function ProteinViewTissueBasedComponent_Template_div_ngbCollapseChange_5_listener($event) {
          return ctx.iscollapse = $event;
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](7, "div", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](8, ProteinViewTissueBasedComponent_div_8_Template, 2, 1, "div", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()()()();
      }
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpureFunction1"](3, _c0, ctx.iscollapse));
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngbCollapse", ctx.iscollapse);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx.groupData.count() > 0);
      }
    },
    dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_3__.NgClass, _angular_common__WEBPACK_IMPORTED_MODULE_3__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_3__.NgIf, _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_4__.NgbCollapse, _protein_view_scatter_h_vs_l_protein_view_scatter_h_vs_l_component__WEBPACK_IMPORTED_MODULE_1__.ProteinViewScatterHVsLComponent],
    styles: ["/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsInNvdXJjZVJvb3QiOiIifQ== */"]
  });
}

/***/ }),

/***/ 2569:
/*!********************************************************!*\
  !*** ./src/app/protein-view/protein-view.component.ts ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ProteinViewComponent: () => (/* binding */ ProteinViewComponent)
/* harmony export */ });
/* harmony import */ var data_forge__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! data-forge */ 7090);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/core */ 1699);
/* harmony import */ var _web_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../web.service */ 5148);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/forms */ 8849);
/* harmony import */ var _toast_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../toast.service */ 6837);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/common */ 6575);
/* harmony import */ var _protein_search_protein_search_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../protein-search/protein-search.component */ 8796);
/* harmony import */ var _protein_view_peptide_collection_protein_view_peptide_collection_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../protein-view-peptide-collection/protein-view-peptide-collection.component */ 225);
/* harmony import */ var _protein_modelling_collection_protein_modelling_collection_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../protein-modelling-collection/protein-modelling-collection.component */ 6280);
/* harmony import */ var _protein_tau_collection_protein_tau_collection_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../protein-tau-collection/protein-tau-collection.component */ 4977);
/* harmony import */ var _floating_panels_floating_panels_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../floating-panels/floating-panels.component */ 9897);
/* harmony import */ var _coverage_plot_coverage_plot_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../coverage-plot/coverage-plot.component */ 3156);












function ProteinViewComponent_div_7_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](0, "div", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](1, "app-protein-tau-collection", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("data", ctx_r0.filteredData);
  }
}
function ProteinViewComponent_div_8_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](0, "div", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](1, "app-protein-modelling-collection", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("data", ctx_r1.modellingDataGroup);
  }
}
function ProteinViewComponent_div_9_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](0, "div", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](1, "app-coverage-plot", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("coverageData", ctx_r2.coverageData);
  }
}
function ProteinViewComponent_div_10_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](0, "div", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](1, "app-protein-view-peptide-collection", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("data", ctx_r3.filteredData);
  }
}
function ProteinViewComponent_ng_template_12_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](0, "div", 11)(1, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](2, " No data could be found with the above filter parameters. ");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]()();
  }
}
function ProteinViewComponent_ng_template_14_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](0, "div", 11)(1, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](2, " Loading modelling data... ");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]()();
  }
}
class ProteinViewComponent {
  set filteredData(value) {
    this._filteredDF = value;
  }
  get filteredData() {
    return this._filteredDF;
  }
  set proteinGroup(value) {
    this.protein = value;
    this.web.getMSData(this.protein).subscribe(data => {
      this.df = new data_forge__WEBPACK_IMPORTED_MODULE_0__.DataFrame(data);
      console.log(this.df);
    });
    for (const i of value.split(",")) {
      this.web.getCoverageData(i).subscribe(data => {
        this.coverageData = data;
      });
    }
  }
  constructor(web, fb, toastService) {
    this.web = web;
    this.fb = fb;
    this.toastService = toastService;
    this.protein = "";
    this.df = new data_forge__WEBPACK_IMPORTED_MODULE_0__.DataFrame();
    this._filteredDF = new data_forge__WEBPACK_IMPORTED_MODULE_0__.DataFrame();
    this.modellingData = new data_forge__WEBPACK_IMPORTED_MODULE_0__.DataFrame();
    //modellingDataGroup: ISeries<number, IDataFrame<number, Modelling>> = new Series()
    this.modellingDataGroup = new data_forge__WEBPACK_IMPORTED_MODULE_0__.Series();
    this.coverageData = undefined;
    this.page = 1;
  }
  handlerFilterDFUpdate(value) {
    this.filteredData = value;
    const ids = value.getSeries("id").bake().toArray();
    const days = [];
    for (const s of this.web.settings.selectedSamples) {
      if (!days.includes(this.web.settings.sampleMap[s].Days)) {
        days.push(this.web.settings.sampleMap[s].Days);
      }
    }
    if (days.length > 0 && ids.length > 0) {
      this.toastService.show("Data formating", "Grouping data by tissue");
      this.modellingDataGroup = this.filteredData.where(row => {
        return row.tau_model !== null;
      }).groupBy(row => {
        return row.Tissue;
      }).bake();
      // this.web.postModellingDataMass(ids, days).subscribe((data) => {
      //   this.modellingData = new DataFrame(data)
      //   this.modellingDataGroup = this.modellingData.groupBy((row) => {
      //     return row.Tissue
      //   }).bake()
      //   console.log(this.modellingData)
      // })
    }
  }
  static #_ = this.ɵfac = function ProteinViewComponent_Factory(t) {
    return new (t || ProteinViewComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdirectiveInject"](_web_service__WEBPACK_IMPORTED_MODULE_1__.WebService), _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdirectiveInject"](_angular_forms__WEBPACK_IMPORTED_MODULE_10__.FormBuilder), _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdirectiveInject"](_toast_service__WEBPACK_IMPORTED_MODULE_2__.ToastService));
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdefineComponent"]({
    type: ProteinViewComponent,
    selectors: [["app-protein-view"]],
    inputs: {
      proteinGroup: "proteinGroup"
    },
    decls: 16,
    vars: 10,
    consts: [[1, "d-flex", "justify-content-center"], [1, "container"], [3, "data", "filteredData"], ["class", "container mt-5", 4, "ngIf", "ngIfElse"], ["class", "container mt-5", 4, "ngIf"], [3, "filteredDF"], ["empty", ""], ["loadingModelling", ""], [1, "container", "mt-5"], [3, "data"], [3, "coverageData"], [1, "container", "d-flex", "justify-content-center", "align-content-center"]],
    template: function ProteinViewComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](0, "div", 0)(1, "div")(2, "h1")(3, "b");
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]()()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](5, "div", 1)(6, "app-protein-search", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵlistener"]("filteredData", function ProteinViewComponent_Template_app_protein_search_filteredData_6_listener($event) {
          return ctx.handlerFilterDFUpdate($event);
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](7, ProteinViewComponent_div_7_Template, 2, 1, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](8, ProteinViewComponent_div_8_Template, 2, 1, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](9, ProteinViewComponent_div_9_Template, 2, 1, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](10, ProteinViewComponent_div_10_Template, 2, 1, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](11, "app-floating-panels", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](12, ProteinViewComponent_ng_template_12_Template, 3, 0, "ng-template", null, 6, _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](14, ProteinViewComponent_ng_template_14_Template, 3, 0, "ng-template", null, 7, _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplateRefExtractor"]);
      }
      if (rf & 2) {
        const _r4 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵreference"](13);
        const _r6 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵreference"](15);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtextInterpolate"](ctx.protein);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("data", ctx.df);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("ngIf", ctx.filteredData.count() > 0)("ngIfElse", _r4);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("ngIf", ctx.modellingDataGroup.count() > 0)("ngIfElse", _r6);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("ngIf", ctx.coverageData);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("ngIf", ctx.filteredData.count() > 0)("ngIfElse", _r4);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("filteredDF", ctx.filteredData);
      }
    },
    dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_11__.NgIf, _protein_search_protein_search_component__WEBPACK_IMPORTED_MODULE_3__.ProteinSearchComponent, _protein_view_peptide_collection_protein_view_peptide_collection_component__WEBPACK_IMPORTED_MODULE_4__.ProteinViewPeptideCollectionComponent, _protein_modelling_collection_protein_modelling_collection_component__WEBPACK_IMPORTED_MODULE_5__.ProteinModellingCollectionComponent, _protein_tau_collection_protein_tau_collection_component__WEBPACK_IMPORTED_MODULE_6__.ProteinTauCollectionComponent, _floating_panels_floating_panels_component__WEBPACK_IMPORTED_MODULE_7__.FloatingPanelsComponent, _coverage_plot_coverage_plot_component__WEBPACK_IMPORTED_MODULE_8__.CoveragePlotComponent],
    styles: ["/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsInNvdXJjZVJvb3QiOiIifQ== */"]
  });
}

/***/ }),

/***/ 945:
/*!******************************************************************!*\
  !*** ./src/app/scatter-time-plot/scatter-time-plot.component.ts ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ScatterTimePlotComponent: () => (/* binding */ ScatterTimePlotComponent)
/* harmony export */ });
/* harmony import */ var D_WebstormProjects_turnoverAtlasNG_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 1670);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 1699);
/* harmony import */ var _web_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../web.service */ 5148);
/* harmony import */ var angular_plotly_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! angular-plotly.js */ 4676);




class ScatterTimePlotComponent {
  set data(value) {
    this._data = value;
    this.drawGraph();
  }
  constructor(web) {
    this.web = web;
    this.graphData = [];
    this.graphLayout = {
      title: "Scatter Time Plot",
      xaxis: {
        title: "Time (days)",
        range: [0, 50]
      },
      yaxis: {
        title: "H/L",
        range: [0, 1.5]
      }
    };
    this.web.redrawSubject.subscribe(() => {
      this.drawGraph().then(() => {});
    });
  }
  drawGraph() {
    var _this = this;
    return (0,D_WebstormProjects_turnoverAtlasNG_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      if (_this._data) {
        let days = [];
        const daysMap = {};
        const graphData = [];
        const temp = {
          x: [],
          y: [],
          mode: 'markers',
          type: 'scatter',
          name: 'H + H/L Experimental',
          marker: {
            size: 12
          }
        };
        for (const i of _this._data.values) {
          if (_this.web.settings.selectedSamples.includes(i.Sample_Name)) {
            if (i.Sample_H_over_HL !== null) {
              temp.x.push(_this.web.settings.sampleMap[i.Sample_Name].Days);
              temp.y.push(i.Sample_H_over_HL);
              if (!days.includes(_this.web.settings.sampleMap[i.Sample_Name].Days)) {
                days.push(_this.web.settings.sampleMap[i.Sample_Name].Days);
                daysMap[_this.web.settings.sampleMap[i.Sample_Name].Days] = [];
              }
              daysMap[_this.web.settings.sampleMap[i.Sample_Name].Days].push(i.Sample_H_over_HL);
            }
          }
        }
        if (!days.includes(50)) {
          days.push(50);
        }
        if (!days.includes(0)) {
          days.push(0);
        }
        days = days.sort((a, b) => a - b);
        graphData.push(temp);
        let modelResult;
        if (_this._data.tau_POI !== null) {
          const pulseModel = {
            x: [0],
            y: [0],
            mode: 'lines',
            name: 'Pulse Model',
            line: {
              color: 'rgb(55, 128, 191)',
              shape: 'spline'
            }
          };
          const uppderBound = {
            x: [0],
            y: [0],
            mode: 'lines',
            name: 'Pulse Model Upper Bound',
            line: {
              shape: 'spline',
              color: 'rgb(155,41,113)'
            }
          };
          const lowerBound = {
            x: [0],
            y: [0],
            mode: 'lines',
            name: 'Pulse Model Lower Bound',
            line: {
              shape: 'spline',
              color: 'rgb(41,155,43)'
            }
          };
          for (const i of _this._data.tau_model) {
            pulseModel.x.push(i.day);
            pulseModel.y.push(i.value);
            uppderBound.x.push(i.day);
            uppderBound.y.push(i.tau_POI_upper_bound);
            lowerBound.x.push(i.day);
            lowerBound.y.push(i.tau_POI_lower_bound);
          }
          //graphData.push(kpoolModel)
          graphData.push(pulseModel);
          graphData.push(uppderBound);
          graphData.push(lowerBound);
          // try {
          //   modelResult = await this.web.postModellingData(this._data.Tissue, this._data.Engine, this._data.tau_POI, this._data.tau_POI_upper_bound, this._data.tau_POI_lower_bound, days).toPromise()
          //   const kpoolModel: any = {
          //     x: [0],
          //     y: [0],
          //     mode: 'lines',
          //     name: 'Kpool Model',
          //     line: {
          //       color: 'rgb(219, 64, 82)',
          //       shape: 'spline',
          //     }
          //   }
          //
          //
          //   for (const i of modelResult.kpool) {
          //     kpoolModel.x.push(i.day)
          //     kpoolModel.y.push(i.value)
          //   }
          //
          //   //graphData.push(uppderBound)
          //   //graphData.push(lowerBound)
          //   console.log(modelResult)
          // } catch (e) {
          //   console.log(e)
          // }
        }

        _this.graphData = graphData;
      }
    })();
  }
  static #_ = this.ɵfac = function ScatterTimePlotComponent_Factory(t) {
    return new (t || ScatterTimePlotComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_web_service__WEBPACK_IMPORTED_MODULE_1__.WebService));
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineComponent"]({
    type: ScatterTimePlotComponent,
    selectors: [["app-scatter-time-plot"]],
    inputs: {
      data: "data"
    },
    decls: 1,
    vars: 4,
    consts: [[3, "data", "layout", "updateOnLayoutChange", "updateOnDataChange"]],
    template: function ScatterTimePlotComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](0, "plotly-plot", 0);
      }
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("data", ctx.graphData)("layout", ctx.graphLayout)("updateOnLayoutChange", true)("updateOnDataChange", true);
      }
    },
    dependencies: [angular_plotly_js__WEBPACK_IMPORTED_MODULE_3__.PlotlyComponent],
    styles: ["/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsInNvdXJjZVJvb3QiOiIifQ== */"]
  });
}

/***/ }),

/***/ 5127:
/*!*****************************!*\
  !*** ./src/app/settings.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Settings: () => (/* binding */ Settings)
/* harmony export */ });
class Settings {
  constructor() {
    this.form = {};
    this.formExperimentParameters = {};
    this.currentColorPosition = 0;
    this.searchOperations = [];
    this.searchMap = {};
    this.colorMap = {};
    this.defaultColorList = ["#fd7f6f", "#7eb0d5", "#b2e061", "#bd7ebe", "#ffb55a", "#ffee65", "#beb9db", "#fdcce5", "#8bd3c7"];
    this.selectedMSDataID = [];
    this.sampleMap = {};
    this.baseUrl = "http://localhost:8000";
    this.selectedSamples = [];
  }
  export() {
    return {
      currentColorPosition: this.currentColorPosition,
      searchOperations: this.searchOperations,
      searchMap: this.searchMap,
      colorMap: this.colorMap,
      defaultColorList: this.defaultColorList,
      selectedMSDataID: this.selectedMSDataID,
      sampleMap: this.sampleMap,
      baseUrl: this.baseUrl,
      selectedSamples: this.selectedSamples
    };
  }
  import(settings) {
    for (const i in settings) {
      // @ts-ignore
      this[i] = settings[i];
    }
  }
  download() {
    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(this.export())));
    element.setAttribute('download', "settings.json");
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  }
}

/***/ }),

/***/ 6837:
/*!**********************************!*\
  !*** ./src/app/toast.service.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ToastService: () => (/* binding */ ToastService)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 1699);

class ToastService {
  constructor() {
    this.toasts = [];
  }
  show(header, body, delay = 5000, type = 'info') {
    this.toasts.push({
      header,
      body,
      delay,
      type
    });
    console.log(this.toasts);
  }
  remove(toast) {
    this.toasts = this.toasts.filter(t => t !== toast);
  }
  static #_ = this.ɵfac = function ToastService_Factory(t) {
    return new (t || ToastService)();
  };
  static #_2 = this.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({
    token: ToastService,
    factory: ToastService.ɵfac,
    providedIn: 'root'
  });
}

/***/ }),

/***/ 2080:
/*!******************************************!*\
  !*** ./src/app/toast/toast.component.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ToastComponent: () => (/* binding */ ToastComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 1699);
/* harmony import */ var _toast_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../toast.service */ 6837);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ 6575);
/* harmony import */ var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ 6101);




function ToastComponent_ngb_toast_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "ngb-toast", 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("hidden", function ToastComponent_ngb_toast_0_Template_ngb_toast_hidden_0_listener() {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r3);
      const toast_r1 = restoredCtx.$implicit;
      const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](ctx_r2.toastService.remove(toast_r1));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "div", 2)(2, "div", 3)(3, "b");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](6, "div", 3)(7, "button", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function ToastComponent_ngb_toast_0_Template_button_click_7_listener() {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r3);
      const toast_r1 = restoredCtx.$implicit;
      const ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](ctx_r4.toastService.remove(toast_r1));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()()();
  }
  if (rf & 2) {
    const toast_r1 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngClass", toast_r1.type === "info" ? "bg-primary text-light" : toast_r1.type === "success" ? "bg-success text-light" : toast_r1.type === "warning" ? "bg-warning text-light" : "bg-danger text-light")("autohide", true)("delay", toast_r1.delay);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"]("", toast_r1.header, ": ");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"]("", toast_r1.body, " ");
  }
}
class ToastComponent {
  constructor(toastService) {
    this.toastService = toastService;
  }
  static #_ = this.ɵfac = function ToastComponent_Factory(t) {
    return new (t || ToastComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_toast_service__WEBPACK_IMPORTED_MODULE_0__.ToastService));
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({
    type: ToastComponent,
    selectors: [["app-toast"]],
    decls: 1,
    vars: 1,
    consts: [[3, "ngClass", "autohide", "delay", "hidden", 4, "ngFor", "ngForOf"], [3, "ngClass", "autohide", "delay", "hidden"], [1, "d-flex"], [1, "p-2"], ["type", "button", "aria-label", "Close", 1, "btn", "btn-close", 3, "click"]],
    template: function ToastComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](0, ToastComponent_ngb_toast_0_Template, 8, 5, "ngb-toast", 0);
      }
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngForOf", ctx.toastService.toasts);
      }
    },
    dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_2__.NgClass, _angular_common__WEBPACK_IMPORTED_MODULE_2__.NgForOf, _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_3__.NgbToast],
    styles: ["[_nghost-%COMP%] {\n  position: fixed;\n  bottom: 0;\n  right: 0;\n  margin: 0.5em;\n  z-index: 1200;\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvdG9hc3QvdG9hc3QuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxlQUFBO0VBQ0EsU0FBQTtFQUNBLFFBQUE7RUFDQSxhQUFBO0VBQ0EsYUFBQTtBQUNGIiwic291cmNlc0NvbnRlbnQiOlsiOmhvc3R7XHJcbiAgcG9zaXRpb246IGZpeGVkO1xyXG4gIGJvdHRvbTogMDtcclxuICByaWdodDogMDtcclxuICBtYXJnaW46IDAuNWVtO1xyXG4gIHotaW5kZXg6IDEyMDA7XHJcbn1cclxuXHJcblxyXG5cclxuIl0sInNvdXJjZVJvb3QiOiIifQ== */"]
  });
}

/***/ }),

/***/ 8150:
/*!****************************************************************!*\
  !*** ./src/app/variant-selector/variant-selector.component.ts ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   VariantSelectorComponent: () => (/* binding */ VariantSelectorComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 1699);
/* harmony import */ var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ 6101);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ 6575);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ 8849);




function VariantSelectorComponent_option_9_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "option", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const d_r1 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("value", d_r1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](d_r1);
  }
}
const _c0 = function () {
  return {
    standalone: true
  };
};
class VariantSelectorComponent {
  set data(value) {
    this._data = value;
    this.selectedData = value[0];
    if (this._data.length == 1) {
      this.selectedData = this._data[0];
    }
  }
  get data() {
    return this._data;
  }
  constructor(modal) {
    this.modal = modal;
    this._data = [];
    this.selectedData = "";
  }
  submit() {
    console.log("navigate to " + this.selectedData);
    this.modal.close(this.selectedData);
  }
  cancel() {
    this.modal.dismiss();
  }
  static #_ = this.ɵfac = function VariantSelectorComponent_Factory(t) {
    return new (t || VariantSelectorComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_1__.NgbActiveModal));
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
    type: VariantSelectorComponent,
    selectors: [["app-variant-selector"]],
    inputs: {
      data: "data"
    },
    decls: 15,
    vars: 4,
    consts: [[1, "modal-header"], [1, "modal-title"], [1, "modal-body"], [1, "form-group"], ["for", "isoform-selector"], ["id", "isoform-selector", 1, "form-control", 3, "ngModel", "ngModelOptions", "ngModelChange"], [3, "value", 4, "ngFor", "ngForOf"], [1, "modal-footer"], ["type", "button", 1, "btn", "btn-default", 3, "click"], ["type", "button", 1, "btn", "btn-primary", 3, "click"], [3, "value"]],
    template: function VariantSelectorComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0)(1, "h4", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2, "Isoform Selector");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "div", 2)(4, "form")(5, "div", 3)(6, "label", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](7, "Select Isoform");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "select", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("ngModelChange", function VariantSelectorComponent_Template_select_ngModelChange_8_listener($event) {
          return ctx.selectedData = $event;
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](9, VariantSelectorComponent_option_9_Template, 2, 2, "option", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](10, "div", 7)(11, "button", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function VariantSelectorComponent_Template_button_click_11_listener() {
          return ctx.cancel();
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](12, "Cancel");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](13, "button", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function VariantSelectorComponent_Template_button_click_13_listener() {
          return ctx.submit();
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](14, "Proceed");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
      }
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngModel", ctx.selectedData)("ngModelOptions", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction0"](3, _c0));
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx.data);
      }
    },
    dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_2__.NgForOf, _angular_forms__WEBPACK_IMPORTED_MODULE_3__["ɵNgNoValidate"], _angular_forms__WEBPACK_IMPORTED_MODULE_3__.NgSelectOption, _angular_forms__WEBPACK_IMPORTED_MODULE_3__["ɵNgSelectMultipleOption"], _angular_forms__WEBPACK_IMPORTED_MODULE_3__.SelectControlValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_3__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_3__.NgControlStatusGroup, _angular_forms__WEBPACK_IMPORTED_MODULE_3__.NgModel, _angular_forms__WEBPACK_IMPORTED_MODULE_3__.NgForm],
    styles: ["/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsInNvdXJjZVJvb3QiOiIifQ== */"]
  });
}

/***/ }),

/***/ 7396:
/*!****************************************************************!*\
  !*** ./src/app/violin-time-plot/violin-time-plot.component.ts ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ViolinTimePlotComponent: () => (/* binding */ ViolinTimePlotComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 1699);
/* harmony import */ var _web_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../web.service */ 5148);
/* harmony import */ var angular_plotly_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! angular-plotly.js */ 4676);



class ViolinTimePlotComponent {
  set data(value) {
    this._data = value;
    this.drawGraph();
  }
  constructor(web) {
    this.web = web;
    this._data = [];
    this.graphData = [];
    this.graphLayout = {
      title: "Violin Time Plot",
      xaxis: {
        title: "Time (days)",
        tickvals: [],
        ticktext: [],
        fixedrange: true
      },
      yaxis: {
        title: "H/L"
      }
    };
    this.web.redrawSubject.subscribe(() => {
      this.drawGraph();
    });
  }
  drawGraph() {
    const graphData = [];
    const temp = {};
    let position = 0;
    this._data.forEach(i => {
      if (this.web.settings.selectedSamples.includes(i.Sample_Name)) {
        if (i.Sample_H_over_HL !== null) {
          if (!temp[this.web.settings.sampleMap[i.Sample_Name].Days]) {
            temp[this.web.settings.sampleMap[i.Sample_Name].Days] = {
              x: [],
              y: [],
              type: 'violin',
              name: this.web.settings.sampleMap[i.Sample_Name].Days,
              box: {
                visible: true
              },
              showlegend: false,
              spanmode: 'soft',
              meanline: {
                visible: true
              },
              line: {
                color: "black"
              },
              points: 'all'
            };
            if (position >= this.web.settings.defaultColorList.length) {
              position = 0;
            }
            temp[this.web.settings.sampleMap[i.Sample_Name].Days].fillcolor = this.web.settings.defaultColorList[position];
            position += 1;
            this.graphLayout.xaxis.tickvals.push(this.web.settings.sampleMap[i.Sample_Name].Days);
            this.graphLayout.xaxis.ticktext.push(this.web.settings.sampleMap[i.Sample_Name].Days);
          }
          temp[this.web.settings.sampleMap[i.Sample_Name].Days].x.push(this.web.settings.sampleMap[i.Sample_Name].Days);
          temp[this.web.settings.sampleMap[i.Sample_Name].Days].y.push(i.Sample_H_over_HL);
        }
      }
    });
    for (const i in temp) {
      graphData.push(temp[i]);
    }
    this.graphData = graphData;
  }
  static #_ = this.ɵfac = function ViolinTimePlotComponent_Factory(t) {
    return new (t || ViolinTimePlotComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_web_service__WEBPACK_IMPORTED_MODULE_0__.WebService));
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({
    type: ViolinTimePlotComponent,
    selectors: [["app-violin-time-plot"]],
    inputs: {
      data: "data"
    },
    decls: 2,
    vars: 4,
    consts: [[3, "data", "layout", "updateOnLayoutChange", "updateOnDataChange"]],
    template: function ViolinTimePlotComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](0, "plotly-plot", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1, "\n```\n");
      }
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("data", ctx.graphData)("layout", ctx.graphLayout)("updateOnLayoutChange", true)("updateOnDataChange", true);
      }
    },
    dependencies: [angular_plotly_js__WEBPACK_IMPORTED_MODULE_2__.PlotlyComponent],
    styles: ["/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsInNvdXJjZVJvb3QiOiIifQ== */"]
  });
}

/***/ }),

/***/ 5148:
/*!********************************!*\
  !*** ./src/app/web.service.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   WebService: () => (/* binding */ WebService)
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs */ 2513);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs */ 4980);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! rxjs */ 9736);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! rxjs */ 3738);
/* harmony import */ var data_forge__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! data-forge */ 7090);
/* harmony import */ var _settings__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./settings */ 5127);
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../environments/environment */ 553);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/core */ 1699);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/common/http */ 4860);
/* harmony import */ var _toast_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./toast.service */ 6837);







class WebService {
  constructor(http, toastService) {
    this.http = http;
    this.toastService = toastService;
    this.settings = new _settings__WEBPACK_IMPORTED_MODULE_1__.Settings();
    this.baseUrl = _environments_environment__WEBPACK_IMPORTED_MODULE_2__.environment.baseUrl;
    this.redrawSubject = new rxjs__WEBPACK_IMPORTED_MODULE_4__.Subject();
    this.modelParameters = [];
    this.selectionSubject = new rxjs__WEBPACK_IMPORTED_MODULE_4__.Subject();
    this.restoreSubject = new rxjs__WEBPACK_IMPORTED_MODULE_4__.Subject();
    this.filteredDF = new data_forge__WEBPACK_IMPORTED_MODULE_0__.DataFrame();
    this.initializeModelParameters = new rxjs__WEBPACK_IMPORTED_MODULE_4__.Subject();
  }
  searchProtein(proteinGroup, distinct = true) {
    if (proteinGroup === "") {
      return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.of)([]);
    }
    const params = {
      Protein_Group: proteinGroup
    };
    if (distinct) {
      params["distinct"] = "Protein_Group";
    }
    return this.http.get(`${this.baseUrl}/api/accessionmap/get_distinct/`, {
      params: params
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_6__.map)(data => {
      return data.results.map(d => d.Protein_Group);
    }));
  }
  typeAheadSearchTerm(term, searchType = "Protein_Group", distinct = true) {
    if (term === "") {
      return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.of)([]);
    }
    let params = {};
    if (searchType === "Protein_Group") {
      params = {
        Protein_Group: term
      };
      if (distinct) {
        params["distinct"] = "Protein_Group";
      }
    } else if (searchType === "Genes") {
      params = {
        Genes: term
      };
      if (distinct) {
        params["distinct"] = "Genes";
      }
    } else {
      return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.of)([]);
    }
    return this.http.get(`${this.baseUrl}/api/accessionmap/get_distinct/`, {
      params: params
    });
  }
  getSampleMetadata() {
    return this.http.get(`${this.baseUrl}/api/samplegroupmetadata/`, {
      responseType: 'json',
      observe: 'body',
      params: {
        page_size: "60"
      }
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_6__.map)(data => {
      return data.results;
    }));
  }
  getMSData(proteinGroup) {
    this.toastService.show("Loading", "Loading MS data of " + proteinGroup);
    return this.http.get(`${this.baseUrl}/api/turnoverdata/get_all_from_queryset/`, {
      responseType: 'json',
      observe: 'body',
      params: {
        Protein_Group: proteinGroup
      }
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_7__.tap)(data => {
      this.toastService.show("Success", "Successfully retrieved MS data of " + proteinGroup);
    }), (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.map)(data => {
      return data;
    }));
  }
  postModellingData(tissue, engine, tau_POI, tau_POI_upper_bound, tau_POI_lower_bound, data = []) {
    return this.http.post(`${this.baseUrl}/api/modelling/`, {
      Tissue: tissue,
      Engine: engine,
      Data: data,
      tau_POI: tau_POI,
      tau_POI_upper_bound: tau_POI_upper_bound,
      tau_POI_lower_bound: tau_POI_lower_bound
    }, {
      responseType: 'json',
      observe: 'body'
    });
  }
  postModellingDataMass(ids, data = []) {
    return this.http.post(`${this.baseUrl}/api/turnoverdata/get_modelling_data/`, {
      Data: data,
      ids: ids
    }, {
      responseType: 'json',
      observe: 'body'
    });
  }
  getAllModelParameters() {
    return this.http.get(`${this.baseUrl}/api/modelparameters/`, {
      responseType: 'json',
      observe: 'body',
      params: {
        page_size: 100000
      }
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_6__.map)(data => {
      return data.results;
    }));
  }
  selectionHandler(ids) {
    const idsAdd = ids.filter(id => {
      return !this.settings.selectedMSDataID.includes(id);
    });
    if (idsAdd.length > 0) {
      this.settings.selectedMSDataID.push(...idsAdd);
    }
    // const idsRemove = ids.filter((id) => {
    //   return this.selectedMSDataID.includes(id)
    // })
    //
    // if (idsRemove.length > 0) {
    //   this.selectedMSDataID = this.selectedMSDataID.filter((id) => {
    //     return !idsRemove.includes(id)
    //   })
    // }
    // if (idsAdd.length > 0 || idsRemove.length > 0) {
    //
    // }
    this.selectionSubject.next(true);
    this.redrawSubject.next(true);
  }
  setOperationColor(precursorID, color = "") {
    if (color === "") {
      if (!(precursorID in this.settings.colorMap)) {
        this.settings.colorMap[precursorID] = this.settings.defaultColorList[this.settings.currentColorPosition];
        this.settings.currentColorPosition += 1;
        if (this.settings.currentColorPosition >= this.settings.defaultColorList.length) {
          this.settings.currentColorPosition = 0;
        }
      }
    } else {
      this.settings.colorMap[precursorID] = color;
    }
  }
  removeSearchOperation(operation) {
    this.settings.searchOperations = this.settings.searchOperations.filter(op => {
      return op !== operation;
    });
    delete this.settings.colorMap[operation];
    for (const i in this.settings.searchMap) {
      this.settings.searchMap[i] = this.settings.searchMap[i].filter(op => {
        return op !== operation;
      });
      if (this.settings.searchMap[i].length === 0) {
        delete this.settings.searchMap[i];
        this.settings.selectedMSDataID = this.settings.selectedMSDataID.filter(id => {
          return id !== parseInt(i);
        });
      }
    }
  }
  mergeSearchOperations(operations, color = "", newOperationName = "", removeOld = true) {
    if (operations.length > 1) {
      if (newOperationName === "") {
        newOperationName = operations.join("_");
      }
      this.settings.searchOperations.push(newOperationName);
      for (const i in this.settings.searchMap) {
        let found = false;
        for (const j of operations) {
          if (this.settings.searchMap[i].includes(j)) {
            found = true;
            break;
          }
        }
        if (found) {
          if (removeOld) {
            this.settings.searchMap[i] = this.settings.searchMap[i].filter(op => {
              return !operations.includes(op);
            });
          }
          this.settings.searchMap[i].push(newOperationName);
        }
      }
      this.setOperationColor(newOperationName, color);
    }
    if (removeOld) {
      for (const i of operations) {
        delete this.settings.colorMap[i];
      }
    }
  }
  getCoverageData(proteinGroup, valid_tau = true) {
    return this.http.get(`${this.baseUrl}/api/proteinsequence/get_coverage/`, {
      responseType: 'json',
      observe: 'body',
      params: {
        AccessionID: proteinGroup,
        valid_tau: valid_tau
      }
    }).pipe();
  }
  getExactAccFromGene(gene) {
    return this.http.get(`${this.baseUrl}/api/accessionmap/get_exact_accession_id_from_genes/`, {
      responseType: 'json',
      observe: 'body',
      params: {
        genes: gene
      }
    });
  }
  static #_ = this.ɵfac = function WebService_Factory(t) {
    return new (t || WebService)(_angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_9__.HttpClient), _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵinject"](_toast_service__WEBPACK_IMPORTED_MODULE_3__.ToastService));
  };
  static #_2 = this.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdefineInjectable"]({
    token: WebService,
    factory: WebService.ɵfac,
    providedIn: 'root'
  });
}

/***/ }),

/***/ 553:
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   environment: () => (/* binding */ environment)
/* harmony export */ });
const environment = {
  production: false,
  baseUrl: "http://localhost:8000"
  // baseUrl: "http://
};

/***/ }),

/***/ 4913:
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser */ 6480);
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./app/app.module */ 8629);
/// <reference types="@angular/localize" />


_angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__.platformBrowser().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_0__.AppModule).catch(err => console.error(err));

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ __webpack_require__.O(0, ["vendor"], () => (__webpack_exec__(4686), __webpack_exec__(4913)));
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=main.js.map