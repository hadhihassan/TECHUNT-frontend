import React from 'react';
import * as Imports from '../util/imports';

const ClientRoutes: React.FC = () => {
    return (
        <Imports.Routes>
            <Imports.Route element={<Imports.IsLoggedUser />}>
                <Imports.Route path={Imports.clientRoutes.Profile} element={<Imports.Profile />} />
            </Imports.Route>

            {/* Email verified users only access routes */}
            <Imports.Route element={<Imports.IsVerified />}>
                <Imports.Route path={Imports.clientRoutes.ADD_PROFILE_DESCRIPTION} element={<Imports.ProfileDescription />} />
                <Imports.Route path={Imports.clientRoutes.ADD_CONTACT_DETAILS} element={<Imports.ContractDetails />} />
            </Imports.Route>

        </Imports.Routes>
    );
};

export default ClientRoutes;