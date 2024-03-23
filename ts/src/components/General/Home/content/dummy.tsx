import sdf from '../../../../assets/images__1_-removebg-preview.png'

const dummy = () => {
  
    return <>
        <div className="h-[297px]  bg-red-500 flex">
            <div className="w-[70%] h-[297px]  ml-20 "  >
                <div className="w-[650px] h-[70px] mt-5 text-white text-2xl sm:text-sm md:2xl xl:text-5xl   font-normal font-montserrat ] ">Join world’s best market place
                </div>
                <div className="text-white text-base font-medium  leading-[33px]">Find the best Talent and best works based on your skills from around the world.</div>
                <div className="grid grid-cols-6 gap-3">
                    <button className="w-[124px] sm:col-span-6 md:col-span-6   col-span-6    h-[37px] bg-black text-white rounded-[20px] text-sm">Find works</button>
                    <button className="w-[124px] h-[37px] border rounded-[20px]  text-white text-sm">Find talent</button>
                </div>
            </div> 
            <div className=' w-[30%]  flex items-center justify-center'>
                <img src={sdf} alt="sdhfjsh" />
            </div>
        </div>

    </>;
}



export default dummy;