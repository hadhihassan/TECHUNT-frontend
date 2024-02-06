
const profileSkills = (data:{}) => {
    return (
            <div className="w-[22rem] h-[20rem] rounded-2xl   border shadow-xl ">
                <div className="flex justify-between">
                    <p className="m-4 font-sans font-medium">Top Skills</p>
                    <button className="w-[5rem] mt-3 mr-2 font-sans font-medium rounded-full h-7 border border-red-500 text-red-500">Edit</button>
                </div>
                <hr />
                <div className="flex flex-col space-y-5 items-start m-5">
                    {data?.data?.Profile?.Skills.map((value: string, key: number) => (
                        <span className="text-start font-semibold font-sans" key={key}>
                            {value}
                        </span>
                    ))}
                </div>
            </div>
    )
}

export default profileSkills;