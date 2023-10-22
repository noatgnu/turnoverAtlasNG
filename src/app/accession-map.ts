export interface AccessionMapQuery {
  next: string|null;
  previous: string|null;
  results: AccessionMap[];
}

export interface AccessionMap {
  id: number;
  Protein_Group: string;
  Genes: string;
}
