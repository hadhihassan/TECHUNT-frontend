import { Link } from "react-router-dom";
import Routers from "../../../../routes/pathVariables";
import { useContext } from "react";
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import io from 'socket.io-client';
import { useDispatch } from "react-redux";
import { persistor } from '../../../../redux/store'
import { useNavigate } from "react-router-dom";

import { MyContext } from "../../../../context/myContext";
import { cleanAllData } from "../../../../redux/Slice/signupSlice";
const socket: any = io.connect("http://localhost:3000");


type Layout = {
  layout: boolean
}

const Header = ({ layout }: Layout) => {
  const naviagte = useNavigate()
  const basicdata: any = useContext(MyContext);
  const handleClick = () => {
    naviagte(`/${basicdata.role}/profile/`)
  }
  const data = useContext(MyContext)
  console.log(data);
  const s = () => {
    socket.emit()
  }
  const dispatch = useDispatch()

  const logOutHandle = () => {
    localStorage.removeItem('token')
    persistor.purge();
    basicdata.fn()
    dispatch(cleanAllData())
  }

  return (
    <>{layout ? <div className="h-[50px] m-1 border-b-2">
      <div className="ml-16 mt-5">
        <span className="text-red-500 text-3xl font-extrabold font-montserrat break-words">TECH</span>
        <span className="text-red-500 text-3xl font-normal font-montserrat break-words">UNT</span>
      </div>
    </div>
      :
      <div className="flex flex-col sm:flex-row mt-5 p-1 mb-3 justify-between ">
        {/* Logo */}
        <div className="w-full sm:w-[16%] flex items-center justify-center sm:justify-end">
          <div>
            <span className="text-red-500 text-3xl font-extrabold font-montserrat break-words">TECH</span>
            <span className="text-red-500 text-3xl font-normal font-montserrat break-words">UNT</span>
          </div>
        </div>

        {/* Navigation */}
        <div className="w-full sm:w-[25%] mt-3 sm:mt-0">
          <ul className="flex flex-col sm:flex-row justify-between m-1 sm:mt-2 p1 text-sm">
            <li onClick={s}><span>Find work</span></li>
            <li><span>Find Client</span></li>
            <li><span>Categories</span></li>
          </ul>
        </div>

        {/* Search Bar */}
        <div className="w-full sm:w-[25%] mt-3 sm:mt-0 ml-0 sm:ml-8 flex justify-center items-center">
          <div className="flex justify-between border border-black rounded-[20px] w-[100%] sm:w-[300px] h-[30px]">
            <input className="m-1 ml-3 text-sm  font-normal font-montserrat border-white " />
            <SearchOutlinedIcon className="m-1" />
          </div>
        </div>
        {basicdata.isLogged && <svg onClick={handleClick} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mt-1">
          <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
        </svg>}

        <div className="w-full  sm:w-[15%] mt-3 sm:mt-0 ml-0 sm:ml-8  flex justify-center sm:justify-start">
          {data?.isLogged ? <button onClick={logOutHandle} className="w-full sm:w-[120px] h-[34px] bg-white text-red-500 border border-red-500 rounded-[20px] mr-2">

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
        </div>
      </div>}
    </>
  );
};

export default Header;
