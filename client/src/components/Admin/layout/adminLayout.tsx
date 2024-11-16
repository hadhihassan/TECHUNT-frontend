import AdminHeader from './header';
import SidePanel from './sidePanel'
import { Outlet } from 'react-router-dom'

function AdminLayout() {
    return (
        <>
            <div className="">
                <AdminHeader />
                <div className="flex ">
                    <SidePanel />
                    <Outlet />
                </div>
            </div>
        </>
    )
}
export default AdminLayout;