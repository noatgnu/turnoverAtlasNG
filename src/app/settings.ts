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
