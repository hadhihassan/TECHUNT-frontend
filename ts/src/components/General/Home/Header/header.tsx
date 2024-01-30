type Layout = {
  layout: boolean
}


const Header = ({ layout }: Layout) => {
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
            <li><span>Find work</span></li>
            <li><span>Find Client</span></li>
            <li><span>Categories</span></li>
          </ul>
        </div>

        {/* Search Bar */}
        <div className="w-full sm:w-[25%] mt-3 sm:mt-0 ml-0 sm:ml-8 flex justify-center items-center">
          <div className="flex justify-between border border-black rounded-[20px] w-[100%] sm:w-[300px] h-[30px]">
            <label className="m-1 ml-3 text-sm text-black font-normal font-montserrat">Search</label>
            <label className="m-1 mr-3 text-sm text-black font-normal font-montserrat">Search</label>
          </div>
        </div>

        {/* Login Button */}
        <div className="w-full sm:w-[15%] mt-3 sm:mt-0 ml-0 sm:ml-8  flex justify-center sm:justify-start">
          <button className="w-full sm:w-[120px] h-[34px] bg-red-500 rounded-[20px]">
            Login
          </button>
        </div>
      </div>}




    </>
  );
};

export default Header;
