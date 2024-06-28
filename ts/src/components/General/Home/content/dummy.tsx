import sdf from '../../../../assets/images__1_-removebg-preview.png'

const dummy = () => {

    return <>
        <div className="h-auto  bg-red-500 xl:flex md:flex  ">
            <div className="w-[70%] h-[297px]  xl:ml-20 md:ml-12 flex-row justify-center  items-center pt-16 sm:ml-7 ml-5 "  >
                <div className="w-auto h-[70px] mt-5 text-white text-xl sm:text-sm  md:text-4xl xl:text-5xl   font-normal font-montserrat  ">Join world’s best market place
                </div>
                <div className="text-white text-base font-medium  leading-[33px] break-all">Find the best Talent and best works based on your skills from around the world.</div>
            </div>
            <div className=' xl:w-[30%] md:w-[30%] sm:w-full sm:mb-10  flex items-center justify-center'>
                <img src={sdf} alt="sdhfjsh" />
            </div>
        </div>
    </>;
}



export default dummy;