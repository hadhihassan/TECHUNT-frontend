import a from '../../assets/4950287_19874-removebg-preview.png'
const Message = () => {

    return (
        <>

            <div className="bg-blue-600 absolute flex justify-end items-center  -z-10 w-full h-[50vh]" >
                <img src={a} alt="" className='h-[100%] ' />
            </div>
            <div className='container m-16 text-white'>
                <p className='font-sans font-semibold text-sm'> /  Back</p>
                <p className='font-sans font-semibold text-xl '>Message</p>
            </div>
            <div className=" rounded-xl flex h-[80vh] w-[86%] mb-5 border bg-white shadow-ful m-auto">
                <div className='border-r-2 h-full w-[30%]'>
                    <div className='w-full h-auto border-b-2'>
                        <input type="text" placeholder='seach' className='m-5 ml-9' />
                    </div>
                    <div>
                        <img src={a} alt="" className='w-20' />
                    </div>
                </div>
                <div className='h-full w-70%] flex'>
                </div>
            </div >
        </>
    )
}
export default Message