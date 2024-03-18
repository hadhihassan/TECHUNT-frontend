import sdf from '../../../../assets/images__1_-removebg-preview.png'

const dummy = () => {
  
    return <>
        <div className="h-[297px]  bg-red-500 flex">
            <div className="w-[70%] h-[297px] " >
                <div className="w-[650px] h-[70px] text-white text-[43px] ml-[8%] pt-8 font-normal font-montserrat ] ">Join world’s best market place
                </div>
                <div className="text-white text-base font-medium  ml-[8%] mt-10 leading-[33px]">Find the best Talent and best works based on your skills from around the world.</div>
                <div className="ml-[8%] mt-10 ">
                    <button className="w-[124px] h-[37px] bg-black text-white rounded-[20px] text-sm">Find works</button>
                    <button className="w-[124px] h-[37px] border rounded-[20px]  text-white ml-5 text-sm">Find talent</button>
                </div>
            </div>
            <div className=' w-[30%]  flex items-center justify-center'>
                <img src={sdf} alt="sdhfjsh" />
            </div>
        </div>

    </>;
}



export default dummy;