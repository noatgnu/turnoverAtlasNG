import { Component } from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {WebService} from "../web.service";
import {NgbActiveModal, NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-plot-settings',
  templateUrl: './plot-settings.component.html',
  styleUrls: ['./plot-settings.component.scss']
})
export class PlotSettingsComponent {

  form = this.fb.group({
    scatterPlotXAxisRangeMin: [this.web.settings.scatterPlotXAxisRange[0],],
    scatterPlotXAxisRangeMax: [this.web.settings.scatterPlotXAxisRange[1],],
    scatterPlotYAxisRangeMin: [this.web.settings.scatterPlotYAxisRange[0],],
    scatterPlotYAxisRangeMax: [this.web.settings.scatterPlotYAxisRange[1],],
    scatterPlotMarkerSize: [this.web.settings.scatterPlotMarkerSize,],
    kpoolColor:  [this.web.settings.kpoolColor,],
    upperBoundColor: [this.web.settings.upperBoundPulseColor,],
    lowerBoundColor: [this.web.settings.lowerBoundPulseColor,],
    pulseColor: [this.web.settings.pulseColor,],
    markerColor: [this.web.settings.markerColor,],
  })

  formKpoolOnly = this.fb.group({
  })

  kPoolOnlyList: string[] = Object.keys(this.web.settings.kpoolOnlyColorMap)

  constructor(private fb: FormBuilder, private web: WebService, private modal: NgbActiveModal) {
    const temp: any = {}
    const kPoolOnlyList: string[] = []
    for (const i in this.web.settings.kpoolOnlyColorMap) {
      kPoolOnlyList.push(i)
      temp[i] = [this.web.settings.kpoolOnlyColorMap[i],]
    }
    this.kPoolOnlyList = kPoolOnlyList
    this.formKpoolOnly = this.fb.group(temp)
    console.log(this.formKpoolOnly)
  }

  close() {
    this.modal.dismiss()
  }

  save() {
    if (this.form.valid) {
      if (this.form.value["scatterPlotXAxisRangeMin"] && this.form.value["scatterPlotXAxisRangeMax"]) {
        this.web.settings.scatterPlotXAxisRange = [this.form.value["scatterPlotXAxisRangeMin"], this.form.value["scatterPlotXAxisRangeMax"]]
      }
      if (this.form.value["scatterPlotYAxisRangeMin"] && this.form.value["scatterPlotYAxisRangeMax"]) {
        this.web.settings.scatterPlotYAxisRange = [this.form.value["scatterPlotYAxisRangeMin"], this.form.value["scatterPlotYAxisRangeMax"]]
      }
      if (this.form.value["scatterPlotMarkerSize"]) {
        this.web.settings.scatterPlotMarkerSize = this.form.value["scatterPlotMarkerSize"]
      }
      if (this.form.value["kpoolColor"]) {
        this.web.settings.kpoolColor = this.form.value["kpoolColor"]
      }
      if (this.form.value["upperBoundColor"]) {
        this.web.settings.upperBoundPulseColor = this.form.value["upperBoundColor"]
      }
      if (this.form.value["lowerBoundColor"]) {
        this.web.settings.lowerBoundPulseColor = this.form.value["lowerBoundColor"]
      }
      if (this.form.value["pulseColor"]) {
        this.web.settings.pulseColor = this.form.value["pulseColor"]
      }
      if (this.form.value["markerColor"]) {
        this.web.settings.markerColor = this.form.value["markerColor"]
      }
    }
    if (this.formKpoolOnly.valid) {
      for (const i in this.formKpoolOnly.value) {
        if (this.web.settings.kpoolOnlyColorMap[i]) {
          // @ts-ignore
          this.web.settings.kpoolOnlyColorMap[i] = this.formKpoolOnly.value[i]
        }
      }
    }
    this.web.redrawSubject.next(true)
    this.modal.close()
  }

}
