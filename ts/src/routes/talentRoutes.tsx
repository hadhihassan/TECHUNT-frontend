import React from 'react';
import * as Imports from '../util/imports';

const TalentRoutes: React.FC = () => {
    return (
        // main routes 
        <Imports.Routes>


            {/* for logged users only */}
            <Imports.Route element={<Imports.IsLoggedUser />}>
                <Imports.Route path={Imports.talent_routes.Profile} element={<Imports.Profile />} />
            </Imports.Route>


            {/* after email verifyed user for vreateion fo the profile  / none logged user*/}
            <Imports.Route element={<Imports.IsVerified />}>
                <Imports.Route path={Imports.talent_routes.AddSkills} element={<Imports.AddSkills />} />
                <Imports.Route path={Imports.talent_routes.AddWorkExperiance} element={<Imports.Addexperiance />} />
                <Imports.Route path={Imports.talent_routes.Profile_title} element={<Imports.ProfileTitle />} />
            </Imports.Route>

            

        </Imports.Routes>
    );
};

export default TalentRoutes;