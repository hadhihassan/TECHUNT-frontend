const WorkCategory = () => {
    const dummyImg = 'https://images.pexels.com/photos/8102677/pexels-photo-8102677.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    return (
        <div className='w-full mt-10 px-5 md:px-20  h-auto my-5 md:my-10'>
            <div>
                <h3 className="text-3xl font-semibold text-center mt-28 m-10">Choose Different <span className="text-red-500"> Category</span> </h3>
            </div>
            <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 md:grid-end-3 lg:grid-cols-4 lx:grid-cols-5 place-self-center">
                <div className="bg-blend-color-dodge flex items-center justify-center text-white font-bold  relative w-56 h-56 rounded-2xl bg-cover bg-center " style={{ backgroundImage: `url(${dummyImg})` }}>
                    <div className="bg-blend-color-dodge  rounded-2xl"></div>
                    Software Engineer
                </div>
                <div className=" flex bg-blend-color-dodge items-center justify-center text-white font-bold relative w-56 h-56 rounded-2xl bg-cover bg-center" style={{ backgroundImage: `url('https://www.theladders.com/wp-content/uploads/coder_190517-800x450.jpg)` }}>
                    <span className="">
                        SEO specialist
                    </span>
                    <div className="bg-blend-color-dodge rounded-2xl"></div>
                </div>
                <div className="flex items-center justify-center text-white font-bold relative w-56 h-56 rounded-2xl bg-cover bg-center" style={{ backgroundImage: `url(${dummyImg})` }}>
                    Web Development
                    <div className="bg-blend-color-dodge rounded-2xl"></div>
                </div>
                <div className="flex items-center justify-center text-white font-bold relative w-56 h-56 rounded-2xl bg-cover bg-center" style={{ backgroundImage: `url(${dummyImg})` }}>
                    Content Creation
                    <div className="bg-blend-color-dodge rounded-2xl"></div>
                </div>
                <div className="flex items-center justify-center text-white font-bold relative w-56 h-56 rounded-2xl bg-cover bg-center" style={{ backgroundImage: `url(${dummyImg})` }}>
                    Video Editor
                    <div className="bg-blend-color-dodge rounded-2xl"></div>
                </div>
                <div className="flex items-center justify-center text-white font-bold relative w-56 h-56 rounded-2xl bg-cover bg-center" style={{ backgroundImage: `url(${dummyImg})` }}>
                    Web design
                    <div className="bg-blend-color-dodge rounded-2xl"></div>
                </div>
                <div className="flex items-center justify-center text-white font-bold relative w-56 h-56 rounded-2xl bg-cover bg-center" style={{ backgroundImage: `url(${dummyImg})` }}>
                    Graphic design
                    <div className="bg-blend-color-dodge rounded-2xl"></div>
                </div>
                <div className="flex items-center justify-center text-white font-bold relative w-56 h-56 rounded-2xl bg-cover bg-center" style={{ backgroundImage: `url(${dummyImg})` }}>
                    Data analysis
                    <div className="bg-blend-color-dodge rounded-2xl"></div>
                </div>
            </div>
            <div className='flex item-center justify-center mt-10'>
                <button className='text-center  bg-red-500 py-3 px-5 rounded-xl text-white text-sm'>
                    More category
                </button>
            </div>
        </div >
    );
}



export default WorkCategory;
