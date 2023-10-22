
export interface MSDataQuery {
  next: string|null;
  previous: string|null;
  results: MSData[];
}

export interface MSDataValues {
  id: number;
  Sample_Name: string;
  SampleL: number;
  SampleH: number;
  Sample_H_over_HL: number;
}

export interface MSData {
  id: number;
  Protein_Group: string;
  Protein_Ids: string;
  Protein_Names: string;
  Genes: string;
  Proteotypic: number;
  Stripped_Sequence: string;
  Modified_Sequence: string;
  Precursor_Id: string;
  n_Samples: number;
  n_TimePoints: number;
  tau_POI: number;
  tau_POI_lower_bound: number;
  tau_POI_upper_bound: number;
  tau_POI_range: number;
  tau_POI_range_relative: number;
  HalfLife_POI: number;
  HalfLife_POI_lower_bound: number;
  HalfLife_POI_upper_bound: number;
  HalfLife_POI_range: number;
  HalfLife_POI_range_relative: number;
  rss: number;
  rs: number[];
  AverageRSS: number;
  Engine: string;
  Tissue: string;
  values: MSDataValues[];
}
