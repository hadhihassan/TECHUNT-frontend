//Comman routes for login sign up etx
export type Routes = {
    [x: string]: string | undefined;
    Landing: string;
    VerifyEmail: string,
    Login: string;
    MailVerification: string;
    Type: string;
    CREATE_PROFILE_MESSAGE: string;
    signup:string
   
};

const routerVariables: Routes = {
    Landing: '/',
    VerifyEmail: "/signup/",
    Login: '/login/',
    MailVerification: '/client/verify/:id',
    Type: '/type/',
    CREATE_PROFILE_MESSAGE: '/profile-create/',
    signup: "/signup/",
   
}
export default routerVariables;
//Client routes
export interface CLIENTROUTES {
    ADD_PROFILE_DESCRIPTION: string,
    ADD_CONTACT_DETAILS: string
    Profile: string
}
export const clientRoutes: CLIENTROUTES = {
    ADD_PROFILE_DESCRIPTION: "/client/profile-description/",
    ADD_CONTACT_DETAILS: "/client/add-contact/",
    Profile:"/client/profile/"
} 

//Talent routes
interface TALENT_ROUTES  {
    AddSkills:string,
    Profile_title:string,
    AddWorkExperiance:string
    Profile:string
}
export const talent_routes:TALENT_ROUTES = {
    AddSkills: "/add-skills/",
    Profile_title: "/profile-title/",
    AddWorkExperiance: "/add-experiance/",
    Profile:"/talent/profile/"
}