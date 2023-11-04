export interface Modelling {
  Tissue: string
  Engine: string
  Data: ModellingData[]
  Precursor_Id: string
}

export interface ModellingData {
  day: number
  value: number
  tau_POI_upper_bound: number
  tau_POI_lower_bound: number
}

export interface ModelDataSimple {
  day: number
  value: number
}

export interface ModelParameters {
  a: number
  b: number
  r: number
  n: number
  eps: number
  min: number
  Engine: string
  Tissue: string
  k_pool: ModelDataSimple[]
}

export interface ModelParametersQuery {
  next: string|null;
  previous: string|null;
  results: ModelParameters[];
}
