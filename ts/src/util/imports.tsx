/* eslint-disable react-refresh/only-export-components */
import { Route, Routes } from 'react-router-dom';
// Pages
import EmailVerification from '../pages/Genaral/email.SignupPage';
import FidnTypeUser from '../pages/Genaral/findTypeUser';
import EmailVerificationPage from '../pages/Genaral/emailVerificationPage';
import ProfileStarMessage from '../pages/Genaral/profileStarMessage';
import ProfileDescription from '../pages/Client/profileDescription';
import ContractDetails from '../pages/Client/contactDetails';
import Login from '../pages/Genaral/login';
import ProfileTitle from '../pages/Talent/profileTitle';
import AddSkills from '../pages/Talent/addSkills';
import Addexperiance from '../pages/Talent/addWorkExperiance';
import Profile from '../pages/Talent/profile/profile';
import ErrorPage from '../pages/Genaral/404/404ErrorPage';
import AdminLogin from '../pages/Admin/adminLogin';
import Settings from '../pages/Genaral/settings';
import TalentHomePage from '../pages/Talent/home/talentHomePage';
import ProposalClientView from '../pages/Client/proposalView';
import Home from '../pages/Client/home';
import JobCategories from '../pages/Admin/jobCategory/jobCategories';
import UserManagementIndex from '../pages/Admin/userManagment';
import IndexDashBoard from '../pages/Admin/dashboard';

// components
import Layout from '../components/General/layout';
import SidePanel from '../components/Admin/sidePanel';
import JobViewPage from '../components/Talent/jobViewPage';
import EditjobPostForm from '../components/Client/editJobPostForm';
import JobPostForm from '../components/Client/jobPostForm';

// Path Variables
import Path, { admin_Routes, clientRoutes, talent_routes } from '../routes/pathVariables';
// Protected Routes
import { IsLoggedUser, CheckUserType, IsVerified, IsNewUser } from '../routes/protectedRoutes/protectedRoute';
//Admin protected routes
import ProtectedRoute from '../routes/protectedRoutes/adminProtectedRoutes';
// admin layout 
import AdminLayout from '../components/Admin/adminLayout'
import LandinHomePage from '../pages/Genaral/Home';



export {
    LandinHomePage,
    Route,
    Routes,
    Home,
    EmailVerification,
    Path,
    admin_Routes,
    clientRoutes,
    talent_routes,
    FidnTypeUser,
    EmailVerificationPage,
    IsLoggedUser,
    CheckUserType,
    IsVerified,
    IsNewUser,
    ProfileStarMessage,
    ProfileDescription,
    ContractDetails,
    Login,
    ProfileTitle,
    AddSkills,
    Addexperiance,
    Profile,
    ErrorPage,
    AdminLogin,
    ProtectedRoute,
    SidePanel,
    Settings,
    JobCategories,
    UserManagementIndex,
    IndexDashBoard,
    AdminLayout,
    Layout,
    TalentHomePage,
    JobViewPage,
    ProposalClientView,
    EditjobPostForm,
    JobPostForm,
};