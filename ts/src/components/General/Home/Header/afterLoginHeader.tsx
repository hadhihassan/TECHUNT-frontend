import React, { useContext, useEffect, useState } from "react";
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import Avatar from '@mui/material/Avatar';
import { getUserProfileDetails } from "../../../../services/talentApiService";
import { useSelector, useDispatch } from "react-redux";
import { ROOTSTORE } from "../../../../redux/store";
import { ClickAwayListener, Grow, Paper, Popper, MenuItem, MenuList, IconButton } from '@mui/material';
import { Logout, Person } from '@mui/icons-material';
import { persistor } from '../../../../redux/store'
import { useNavigate } from "react-router-dom";
import SettingsIcon from '@mui/icons-material/Settings';
import { MyContext } from "../../../../context/myContext";
import { cleanAllData } from "../../../../redux/Slice/signupSlice";
import routerVariables, { } from "../../../../routes/pathVariables";
import { AxiosError } from "axios";
import io from 'socket.io-client'
import { Dispatch, UnknownAction } from "@reduxjs/toolkit";
import NotificaioDrawer from "../../notificaionDrawer";
import { getAllProposalForClient } from "../../../../services/clientApiService";
// eslint-disable-next-line react-refresh/only-export-components
export const socket = io("http://localhost:3000")

const AfterLoginHeader = () => {
    const dispatch: Dispatch<UnknownAction> = useDispatch()
    const navigate = useNavigate()
    const role = useSelector((state: ROOTSTORE) => state.signup.role)
    const sender_id = useSelector((state: ROOTSTORE) => state.signup.id)
    const [IMG, setIMG] = useState<string>("")
    const [openNotificationDrawer, setopenNotificationDrawer] = useState<boolean>(false)
    const basicdata = useContext(MyContext) || ""
    const [notifications, setNotifications] = useState<object[]>([]); // Move useContext here
    const [proposals, setProposals] = useState<object[]>([]); // Move useContext here
    useEffect(() => {
        if (role) {
            getUserProfileDetails(role)
                .then((res: unknown) => {
                    setIMG(`http://localhost:3000/images/${res?.data?.data?.Profile?.profile_Dp}`)
                }).catch((err: AxiosError) => {
                    console.log(err)
                })
            getAllProposalForClient(sender_id)
                .then((res: AxiosResponse) => {
                    setProposals(res.data.data)
                }).catch((err: AxiosError) => {
                    console.log(err.message)
                })
        }
        socket.emit("getNotifications", sender_id);
        socket.on("recevieNotification", (notification) => {
            if (notification.length > notifications) {
                if (notification[0].recipient_id == sender_id) {
                    setNotifications(notification)
                }
            }
        })
    }, []);
    const [open, setOpen] = useState(false);
    const anchorRef = React.useRef(null);
    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };
    const handleClose = (event: MouseEvent | TouchEvent) => {
        if (anchorRef?.current && anchorRef?.current?.contains(event.target as Node)) {
            return;
        }
        setOpen(false);
    };
    const handleLogout = () => { // Removed event parameter
        localStorage.removeItem('token')
        persistor.purge();
        basicdata.fn()
        dispatch(cleanAllData())
        navigate("/")
    }
    return (
        <div>
            <div className=" flex justify-between bg-zinc-800 flex-col bg-white-900 sm:flex-row h-[10vh] p-1      ">
                {/* Logo */}
                <div className="w-full flex items-center justify-between ">
                    <div className="m-auto" onClick={() => {
                        navigate(`/${role}/home/`)
                    }}>
                        <span className="text-white text-3xl font-extrabold font-montserrat break-words">TECH</span>
                        <span className="text-white text-3xl font-normal font-montserrat break-words">UNT</span>
                    </div>
                    <div>
                        <div className="flex justify-between bg-zinc-700 rounded-xl text-white  d-[20px] w-[100%] sm:w-[300px] h-[30px]" >
                            <input type="text" placeholder="Search..." className="flex justify-between bg-zinc-700 rounded-xl text-white  d-[20px] w-[100%] sm:w-[300px] h-[30px]" >
                            </input>
                            <SearchOutlinedIcon className="mt-1 mr-1" />
                        </div>
                    </div>
                </div>
                {openNotificationDrawer &&
                    <NotificaioDrawer proposals={proposals} notification={notifications} open={openNotificationDrawer} className="hover:cursor-pointer" />
                }
                <div className="w-full pl-[10rem] text-white font-sana font-normal flex pt-3 sm:mt-0 justify-evenly">
                    <span className="mt-1">My Jobs</span>
                    <span className="mr-[1px] mt-1">Transaction Details</span>
                    <span className="mr-[1px] mt-1">Messages</span>
                    <div className="felx pb-">
                        <div className="bg-red-500 w-[7px] h-[7px] ml-3 top-3 relative rounded-full animate-pulse bg-gradient-to-br"></div>
                        <NotificationsNoneOutlinedIcon color="primary" onClick={() => { setopenNotificationDrawer(!openNotificationDrawer) }} />
                    </div>
                    <IconButton ref={anchorRef} onClick={handleToggle}>
                        <Avatar src={IMG} />
                    </IconButton>
                    <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
                        {({ TransitionProps, placement }) => (
                            <Grow
                                {...TransitionProps}
                                style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                            >
                                <Paper>
                                    <ClickAwayListener onClickAway={handleClose}>
                                        <MenuList autoFocusItem={open} id="menu-list-grow">
                                            <MenuItem onClick={() => navigate(`/${basicdata.role}/profile/`)}>
                                                <Person sx={{ mr: 1 }} /> Profile
                                            </MenuItem>
                                            <MenuItem onClick={handleLogout}><Logout sx={{ mr: 1 }} /> Logout</MenuItem>
                                            <MenuItem onClick={() => navigate(routerVariables.Settings)}><SettingsIcon sx={{ mr: 1 }} /> Settings</MenuItem>
                                        </MenuList>
                                    </ClickAwayListener>
                                </Paper>
                            </Grow>
                        )}
                    </Popper>
                </div>
            </div>
        </div>
    );
}



export default AfterLoginHeader;