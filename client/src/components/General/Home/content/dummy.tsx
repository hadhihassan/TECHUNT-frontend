import sdf from '../../../../assets/Group 248 (1) 1.svg'

const dummy = () => {

    return <>
        <div className="h-full bg-red-500 xl:flex md:flex flex mt-16">
            <div className="w-[70%] h-[297px] xl:ml-20 md:ml-12 flex-row justify-center items-center pt-16 sm:ml-7 ml-5">
                <div className="w-auto h-[70px] mt-2 text-white text-xl sm:text-sm md:text-4xl xl:text-5xl font-normal font-montserrat">Join world’s best market place</div>
                <div className="text-gray-100 text-sm  font-medium leading-[33px] break-all">
                    Find the best Talent and best works based on your skills from around the world.
                </div>
                <div className="flex gap-10 text-sm mt-2">
                    <button className="border border-black hover:shadow-xl hover:border-white  px-4 py-2 rounded-xl text-white bg-black">Find Work</button>
                    <button className="hover:shadow-xl hover:border-red-900 px-4 py-2 rounded-xl  bg-transparent text-white border">Find Client</button>
                </div>
            </div>
            <div className='xl:w-[30%] md:w-[30%] h-[297px] sm:w-full   sm:mb-10 flex items-center justify-center'>
                <div className='mt-4'>
                    <img src={sdf} />
                </div>
            </div>
        </div>
    </>;
}



export default dummy;