export type Routes = {
    [x: string]: string | undefined;
    Landing: string;
    VerifyEmail:string,
    Login: string;
    MailVerification: string;
    Type: string;
    CREATE_PROFILE_MESSAGE: string;
};

const routerVariables: Routes = {
    Landing: '/',
    VerifyEmail  : "/signup/",
    Login: '/login/',
    MailVerification: '/client/verify/:id',
    Type: '/type/',
    CREATE_PROFILE_MESSAGE : '/profile-create/'
};

export default routerVariables;