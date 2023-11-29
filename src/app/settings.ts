import {Sample} from "./sample";
import {environment} from "../environments/environment";

export class Settings {
    currentProteinGroup: string = ""
    form: any = {

    }
    formExperimentParameters: any = {

    }
    currentColorPosition: number = 0
    kpoolOnlyColorMap: any = {}
    searchOperations: string[] = []
    searchMap: any = {}
    minimumHalfLife: number = 0
    maximumHalfLife: number = 0
    colorMap: any = {}

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
    selectedMSDataID: number[] = []
    sampleMap: {[key: string]: Sample} = {}
    baseUrl = environment.baseUrl
    selectedSamples: string[] = []
    markerColor: string = "rgb(155,41,113)"
    scatterPlotMarkerSize: number = 8
    upperBoundPulseColor: string = "rgb(55,191,171)"
    lowerBoundPulseColor: string =  "rgb(55,191,171)"
    pulseColor: string = "rgb(155,41,113)"
    kpoolColor: string = "rgb(255,140,162)"
    scatterPlotXAxisRange: number[] = [-50/20, 51]
    scatterPlotYAxisRange: number[] = [-1/20, 1]
    dataDistributionForm: any = {

    }
    filters: any[] = []
    barChartColorMap: any = {

    }
    modellingKPool: boolean = true
    modellingKPoolColor: string = "rgb(191,55,55)"
    coveragePlotColorGradient: string[] = ['#fdd46d', '#d90404', '#000000']
    export() {
        return {
            currentProteinGroup: this.currentProteinGroup,
            currentColorPosition: this.currentColorPosition,
            searchOperations: this.searchOperations,
            searchMap: this.searchMap,
            colorMap: this.colorMap,
            defaultColorList: this.defaultColorList,
            selectedMSDataID: this.selectedMSDataID,
            sampleMap: this.sampleMap,
            baseUrl: this.baseUrl,
            selectedSamples: this.selectedSamples,
            scatterPlotMarkerSize: this.scatterPlotMarkerSize,
            upperBoundPulseColor: this.upperBoundPulseColor,
            lowerBoundPulseColor: this.lowerBoundPulseColor,
            pulseColor: this.pulseColor,
            kpoolColor: this.kpoolColor,
            scatterPlotXAxisRange: this.scatterPlotXAxisRange,
            scatterPlotYAxisRange: this.scatterPlotYAxisRange,
            markerColor: this.markerColor,
            dataDistributionForm: this.dataDistributionForm,
          filters: this.filters,
          barChartColorMap: this.barChartColorMap,
          modellingKPool: this.modellingKPool,
          modellingKPoolColor: this.modellingKPoolColor,

        }
    }

    import(settings: any) {
        for (const i in settings) {
            // @ts-ignore
            this[i] = settings[i]
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

  addFilter(value: any) {
    if (value.filterName === "") {
      const filterName = []
      if (value.tissues.length > 0) {
        filterName.push(value.tissues.join(", "))
      }
      if (value.engines.length > 0) {
        filterName.push(value.engines.join(", "))
      }
      value.filterName = filterName.join(" | ")
    }
    if (value.filterName === "") {
      value.filterName = value.sequences.slice(0, 3).join(", ")
    }
    value.id = crypto.randomUUID()
    console.log(value.id)
    this.filters.push(value)
    return value
  }

  removeFilter(id: string) {
    this.filters = this.filters.filter((f) => {
      return f.id !== id
    })
  }
}
