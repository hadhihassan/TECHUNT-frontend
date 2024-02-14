export const JOB_CATEGORY_COLUMN = ["No", "Name", "Icons / Image", "Creation Date", "Status", "Freelancer working below", "Action"];
export interface JOB_CATEGORY_FORM_DATA {
    name : string,
    description :string,
    image:File | null,
    status:Boolean
}

export const IMG_URL = "http://localhost:3000/images/" 