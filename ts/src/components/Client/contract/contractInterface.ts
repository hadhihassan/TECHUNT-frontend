
export interface ContractDetailsType {
    terms: string;
    work: string;
    duration: Date | null[];
    amount: number;
    notes: string;
    paymentTerms: string;
    talent:string,
    client:string
}
export interface MilestoneType {
    no: number;
    description: string;
    startingDate: Date | null;
    dueDate: Date | null;
}