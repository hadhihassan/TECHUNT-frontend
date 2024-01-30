import { Route, Routes } from 'react-router-dom';
import Home from '../pages/Genaral/Home';
import Login from '../pages/Genaral/loginPage'
import Path from './pathVariables'
import EmailVerificationPage from '../pages/Genaral/emailVerificationPage';
const WebRouters = () => {
    return (
        <Routes>
            <Route path={Path.Landing} element={<Home />} />
            <Route path={Path.Login} element={< Login/>} />
            <Route path={Path.MailVerification} element={< EmailVerificationPage />} />
        </Routes>
    );
};

export default WebRouters;
