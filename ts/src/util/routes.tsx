import React from 'react';
import * as Imports from './imports';

const WebRouters: React.FC = () => {
    return (
        <Imports.Routes>
            {/* Logged users access only routes */}
            <Imports.Route element={<Imports.IsLoggedUser />}>
                <Imports.Route path={Imports.clientRoutes.Profile} element={<Imports.Profile />} />
                <Imports.Route path={Imports.talent_routes.Profile} element={<Imports.Profile />} />
            </Imports.Route>
            {/* Email verified users only access routes */}
            <Imports.Route element={<Imports.IsVerified />}>
                <Imports.Route path={Imports.talent_routes.AddSkills} element={<Imports.AddSkills />} />
                <Imports.Route path={Imports.talent_routes.AddWorkExperiance} element={<Imports.Addexperiance />} />
                <Imports.Route path={Imports.clientRoutes.ADD_PROFILE_DESCRIPTION} element={<Imports.ProfileDescription />} />
                <Imports.Route path={Imports.Path.CREATE_PROFILE_MESSAGE} element={<Imports.ProfileStarMessage />} />
                <Imports.Route path={Imports.clientRoutes.ADD_CONTACT_DETAILS} element={<Imports.ContractDetails />} />
                <Imports.Route path={Imports.talent_routes.Profile_title} element={<Imports.ProfileTitle />} />
            </Imports.Route>


            <Imports.Route path={Imports.Path[404]} element={<Imports.ErrorPage />} />

            {/* new user note verified user only allowed routes */}
            <Imports.Route element={<Imports.IsNewUser />}>
                <Imports.Route element={<Imports.CheckUserType />}>
                    <Imports.Route path={Imports.Path.signup} element={<Imports.EmailVerification />} />
                </Imports.Route>
                <Imports.Route path={Imports.Path.MailVerification} element={<Imports.EmailVerificationPage />} />
                <Imports.Route path={Imports.Path.Type} element={<Imports.FidnTypeUser />} />
            </Imports.Route>
            {/* everyone can access this route */}
            <Imports.Route path={Imports.Path.Landing} element={<Imports.Home />} />
            <Imports.Route path={Imports.Path.Login} element={<Imports.Login />} />
            <Imports.Route path={"*"} element={<Imports.ContractDetails />} />

            {/* ADMIN ROUTES */}
            <Imports.Route path={Imports.admin_Routes.Login} element={<Imports.AdminLogin />} />
            {/* <Imports.ProtectedRoute> */}
                <Imports.Route path={Imports.admin_Routes.Login} element={<Imports.AdminLogin />} />
            {/* </Imports.ProtectedRoute> */}
        </Imports.Routes>
    );
};

export default WebRouters;
