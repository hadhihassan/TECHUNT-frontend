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
import { AxiosError, AxiosResponse } from "axios";
import io from 'socket.io-client'
import { Dispatch, UnknownAction } from "@reduxjs/toolkit";
import NotificaioDrawer, { Notification } from "../../ui/notificaionDrawer";
import { getAllProposalForClient } from "../../../../services/clientApiService";
import { ProposalInterface, } from "../../../../interface/interfaces";
import { notification } from 'antd';
import type { NotificationArgsProps } from 'antd';
import { BASE_URL } from "../../../../config/axios";

// eslint-disable-next-line react-refresh/only-export-components
export const socket = io(BASE_URL)


type NotificationPlacement = NotificationArgsProps['placement'];
const Context = React.createContext({ name: 'Default' });

const AfterLoginHeader = () => {
    const dispatch: Dispatch<UnknownAction> = useDispatch()
    const navigate = useNavigate()

    const role = useSelector((state: ROOTSTORE) => state.signup.role)
    const sender_id = useSelector((state: ROOTSTORE) => state.signup.id)

    const [IMG, setIMG] = useState<string>("")
    const [openNotificationDrawer, setopenNotificationDrawer] = useState<boolean>(false)
    const basicData: { role: string, fn: () => void } | undefined = useContext(MyContext) || undefined
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [proposals, setProposals] = useState<ProposalInterface[]>([]);

    useEffect(() => {
        if (role) {
            getUserProfileDetails(role)
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                .then((res:any) => {
                    if (res) {
                        setIMG(`${res?.data?.data?.Profile?.profile_Dp}`)
                    }
                }).catch((err: AxiosError) => {
                    console.log(err)
                })
            if (role === "CLIENT") {
                getAllProposalForClient(sender_id)
                    .then((res: AxiosResponse) => {
                        setProposals(res?.data?.data)
                    }).catch((err: AxiosError) => {
                        console.log(err.message)
                    })
            }
        }

        socket.emit("getNotifications", sender_id);
        socket.on("recevieNotification", (notification:Notification[]) => {
            if (notification.length > notifications.length) {
                if (notification[0].recipient_id == sender_id) {
                    setNotifications(notification)
                }
            }
        })
        socket.on("newPost", (notify: { user: { First_name: string; }; formData: { Title: string; }; }) => {

            if (userData.role === 'TALENT' && userData.premiumUser) {
                const openNotification = (placement: NotificationPlacement) => {
                    api.info({
                        message: `${notify?.user?.First_name} is posted new work post `,
                        description: <Context.Consumer>{() => ` Work is ${notify?.formData?.Title}!`}</Context.Consumer>,
                        placement,
                    });
                };
                openNotification("topRight")
            }
        })

        return () => {
            socket.off("newPost");
        };
    }, []);

    const [open, setOpen] = useState(false);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const anchorRef: any = React.useRef(null);

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event: MouseEvent | TouchEvent) => {
        if (anchorRef?.current && anchorRef?.current?.contains(event.target as Node)) {
            return;
        }
        setOpen(false);
    };

    const handleLogout = () => {
        localStorage.removeItem('token')
        persistor.purge();
        basicData?.fn()
        dispatch(cleanAllData())
        socket.emit("OfflineUser", { role: role, id: sender_id });
        navigate("/")
    }

    const userData = useSelector((state: ROOTSTORE) => state.signup)
    const [api, contextHolder] = notification.useNotification();
    const portionOfUrl = role.toLocaleLowerCase()

    return <>
        <div className="sticky top-0">
            {contextHolder}
            <div className=" flex justify-between bg-zinc-800 flex-col bg-white-900 sm:flex-row h-[10vh] p-1      ">
                {/* Logo */}
                <div className="w-full flex items-center justify-between ">
                    <div className="m-auto" onClick={() => {
                        navigate(`/${portionOfUrl}/home/`)
                    }}>
                        <span className="text-white text-3xl font-extrabold font-montserrat break-words">TECH</span>
                        <span className="text-white text-3xl font-normal font-montserrat break-words">UNT</span>
                    </div>
                    <div>
                        <div className="flex justify-between bg-zinc-700 rounded-xl text-white  d-[20px] w-[100%] sm:w-[300px] h-[30px]" >
                            <input type="text" placeholder="Search..." className="flex justify-between bg-zinc-700 rounded-xl text-white  d-[20px] w-[100%] sm:w-[300px] h-[30px] outline-none ml-2 mb-2" >
                            </input>
                            <SearchOutlinedIcon className="mt-1 mr-1" />
                        </div>
                    </div>
                </div>
                {openNotificationDrawer &&
                    <NotificaioDrawer proposals={proposals} notification={notifications} open={openNotificationDrawer} />
                }
                <div className="w-full pl-[10rem] text-white font-sana font-normal flex pt-3 sm:mt-0 justify-evenly">
                    {
                        !userData.premiumUser && <>
                            <button
                                onClick={() => navigate(routerVariables?.plan)}
                                className="ring-offset-background transition-colors  delay-1000 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary hover:bg-primary/90 h-10 inline-flex items-center justify-center px-6   border-0 rounded-full text-sm font-medium text-white bg-gradient-to-l from-yellow-300 to-purple-600 shadow-lg hover:from-purple-500 hover:to-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500  "
                            >
                                Subscribe
                            </button>
                        </>
                    }
                    <span className="mr-[1px] mt-1" onClick={() => navigate(`/${portionOfUrl}/transaction/history/`)}>Transactions</span>
                    <span className="mr-[1px] mt-1" onClick={() => navigate(routerVariables.Message)}>Messages</span>
                    <span className="mr-[1px] mt-1" onClick={() => navigate(`/${portionOfUrl}/contract/all/`)}>My Works</span>
                    <div className="felx pb-" onClick={() => { setopenNotificationDrawer(!openNotificationDrawer) }}>
                        <div className="bg-red-500 w-[7px] h-[7px] ml-3 top-3 relative rounded-full  bg-gradient-to-br"></div>
                        <NotificationsNoneOutlinedIcon color="primary" />
                    </div>
                    <IconButton ref={anchorRef} onClick={handleToggle}>
                        <Avatar src={IMG} className="border-2 border-red-500" />
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
                                            <MenuItem onClick={() => navigate(`/${portionOfUrl}/profile/`)}>
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
    </>
}

export default AfterLoginHeader;