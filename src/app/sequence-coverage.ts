export interface SequenceCoverage {
    coverage: [key: string, value: number[]]
    turnover_data: [key: string, value: {id: number, Start_Pos: number, End_Pos: number, Precursor_Id: string, Tissue: string, Engine: string, tau_POI: number, HalfLife_POI: number, Stripped_Sequence: string}]
    protein_sequence: string
}
