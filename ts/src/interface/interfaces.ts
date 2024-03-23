export interface Typerole {
    type: "NOTHING" | "CLIENT" | "ADMIN" | "TALENT"
}
export interface UserProfile {
    _id: string;
    Last_name: string;
    First_name: string;
    Password: string;
    Email: string;
    Number: string;
    Profile: {
        profile_Dp: string;
        Description: string;
        Title: string;
        Skills: string[];
        Work_Experiance: string[];
    };
    Address: string;
    PinCode: string;
    City: string;
    Country: string;
    lastSeen?: Date;
    isBlock?: boolean;
    online?: boolean;
    isVerify?: boolean;
    isNumberVerify?: boolean;
}
export interface JobInterface extends UserProfile {
    Title: string;
    Client_id: string | UserProfile;
    Skills: string[];
    TimeLine: 'Small' | 'Medium' | 'Large';
    Description: string;
    Expertiselevel: 'Fresher' | 'Medium' | 'Experienced';
    Amount: number;
    WorkType: 'Fixed' | 'Milestone';
    isDelete: boolean;
    createdAt: Date
}
// Proposal form Data interface 
export interface ProposalInterface {
    title: string
    _id?:string
    coverLetter: string
    rate: number
    availability: Date | null
    attachments: File | null
    additionalInfo: string
    jobId?: string
    Client_id: {
        _id: string;
        Last_name: string;
        First_name: string;
        Password: string;
        Email: string;
        Number: string;
        Profile: {
            profile_Dp: string;
            Description: string;
            Title: string;
            Skills: string[];
            Work_Experiance: string[];
        };
        Address: string;
        PinCode: string;
        City: string;
        Country: string;
        lastSeen?: Date;
        isBlock?: boolean;
        online?: boolean;
        isVerify?: boolean;
        isNumberVerify?: boolean;
    }
    talentId: {
        _id: string;
        Last_name: string;
        First_name: string;
        Password: string;
        Email: string;
        Number: string;
        Profile: {
            profile_Dp: string;
            Description: string;
            Title: string;
            Skills: string[];
            Work_Experiance: string[];
        };
        Address: string;
        PinCode: string;
        City: string;
        Country: string;
        lastSeen?: Date;
        isBlock?: boolean;
        online?: boolean;
        isVerify?: boolean;
        isNumberVerify?: boolean;
    }
    isAccept?: boolean,
    paymentStatus: 'Pending' | 'Failed ' | 'Completed'
}



export interface ConversationDoc extends MessageDoc {
    participants: [];
    messages: MessageDoc[];
    createdAt: Date;
    updatedAt: Date;
}
export interface MessageDoc {
    senderId: string[];
    receiverId: string[];
    message: string;
    createdAt: Date;
    updatedAt: Date;
    read:boolean    
}
