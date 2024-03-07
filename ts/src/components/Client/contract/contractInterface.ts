
export interface ContractDetailsType {
    terms: string;
    work: string;
    duration: Date | null[];
    amount: number;
    notes: string;
    paymentTerms: string;
}
export interface MilestoneType {
    no: number;
    description: string;
    starting: Date | null;
    due: Date | null;
}