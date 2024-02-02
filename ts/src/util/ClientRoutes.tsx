import { Route, Routes } from 'react-router-dom';
import Home from '../pages/Genaral/Home';
import EmailVerification from '../pages/Genaral/email.SignupPage'
import Path from './pathVariables'
import FidnTypeUser from '../pages/Genaral/findTypeUser';
import EmailVerificationPage from '../pages/Genaral/emailVerificationPage';
import { IsLoggedUser, IsNotLoggedUser, CheckUserType } from './protectedRoute';
import ProfileStarMessage from '../pages/Genaral/profileStarMessage';
const WebRouters: React.FC = () => {
    return (
        <Routes>

            <Route path={Path.Landing} element={<Home />} />
            <Route path={Path.CREATE_PROFILE_MESSAGE} element={<ProfileStarMessage />} />
            {/* <Route element={<IsNotLoggedUser />}> */}
            <Route path={Path.MailVerification} element={< EmailVerificationPage />} />
            <Route element={< CheckUserType />}>
                <Route path={Path.Login} element={< EmailVerification />} />
            </Route>
            <Route path={Path.Type} element={< FidnTypeUser />} />
            {/* </Route> */}
        </Routes>
    );
};

export default WebRouters;
