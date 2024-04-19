import quality from '../../../../assets/images.png'
import const_and_secure from '../../../../assets/download.png'




const WorkCategory = () => {
    return (
        <div className="m-auto  w-[60%] h-auto">
            <div className="mt-5">
                <div className="m-auto mt-3 w-full h-auto ">
                    <div className="mt-20">
                    </div>
                    <div>
                        <h1 className=" font-montserrat text-3xl text-center font-bold ">Why Techunt</h1>
                        <div className='m-8 grid grid-cols-3 gap-4 w-auto'>
                            <div className='grid grid-cols-1 m-auto gap-3 sm:col-span-3 md:col-span-3 xl:col-span-1 col-span-3 w-auto'>
                                <p className='text-xl font-normal sm:text-sm md:text-xl md:font-bold xl:text-xl w-auto'>Quality work</p>
                                <img src={quality} className="size-20 m-auto" alt="" />
                            </div>
                            <div className='grid grid-cols-1 m-auto gap-3 sm:col-span-3 md:col-span-3 xl:col-span-1 col-span-3 w-auto'>
                                <p className='text-xl font-normal sm:text-sm md:text-xl md:font-bold xl:text-xl w-auto'>No cost until you hire</p>
                                <img src={quality} className="size-20 m-auto" alt="" />
                            </div>
                            <div className='grid grid-cols-1 m-auto gap-3 sm:col-span-3 md:col-span-3 xl:col-span-1 col-span-3 w-auto '>
                                <p className='text-xl font-normal sm:text-sm md:text-xl md:font-bold xl:text-xl w-auto'>Safe and secure</p>
                                <img src={const_and_secure} className="size-20 m-auto" alt="" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
}



export default WorkCategory;
