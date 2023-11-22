import {Sample} from "./sample";
import {environment} from "../environments/environment";

export class Settings {
    currentProteinGroup: string = ""
    form: any = {

    }
    formExperimentParameters: any = {

    }
    currentColorPosition: number = 0

    searchOperations: string[] = []
    searchMap: any = {}

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
    markerColor: string = "rgb(55, 128, 191)"
    scatterPlotMarkerSize: number = 10
    upperBoundPulseColor: string = "rgb(155,41,113)"
    lowerBoundPulseColor: string = "rgb(41,155,43)"
    pulseColor: string = "rgb(55, 128, 191)"
    kpoolColor: string = "rgb(219, 64, 82)"
    scatterPlotXAxisRange: number[] = [0, 50]
    scatterPlotYAxisRange: number[] = [0, 1]
    dataDistributionForm: any = {

    }
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


}
