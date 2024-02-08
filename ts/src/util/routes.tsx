import { Route, Routes } from 'react-router-dom';
import Home from '../pages/Genaral/Home';
import EmailVerification from '../pages/Genaral/email.SignupPage'
import Path, { clientRoutes, talent_routes } from './pathVariables'
import FidnTypeUser from '../pages/Genaral/findTypeUser';
import EmailVerificationPage from '../pages/Genaral/emailVerificationPage';
import { IsLoggedUser, CheckUserType, IsVerified, IsNewUser } from './protectedRoute';
import ProfileStarMessage from '../pages/Genaral/profileStarMessage';
import ProfileDescription from '../pages/Client/profileDescription';
import ContractDetails from '../pages/Client/contactDetails';
import AfterLoginHeader from '../components/General/Home/Header/afterLoginHeader';
import Login from '../pages/Genaral/login';
import ProfileTitle from '../pages/Talent/profileTitle';
import AddSkills from '../pages/Talent/addSkills';
import Addexperiance from '../pages/Talent/addWorkExperiance';
import Profile from '../pages/Talent/profile/profile';
import ErrorPage from '../pages/Genaral/404/404ErrorPage';



const WebRouters: React.FC = () => {
    return (
        <Routes>
            {/* Logged users access only routes */}
            <Route element={<IsLoggedUser />}>
                <Route path={clientRoutes.Profile} element={<Profile />} />
                <Route path={talent_routes.Profile} element={<Profile />} />
            </Route>
            {/* Email verified users only access routes */}
            <Route element={<IsVerified />}>
                <Route path={talent_routes.AddSkills} element={<AddSkills />} />
                <Route path={talent_routes.AddWorkExperiance} element={<Addexperiance />} />
                <Route path={clientRoutes.ADD_PROFILE_DESCRIPTION} element={<ProfileDescription />} />
                <Route path={Path.CREATE_PROFILE_MESSAGE} element={<ProfileStarMessage />} />
                <Route path={clientRoutes.ADD_CONTACT_DETAILS} element={<ContractDetails />} />
                <Route path={talent_routes.Profile_title} element={<ProfileTitle />} />
            </Route>


            <Route path={Path[404]} element={<ErrorPage />} />



            {/* new user note verified user only allowed routes */}
            <Route element={< IsNewUser />}>
                <Route element={< CheckUserType />}>
                    <Route path={Path.signup} element={< EmailVerification />} />
                </Route>
                <Route path={Path.MailVerification} element={< EmailVerificationPage />} />
                <Route path={Path.Type} element={< FidnTypeUser />} />
            </Route>
            {/* everyone can access this route */}
            <Route path={Path.Landing} element={<Home />} />
            <Route path={Path.Login} element={<  Login />} />

        </Routes>
    );
};

export default WebRouters;
