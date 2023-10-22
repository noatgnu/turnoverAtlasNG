
export interface SampleQuery {
  next: string|null;
  previous: string|null;
  results: Sample[];
}

export interface Sample {
  id: number;
  Sample_Name: string;
  Sample_Label: string;
  Days: number;
  Replicate: number;
}
