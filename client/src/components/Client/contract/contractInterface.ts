export interface MilestoneType {
    payed?: boolean;
    work: string;
    _id?: string,
    approval?: boolean;
    completed?: string;
    no: number;
    description: string;
    startingDate: string;
    dueDate: string;
    name: string,
    amount: number
    createdAt?: Date,
    isResheduleMilestone?: boolean
    resheduleReason?: {
        newDeadline : number,
        reason:string,
        accept:boolean
        _id?:string
    }
}
export interface ContractDetailsType {
    _id?: string
    terms: string;
    work: string | {
        WorkType: string,
        Title: string
    };
    duration: Date[] | null[];
    amount: number;
    notes: string;
    paymentTerms: string;
    talent: string | { _id: string },
    client: string | object,
    approval?: boolean,
    status?: string
    completed?: "Pending" | "Progress" | "Completed",
    milestones?: MilestoneType[] | object[]
    createdAt?: string | Date
}
export interface ProposalInteface {
    title: string;
    coverLetter: string;
    rate: number;
    availability: Date;
    attachments?: string;
    additionalInfo?: string;
    isAccept?: boolean;
    talentId: string;
    jobId?: {
        WorkType: string,
        Amount: number,
    };
    clientId?: string;
    paymentStatus: 'Pending' | 'Failed' | 'Completed';
    createdAt: Date;
    updatedAt: Date;
}
