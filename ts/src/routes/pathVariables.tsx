//Comman routes for login sign up etx
export type Routes = {
    [x: string]: string | undefined;
    Landing: string;
    VerifyEmail: string,
    Login: string;
    MailVerification: string;
    Type: string;
    CREATE_PROFILE_MESSAGE: string;
    signup: string,
    404: string,
    Settings: string,
    Message: string
    PaymentSuccess: string,
    Search :string
};
export interface CLIENTROUTES {
    EDIT_JOB_POST: string,
    CREATE_JOB_POST: string,
    CLIENT_HOME: string,
    ADD_PROFILE_DESCRIPTION: string,
    ADD_CONTACT_DETAILS: string
    Profile: string,
    viewProposal: string,
    ContractSubmit : string
}
interface TALENT_ROUTES {
    AddSkills: string,
    Profile_title: string,
    AddWorkExperiance: string
    Profile: string,
    Home: string,
    JobViewPage: string,
    ProfileView: string
    viewClient: string
}
type ADMIN_ROUTES = {
    Login: string,
    UserMangment: string,
    JobCategoryManagment: string,
    Dashboard: string
}
const routerVariables: Routes = {
    Landing: '/',
    VerifyEmail: "/signup/",
    Login: '/login/',
    MailVerification: '/client/verify/:id',
    Type: '/type/',
    CREATE_PROFILE_MESSAGE: '/profile-create/',
    signup: "/signup/",
    404: '/404/',
    Settings: "/settings/",
    Message: "/message/",
    PaymentSuccess: '/payment-success/:id/',
    Search : "/search"
}
export default routerVariables;
//Client routes
export const clientRoutes: CLIENTROUTES = {
    EDIT_JOB_POST: "/client/edit-job-post/:id",
    CREATE_JOB_POST: '/client/create-job-post/',
    CLIENT_HOME: "/client/home/",
    ADD_PROFILE_DESCRIPTION: "/client/profile-description/",
    ADD_CONTACT_DETAILS: "/client/add-contact/",
    Profile: "/client/profile/",
    viewProposal: "/client/view-proposal/",
    ContractSubmit: "/client/contract/send/"
}
//Talent routes
export const talent_routes: TALENT_ROUTES = {
    AddSkills: "/add-skills/",
    Profile_title: "/profile-title/",
    AddWorkExperiance: "/add-experience/",
    Profile: "/talent/profile/",
    Home: "/talent/home/",
    JobViewPage: "/talent/job-details-view/",
    ProfileView: "/talent/talent/profile/",
    viewClient: '/talent/view-client-profile/',
}
//Admin routes
export const admin_Routes: ADMIN_ROUTES = {
    Login: "/admin/login/",
    UserMangment: "/admin/user-management/",
    JobCategoryManagment: "/admin/job-Category-management/",
    Dashboard: "/admin/dashboard/"
}