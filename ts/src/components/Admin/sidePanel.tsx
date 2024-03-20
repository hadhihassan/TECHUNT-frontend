import "./panel.css"
import { useNavigate } from 'react-router-dom';
import { admin_Routes } from "../../routes/pathVariables";
import {
    Card,
    List,
    ListItem,
    ListItemPrefix,
} from "@material-tailwind/react";


const SidePanel = () => {
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem("admin");
        navigate(admin_Routes.Login);
    };
    return (
        <>
            <Card className="h-auto  rounded-none  font-semibold font-sans w-full max-w-[18rem] p-3 pr-8  shadow-xl shadow-blue-gray-900/5 bg-gray-900 text-white" placeholder={undefined}>
                <List placeholder={undefined}>
                    <ListItem placeholder={undefined} onClick={() => { navigate(admin_Routes.Dashboard) }} className={`font-semibold border-none rounded-full ${window.location.pathname === admin_Routes.Dashboard && "bg-gray-100 text-black translate-x-2 shadow-black shadow-2xl"}`}>
                        <ListItemPrefix placeholder={undefined} >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" color="blue" className="w-4 h-4">
                                <path d="M13.975 6.5c.028.276-.199.5-.475.5h-4a.5.5 0 0 1-.5-.5v-4c0-.276.225-.503.5-.475A5.002 5.002 0 0 1 13.974 6.5Z" />
                                <path d="M6.5 4.025c.276-.028.5.199.5.475v4a.5.5 0 0 0 .5.5h4c.276 0 .503.225.475.5a5 5 0 1 1-5.474-5.475Z" />
                            </svg>
                        </ListItemPrefix>
                        Dashboard
                    </ListItem>
                    <ListItem placeholder={undefined} onClick={() => { navigate(admin_Routes.UserMangment) }} className={`font-semibold rounded-full ${window.location.pathname === admin_Routes.UserMangment && "bg-gray-100 text-black translate-x-5 shadow-black shadow-2xl"}`}>
                        <ListItemPrefix placeholder={undefined} >
                            <svg xmlns="http://www.w3.org/2000/svg" color="green" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                                <path d="M7 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM14.5 9a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5ZM1.615 16.428a1.224 1.224 0 0 1-.569-1.175 6.002 6.002 0 0 1 11.908 0c.058.467-.172.92-.57 1.174A9.953 9.953 0 0 1 7 18a9.953 9.953 0 0 1-5.385-1.572ZM14.5 16h-.106c.07-.297.088-.611.048-.933a7.47 7.47 0 0 0-1.588-3.755 4.502 4.502 0 0 1 5.874 2.636.818.818 0 0 1-.36.98A7.465 7.465 0 0 1 14.5 16Z" />
                            </svg>
                        </ListItemPrefix>
                        User Mangment
                    </ListItem>
                    <ListItem placeholder={undefined} onClick={() => { navigate(admin_Routes.JobCategoryManagment) }} className={`font-semibold rounded-full ${window.location.pathname === admin_Routes.JobCategoryManagment && "bg-gray-100 text-black translate-x-5 shadow-black shadow-2xl"}`}>
                        <ListItemPrefix placeholder={undefined} >
                            <svg xmlns="http://www.w3.org/2000/svg" color="red" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4">
                                <path fillRule="evenodd" d="M11 4V3a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v1H4a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-1ZM9 2.5H7a.5.5 0 0 0-.5.5v1h3V3a.5.5 0 0 0-.5-.5ZM9 9a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z" clipRule="evenodd" />
                                <path d="M3 11.83V12a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-.17c-.313.11-.65.17-1 .17H4c-.35 0-.687-.06-1-.17Z" />
                            </svg>
                        </ListItemPrefix>
                        Work / Job Categories
                    </ListItem>
                    <ListItem placeholder={undefined} onClick={() => { navigate(admin_Routes.PlanMangment) }} className={`font-semibold rounded-full ${window.location.pathname === admin_Routes.PlanMangment && "bg-gray-100 text-black translate-x-5 transform shadow-black shadow-2xl"}`}>
                        <ListItemPrefix placeholder={undefined} >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" color="gold" className="w-4 h-4">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M21 11.25v8.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 1 0 9.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1 1 14.625 7.5H12m0 0V21m-8.625-9.75h18c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125h-18c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z" />
                            </svg>
                        </ListItemPrefix>
                        Plan Managment
                    </ListItem>
                    <ListItem placeholder={undefined} onClick={handleLogout} className="hover:bg-gray-100 hover:text-black font-semibold rounded-full">
                        <ListItemPrefix placeholder={undefined} >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4">
                                <path d="M11.25 2A2.75 2.75 0 0 1 14 4.75v6.5A2.75 2.75 0 0 1 11.25 14h-3a2.75 2.75 0 0 1-2.75-2.75v-.5a.75.75 0 0 1 1.5 0v.5c0 .69.56 1.25 1.25 1.25h3c.69 0 1.25-.56 1.25-1.25v-6.5c0-.69-.56-1.25-1.25-1.25h-3C7.56 3.5 7 4.06 7 4.75v.5a.75.75 0 0 1-1.5 0v-.5A2.75 2.75 0 0 1 8.25 2h3Z" />
                                <path d="M7.97 6.28a.75.75 0 0 1 1.06-1.06l2.25 2.25a.75.75 0 0 1 0 1.06l-2.25 2.25a.75.75 0 1 1-1.06-1.06l.97-.97H1.75a.75.75 0 0 1 0-1.5h7.19l-.97-.97Z" />
                            </svg>
                        </ListItemPrefix>
                        Log Out
                    </ListItem>
                </List>
            </Card>
        </>
    )
}
export default SidePanel