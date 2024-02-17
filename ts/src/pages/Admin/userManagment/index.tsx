import SidePanel from "../../../components/Admin/sidePanel";
import Tables from "../../../components/General/tables";
import UsersTable from './userManagment'
const UserManagementIndex = () => {
    return (
        <>
            <div className="flex">
                <SidePanel/>
                <UsersTable/>
            </div>
        </>
    )
};



export default UserManagementIndex;