export const JOB_CATEGORY_COLUMN = ['No', 'Name', 'Creation Date', 'Status', 'Freelancer working below', 'Action'];
export interface JOB_CATEGORY_FORM_DATA {
    name: string,
    _id?: string,
    createdAt?: string,
    status?: boolean,
    workingBelow?: string,
    description: string,
}

export const IMG_URL = 'https://techunt-api.onrender.com/images/'
// export const IMG_URL = 'http://localhost:3000/images/'
export const BASE_URL = 'https://techunt-api.onrender.com'
// export const BASE_URL = 'http://localhost:3000'
export const TABLE_HEAD = ['No', 'Title', 'Amount', 'Date', 'Recived / Payed'];
export const INDIAN_RUPEE = '₹';

export const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
