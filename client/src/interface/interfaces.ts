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
    createdAt?:string | Date;
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
    createdAt: Date | string
}
// Proposal form Data interface 
export interface ProposalInterface {
    title: string
    _id?: string
    coverLetter: string
    rate: number
    availability: string | Date 
    attachments: File | null | string 
    additionalInfo: string
    jobId?: string | { Title: string }
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
    } | string
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
    participants: [{
        Profile: {
            profile_Dp:string
            email:string
        }
        _id:string,
        First_name:string
        online:boolean
    }];
    messages: MessageDoc[];
    createdAt: Date;
    updatedAt: Date;
}
export interface MessageDoc {
    senderId: string;
    receiverId: string;
    message: string;
    createdAt: Date;
    updatedAt: Date;
    read: boolean
}
