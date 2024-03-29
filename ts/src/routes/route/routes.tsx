import React, { Suspense } from 'react';
import * as Imports from './imports';
import Message from '../../pages/Genaral/chat/message';
import Search from '../../pages/Talent/otherPages/searchPage';
import ListAPlans from '../../components/Admin/plan/listAllPlans';
import PlanPage from '../../components/General/viewsPages/planPage';



const WebRouters: React.FC = () => {
    return (
        <Suspense fallback={<Imports.Loader />}>
            <Imports.Routes>
                {/* Logged users access only routes */}
                <Imports.Route element={<Imports.IsLoggedUser />}>
                    <Imports.Route path={Imports.clientRoutes.Profile} element={<Imports.Profile />} />
                    <Imports.Route path={Imports.talent_routes.Profile} element={<Imports.Profile />} />
                    <Imports.Route path={Imports.clientRoutes.CLIENT_HOME} element={<Imports.Home />} />
                    <Imports.Route path={Imports.clientRoutes.CREATE_JOB_POST} element={<Imports.JobPostForm />} />
                    <Imports.Route path={Imports.clientRoutes.EDIT_JOB_POST} element={<Imports.EditjobPostForm />} />
                </Imports.Route>

                <Imports.Route path={Imports.Path.Settings} element={<Imports.Settings />} />

                <Imports.Route element={<Imports.LandingLayout />}>
                    <Imports.Route path={Imports.Path.forgetPassowrdEmail} element={< Imports.ForgetPasswordEmailCard />} />
                    <Imports.Route path={Imports.Path.forgetPassowrdOtp} element={< Imports.ForgetPasswordOtpCard />} />
                </Imports.Route>
                
                <Imports.Route path={Imports.talent_routes.AddSkills} element={<Imports.AddSkills />} />
                <Imports.Route path={Imports.Path.CREATE_PROFILE_MESSAGE} element={<Imports.ProfileStarMessage />} />
                {/* Email verified users only access routes */}
                <Imports.Route element={<Imports.IsVerified />}>
                    <Imports.Route path={Imports.talent_routes.AddWorkExperiance} element={<Imports.Addexperiance />} />
                    <Imports.Route path={Imports.clientRoutes.ADD_PROFILE_DESCRIPTION} element={<Imports.ProfileDescription />} />
                    <Imports.Route path={Imports.clientRoutes.ADD_CONTACT_DETAILS} element={<Imports.ContractDetails />} />
                    <Imports.Route path={Imports.talent_routes.Profile_title} element={<Imports.ProfileTitle />} />
                </Imports.Route>

                {/* new user note verified user only allowed routes */}
                <Imports.Route element={<Imports.IsNewUser />}>
                    <Imports.Route element={<Imports.CheckUserType />}>
                        <Imports.Route path={Imports.Path.signup} element={<Imports.EmailVerification />} />
                    </Imports.Route>
                    
                    <Imports.Route path={Imports.Path.Type} element={<Imports.FidnTypeUser />} />
                </Imports.Route>
                <Imports.Route path={Imports.Path.MailVerification} element={<Imports.EmailVerificationPage />} />

                {/* everyone can access this route */}



                <Imports.Route path={Imports.Path.Landing} element={<Imports.LandinHomePage />} />
                <Imports.Route path={Imports.Path.PaymentSuccess} element={<Imports.paymentSuccessPage />} />
                <Imports.Route path={Imports.Path.Login} element={<Imports.Login />} />
                <Imports.Route path={"*"} element={< Imports.ErrorPage />} />
                <Imports.Route path={Imports.Path[404]} element={<Imports.ErrorPage />} />

                {/*ADMIN ROUTES  */}
                <Imports.Route path={Imports.admin_Routes.Login} element={<Imports.AdminLogin />} />
                <Imports.Route path='admin' element={<Imports.AdminLayout />}>
                    <Imports.Route path={Imports.admin_Routes.Dashboard} element={<Imports.ProtectedRoute><Imports.IndexDashBoard /></Imports.ProtectedRoute>} />
                    <Imports.Route path={Imports.admin_Routes.PlanMangment} element={<Imports.ProtectedRoute><ListAPlans /></Imports.ProtectedRoute>} />
                    <Imports.Route path={Imports.admin_Routes.JobCategoryManagment} element={<Imports.ProtectedRoute><Imports.JobCategories /></Imports.ProtectedRoute>} />
                    <Imports.Route path={Imports.admin_Routes.UserMangment} element={<Imports.ProtectedRoute><Imports.UserManagementIndex /></Imports.ProtectedRoute>} />
                </Imports.Route>

                {/* TALENT ROUTES */}
                <Imports.Route path='talent' element={<Imports.Layout />}>
                    <Imports.Route path={Imports.talent_routes.Home} element={<Imports.TalentHomePage />} />
                    <Imports.Route path={Imports.talent_routes.JobViewPage} element={<Imports.JobViewPage />} />
                    <Imports.Route path={Imports.talent_routes.InvitationJobView} element={<Imports.InvitationJobView />} />
                    <Imports.Route path={Imports.talent_routes.viewClient} element={<Imports.ClientProfileView />} />
                    <Imports.Route path={Imports.talent_routes.ProfileView} element={<Imports.ClientProfileView />} />
                    <Imports.Route path={Imports.talent_routes.ContactListing} element={<Imports.ContactListPage />} />
                    <Imports.Route path={Imports.talent_routes.SendContract} element={<Imports.ContractForm />} />
                    <Imports.Route path={Imports.talent_routes.ViewMiles} element={<Imports.Milestone />} />
                    <Imports.Route path={Imports.talent_routes.TransactionHistry} element={<Imports.TransactionsPage />} />
                </Imports.Route>

                <Imports.Route element={<Imports.Layout />}>
                    <Imports.Route path={"/plan"} element={< PlanPage />} />
                </Imports.Route>

                {/* CLIENT ROUTES */}
                <Imports.Route path='client' element={<Imports.Layout />}>
                    <Imports.Route path={Imports.clientRoutes.TransactionHistry} element={<Imports.TransactionsPage />} />
                    <Imports.Route path={Imports.clientRoutes.SendContract} element={<Imports.ContractForm />} />
                    <Imports.Route path={Imports.clientRoutes.ContactListing} element={<Imports.ContactListPage />} />
                    <Imports.Route path={Imports.clientRoutes.viewProposal} element={<Imports.ProposalClientView />} />
                    <Imports.Route path={Imports.clientRoutes.ContractSubmit} element={<Imports.ContractForm />} />
                    <Imports.Route path={Imports.clientRoutes.ViewMiles} element={<Imports.Milestone />} />
                </Imports.Route>



                <Imports.Route element={<Imports.Layout isMessage={true}/>}>
                    <Imports.Route element={<Imports.CheckPreminumUser />}>
                        <Imports.Route path={Imports.Path.Message} element={<Message />} />
                    </Imports.Route>
                </Imports.Route>
                <Imports.Route path={Imports.Path.Search} element={< Search />} />

            </Imports.Routes>
        </Suspense>
    );
};

export default WebRouters;
