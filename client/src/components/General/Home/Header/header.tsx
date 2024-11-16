/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link } from "react-router-dom";
import Routers from "../../../../routes/pathVariables";
import { useContext } from "react";
import { useDispatch } from "react-redux";
import { persistor } from '../../../../redux/store'
import { useNavigate } from "react-router-dom";
import { Avatar } from "antd";
import { UserOutlined } from '@ant-design/icons';
import { MyContext } from "../../../../context/myContext";
import { cleanAllData } from "../../../../redux/Slice/signupSlice";


type Layout = {
  layout: boolean
}

const Header = ({ layout }: Layout) => {
  const naviagte = useNavigate()
  const basicdata: any = useContext(MyContext);
  const handleClick = () => {
    const lowerCaseRole: string = basicdata.role.toLowerCase()
    naviagte(`/${lowerCaseRole}/profile/`)
  }
  const data = useContext(MyContext)

  const dispatch = useDispatch()

  const logOutHandle = () => {
    localStorage.removeItem('token')
    persistor.purge();
    basicdata.fn()
    dispatch(cleanAllData())
  }

  // return (
  //   <>{layout ? <div className="h-[50px] m-1 border-b-2">
  //     <div className="ml-16 mt-5">
  //       <span className="text-red-500 text-3xl font-extrabold font-montserrat break-words">TECH</span>
  //       <span className="text-red-500 text-3xl font-normal font-montserrat break-words">UNT</span>
  //     </div>
  //   </div>
  //     :
  //     <div className="flex flex-col sm:flex-row mt-5 p-1 mb-3 justify-between ">
  //       {/* Logo */}
  //       <div className="w-full sm:w-[16%] flex items-center justify-center sm:justify-end">
  //         <div>
  //           <span className="text-red-500 text-3xl font-extrabold font-montserrat break-words">TECH</span>
  //           <span className="text-red-500 text-3xl font-normal font-montserrat break-words">UNT</span>
  //         </div>
  //       </div>

  //       <div className="w-full  sm:w-[15%] mt-3 sm:mt-0 ml-0 sm:ml-8  flex justify-center sm:justify-start ">
  //         {data?.isLogged ? <button onClick={logOutHandle} className="w-full sm:w-[120px] h-[34px] bg-red-500 text-sm text-white border border-red-500 rounded-[20px] mr-2">
  //           Log out
  //         </button> : <><button className="w-full sm:w-[120px] h-[34px] mr-1 text-white bg-red-500 rounded-[20px] ">
  //           <Link to={Routers.signup}>
  //             sign up
  //           </Link>
  //         </button><button className="w-full sm:w-[120px] h-[34px] bg-white text-red-500 border border-red-500 rounded-[20px] mr-2">
  //             <Link to={Routers.Login}>
  //               Login
  //             </Link>
  //           </button></>
  //         }
  //         {
  //           basicdata.isLogged && <Avatar onClick={handleClick} style={{ backgroundColor: '#ef4444' }} icon={<UserOutlined />} />
  //         }
  //       </div>
  //     </div>}
  //   </>
  // );
  return (
    <nav className=" bg-white fixed w-full z-20 top-0 start-0  ">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a href="https://flowbite.com/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <div>
            <span className="text-red-500 text-3xl sm:xl font-extrabold font-montserrat break-words">TECH</span>
            <span className="text-red-500 text-3xl sm:xl font-normal font-montserrat break-words">UNT</span>
          </div>
        </a>
        <div className="items-center justify-between hidden w-full  md:flex md:w-auto md:order-1" id="navbar-sticky">
          {
            basicdata.isLogged && layout ? <>
            </> : <>
              <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                <li>
                  {data?.isLogged ? <button onClick={logOutHandle} className="w-full sm:w-[120px] h-[34px] bg-red-500 text-sm text-white border border-red-500 rounded-[20px] mr-2">
                    Log out
                  </button> : <><button className="w-full sm:w-[120px] h-[34px] mr-1 text-white bg-red-500 rounded-[20px] ">
                    <Link to={Routers.signup}>
                      sign up
                    </Link>
                  </button><button className="w-full sm:w-[120px] h-[34px] bg-white text-red-500 border border-red-500 rounded-[20px] mr-2">
                      <Link to={Routers.Login}>
                        Login
                      </Link>
                    </button></>
                  }
                </li>
              </ul>
            </>
          }
          {
            basicdata.isLogged && <Avatar onClick={handleClick} style={{ backgroundColor: '#ef4444' }} icon={<UserOutlined />} />
          }
        </div>
      </div>
      <div className="items-center justify-between  w-full  md:hidden md:w-auto md:order-1" id="navbar-sticky">
        <button data-collapse-toggle="navbar-multi-level" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-multi-level" aria-expanded="false">
          <span className="sr-only">Open main menu</span>
          <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15" />
          </svg>
        </button>
      </div>
    </nav >
  )

};

export default Header;
