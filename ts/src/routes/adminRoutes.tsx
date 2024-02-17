import React from 'react';
import * as Imports from '../util/imports';

const AdminRoutes: React.FC = () => {
    return (
        <Imports.Routes>


            admin routes
            <Imports.Route
                path={Imports.admin_Routes.UserMangment}
                element={
                    <Imports.ProtectedRoute>
                        <Imports.SidePanel />
                    </Imports.ProtectedRoute>
                }
            />
            {/* ADMIN ROUTES */}
            <Imports.Route path={Imports.admin_Routes.Login} element={<Imports.AdminLogin />} />


        </Imports.Routes>
    );
};

export default AdminRoutes;