export interface Modelling {
  Tissue: string
  Engine: string
  Data: ModellingData[]
  Precursor_Id: string
}

export interface ModellingData {
  day: number
  value: number
}
