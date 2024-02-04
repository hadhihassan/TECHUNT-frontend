import { Route, Routes } from 'react-router-dom';
import Home from '../pages/Genaral/Home';
import EmailVerification from '../pages/Genaral/email.SignupPage'
import Path, { clientRoutes } from './pathVariables'
import FidnTypeUser from '../pages/Genaral/findTypeUser';
import EmailVerificationPage from '../pages/Genaral/emailVerificationPage';
import { IsLoggedUser, IsNotLoggedUser, CheckUserType } from './protectedRoute';
import ProfileStarMessage from '../pages/Genaral/profileStarMessage';
import ProfileDescription from '../pages/Client/profileDescription';
import ContractDetails from '../pages/Client/contactDetails';
import AfterLoginHeader from '../components/General/Home/Header/afterLoginHeader';
import Login from '../pages/Genaral/login';
const WebRouters: React.FC = () => {
    return (
        <Routes>
            <Route element={<IsLoggedUser />}>
                <Route path={clientRoutes.ADD_PROFILE_DESCRIPTION} element={<ProfileDescription />} />
                <Route path={Path.CREATE_PROFILE_MESSAGE} element={<ProfileStarMessage />} />
            </Route>
                <Route path={clientRoutes.ADD_CONTACT_DETAILS} element={<ContractDetails />} />


            <Route path={Path.Landing} element={<Home />} />
            <Route path={Path.MailVerification} element={< EmailVerificationPage />} />
            <Route path={Path.Login} element={<  Login/>} />


            <Route element={<IsNotLoggedUser />}>
                <Route path={Path.Type} element={< FidnTypeUser />} />
                <Route element={< CheckUserType />}>
                    <Route path={Path.signup} element={< EmailVerification />} />
                </Route>
            </Route>
            {/* <Route path='*' element={<AfterLoginHeader />}></Route> */}
        </Routes>
    );
};

export default WebRouters;
