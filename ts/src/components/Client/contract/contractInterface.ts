
export interface ContractDetailsType {
    terms: string;
    work: string;
    duration: Date | null[];
    amount: number;
    notes: string;
    paymentTerms: string;
    talent: string,
    client: string,
    approval: boolean,
    completed: "Pending" | "Progress" | "Completed",
    milestones:MilestoneType[]
}
export interface MilestoneType {
    approval: boolean;
    completed: string;
    no: number | null;
    description: string | null;
    startingDate: string | null;
    dueDate: string | null;
    name: string | null,
    amount: number | null
}