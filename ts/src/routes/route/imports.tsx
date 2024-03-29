/* eslint-disable react-refresh/only-export-components */
import { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

// Lazy-loaded components
const EmailVerification = lazy(() => import('../../pages/Genaral/signup/email.SignupPage'));
const FidnTypeUser = lazy(() => import('../../pages/Genaral/signup/findTypeUser'));
const EmailVerificationPage = lazy(() => import('../../pages/Genaral/signup/emailVerificationPage'));
const ProfileStarMessage = lazy(() => import('../../pages/Genaral/signup/profileStarMessage'));
const ProfileDescription = lazy(() => import('../../pages/Client/profileDescription'));
const ContractDetails = lazy(() => import('../../pages/Client/contactDetails'));
const Login = lazy(() => import('../../pages/Genaral/login/login'));
const ProfileTitle = lazy(() => import('../../pages/Talent/profile/profileTitle'));
const AddSkills = lazy(() => import('../../pages/Talent/profile/addSkills'));
const Addexperiance = lazy(() => import('../../pages/Talent/profile/addWorkExperiance'));
const Profile = lazy(() => import('../../pages/Talent/profile/profile'));
const ErrorPage = lazy(() => import('../../pages/Genaral/404/404ErrorPage'));
const AdminLogin = lazy(() => import('../../pages/Admin/adminLogin/adminLogin'));
const Settings = lazy(() => import('../../pages/Genaral/settings'));
const TalentHomePage = lazy(() => import('../../pages/Talent/home/talentHomePage'));
const ProposalClientView = lazy(() => import('../../pages/Client/proposalView'));
const Home = lazy(() => import('../../pages/Client/home'));
const JobCategories = lazy(() => import('../../pages/Admin/jobCategory/jobCategories'));
const UserManagementIndex = lazy(() => import('../../pages/Admin/userManagment'));
const IndexDashBoard = lazy(() => import('../../pages/Admin/dashboard'));
const Layout = lazy(() => import('../../components/General/landing-layout/layout'));
const SidePanel = lazy(() => import('../../components/Admin/layout/sidePanel'));
const JobViewPage = lazy(() => import('../../components/General/viewsPages/jobViewPage'));
const EditjobPostForm = lazy(() => import('../../components/Client/jobPost/editJobPostForm'));
const JobPostForm = lazy(() => import('../../components/Client/jobPost/jobPostForm'));
const LandinHomePage = lazy(() => import('../../pages/Genaral/landingPage/Home'));
const paymentSuccessPage = lazy(() => import('../../components/General/viewsPages/paymentSuccessPage'));
const ClientProfileView = lazy(() => import('../../pages/Client/profileView'));
const ContractForm = lazy(() => import('../../components/Client/contract/contract'));
const Milestone = lazy(() => import('../../components/General/contract/milestone'));
const TransactionsPage = lazy(() => import('../../pages/Genaral/history/transactionsPage'));
const ForgetPasswordEmailCard = lazy(() => import('../../components/General/forgetPassword/emailCard'));
const LandingLayout = lazy(() => import('../../components/General/landing-layout/landing-layout'));
const ForgetPasswordOtpCard = lazy(() => import('../../components/General/forgetPassword/forGetOtpCard'));
const InvitationJobView = lazy(() => import('../../components/General/viewsPages/invitationJobView'));

// Path Variables
import Path, { admin_Routes, clientRoutes, talent_routes } from '../pathVariables';
// Protected Routes
import { IsLoggedUser, CheckUserType, IsVerified, IsNewUser, CheckPreminumUser } from '../protectedRoutes/protectedRoute';
//Admin protected routes
import ProtectedRoute from '../protectedRoutes/adminProtectedRoutes';
// admin layout 
import AdminLayout from '../../components/Admin/layout/adminLayout';
import Loader from '../../components/General/loader/loader';
import ContactListPage from '../../pages/Genaral/contract/contractList';

export {
    InvitationJobView,
    ForgetPasswordOtpCard,
    LandingLayout,
    ForgetPasswordEmailCard,
    CheckPreminumUser,
    TransactionsPage,
    Milestone,
    ContactListPage,
    Loader,
    Route,
    Routes,
    IsLoggedUser,
    CheckUserType,
    IsVerified,
    IsNewUser,
    AdminLayout,
    Home,
    LandinHomePage,
    EmailVerification,
    ContractForm,
    Path,
    admin_Routes,
    clientRoutes,
    talent_routes,
    FidnTypeUser,
    EmailVerificationPage,
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
    Layout,
    TalentHomePage,
    JobViewPage,
    ProposalClientView,
    EditjobPostForm,
    JobPostForm,
    paymentSuccessPage,
    ClientProfileView
};