import "./panel.css"
import { useNavigate } from 'react-router-dom';
import { admin_Routes } from "../../routes/pathVariables";
import React from "react"
const SidePanel = () => {
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem("admin");
        navigate(admin_Routes.Login);
    };
    return (
        <>
            <div className="relative min-h-screen md:flex" >
                <input type="checkbox" id="menu-open" className="hidden" />
                <label htmlFor="menu-open" className="absolute right-2 bottom-2 shadow-lg rounded-full p-2 bg-gray-100 text-gray-600 md:hidden" data-dev-hint="floating action button">
                    <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </label>
                <header className="bg-gray-600 text-gray-100 flex justify-between md:hidden" data-dev-hint="mobile menu bar">
                    <p className="block p-4 text-white font-bold whitespace-nowrap truncate">
                        Dashboard
                    </p>
                    <label htmlFor="menu-open" id="mobile-menu-button" className="m-2 p-2 focus:outline-none hover:text-white hover:bg-gray-700 rounded-md">
                        <svg id="menu-open-icon" className="h-6 w-6 transition duration-200 ease-in-out" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                        <svg id="menu-close-icon" className="h-6 w-6 transition duration-200 ease-in-out" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </label>
                </header>
                <aside id="sidebar" className="bg-gray-900  border rounded-md  text-gray-100 md:w-64 w-3/4 space-y-6 pt-6 px-0 absolute inset-y-0 left-0 transform md:relative md:translate-x-0 transition duration-200 ease-in-out  md:flex md:flex-col md:justify-between overflow-y-auto" data-dev-hint="sidebar; px-0 for frameless; px-2 for visually inset the navigation">
                    <div className="flex flex-col items-center w-full h-full overflow-hidden text-gray-400 bg-gray-900 rounded">
                        <div className="w-full px-2">
                            <div className="flex flex-col items-center w-full mt-3 border-t border-gray-700">
                                <p
                                    onClick={() => {
                                        navigate(admin_Routes.Dashboard)
                                    }}
                                    className={`flex items-center w-full h-12 px-3 mt-2 rounded ${window.location.pathname === admin_Routes.Dashboard ? 'bg-gray-700 text-gray-300' : ""}`}>
                                    <svg className="w-6 h-6 stroke-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                    </svg>
                                    <span className="ml-2 text-sm font-medium">Dasboard</span>
                                </p>
                                <p onClick={() => { navigate(admin_Routes.UserMangment) }}
                                    className={`flex items-center w-full h-12 px-3 mt-2 rounded ${window.location.pathname === '/admin/user-managment/' ? 'bg-gray-700 text-gray-300' : ""}`}>
                                    <svg className="w-6 h-6 stroke-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                    <span className="ml-2 text-sm font-medium">User Management</span>
                                </p>
                                <p onClick={() => { navigate(admin_Routes.UserMangment) }}
                                    className={`flex items-center w-full h-12 px-3 mt-2 rounded ${window.location.pathname === '/admin/user-management/' ? 'bg-gray-700 text-gray-300' : ""}`}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M21 11.25v8.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 1 0 9.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1 1 14.625 7.5H12m0 0V21m-8.625-9.75h18c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125h-18c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z" />
                                    </svg>
                                    <span className="ml-2 text-sm font-medium">Plan Managment</span>
                                </p>
                                <a
                                    className="flex items-center w-full h-12 px-3 mt-2 hover:text-gray-200 hover:bg-gray-700 rounded" href="#">
                                    <svg className="w-6 h-6 stroke-current" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-width="2" d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                    <span className="ml-2 text-sm font-medium">Transactions <small>invoice</small></span>
                                </a>
                                <a className="flex items-center w-full h-12 px-3 mt-2 rounded hover:bg-gray-700 hover:text-gray-300" href="#">
                                    <svg className="w-6 h-6 stroke-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-width="2" d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" />
                                    </svg>
                                    <span className="ml-2 text-sm font-medium">Banner</span>
                                </a>
                            </div>
                            <div className="flex flex-col items-center w-full mt-2 border-t border-gray-700">
                                <p
                                    onClick={() => { navigate(admin_Routes.JobCategoryManagment) }}
                                    className={`flex items-center w-full h-12 px-3 mt-2 rounded ${window.location.pathname === admin_Routes.JobCategoryManagment ? 'bg-gray-700 text-gray-300' : ""}`}>
                                    <svg className="w-6 h-6 stroke-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                                    </svg>
                                    <span className="ml-2 text-sm font-medium">Job Categories</span>
                                </p>
                                <a className="flex items-center w-full h-12 px-3 mt-2 rounded hover:bg-gray-700 hover:text-gray-300" href="#">
                                    <svg className="w-6 h-6 stroke-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                                    </svg>
                                    <span className="ml-2 text-sm font-medium">Settings</span>
                                </a>
                                <a className="relative flex items-center w-full h-12 px-3 mt-2 rounded hover:bg-gray-700 hover:text-gray-300" href="#">
                                    <svg className="w-6 h-6 stroke-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-width="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                                    </svg>
                                    <span className="ml-2 text-sm font-medium">Messages</span>
                                    <span className="absolute top-0 left-0 w-2 h-2 mt-2 ml-2 bg-indigo-500 rounded-full"></span>
                                </a>
                            </div>
                        </div>
                        <p className="flex items-center justify-center w-full h-16 mt-auto bg-gray-800 hover:bg-gray-700 hover:text-gray-300" >
                            <svg className="w-6 h-6 stroke-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-width="2" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span className="ml-2 text-sm font-medium" onClick={handleLogout}>LogOut</span>
                        </p>
                    </div>
                </aside>
            </div>
        </>
    )
}

export default SidePanel