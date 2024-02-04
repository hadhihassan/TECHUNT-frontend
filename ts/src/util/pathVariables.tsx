export type Routes = {
    [x: string]: string | undefined;
    Landing: string;
    VerifyEmail: string,
    Login: string;
    MailVerification: string;
    Type: string;
    CREATE_PROFILE_MESSAGE: string;
    signup:"/signup/"

};
const routerVariables: Routes = {
    Landing: '/',
    VerifyEmail: "/signup/",
    Login: '/login/',
    MailVerification: '/client/verify/:id',
    Type: '/type/',
    CREATE_PROFILE_MESSAGE: '/profile-create/',
    signup:"/signup/"
}
export default routerVariables;




export interface CLIENTROUTES {
    ADD_PROFILE_DESCRIPTION: string,
    ADD_CONTACT_DETAILS: string
}
export const clientRoutes: CLIENTROUTES = {
    ADD_PROFILE_DESCRIPTION: "/client/profile-description/",
    ADD_CONTACT_DETAILS: "/client/add-contact/"
} 