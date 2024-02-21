import SidePanel from './sidePanel'
import { Outlet } from 'react-router-dom'
function AdminLayout() {
    return (
        <>
            <div className="flex">
                <SidePanel />
                <Outlet />
            </div>
        </>
    )
}
export default AdminLayout;