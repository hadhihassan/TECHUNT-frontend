import IMG from '../../../src/assets/images.png';
const profileReviews = () => {
    return (
        <div className="flex items-center  flex-row ">
            <div className="w-[48rem]  rounded-xl h-[22rem] shadow-2xl border bg-white">
                <div className="flex justify-between">
                    <p className="m-4 font-sans font-medium">Reviews</p>
                </div>
                <hr />
                <div className="flex justify-evenly items-center m-5">
                    <div className="bg-gray-200 border rounded-md flex w-[18rem] h-[12rem]">
                        <div>
                            <img src={IMG} className="w-10 h-10 border rounded-full m-5" alt="" />
                        </div>
                        <div>
                            <p className="text-xs m-5 font-sans font-normal">The freelance talent we work with are more
                                productive than we ever thought possible.
                                The freelance talent we work with are more
                                productive than.</p>
                            <p className="text-2xl m-5">Sam Crockett</p>
                            <p className="text-xs m-5 font-sans font-normal">Independent Web Developer</p>
                        </div>
                    </div>
                    <div className="bg-gray-200 border rounded-md flex w-[18rem] h-[12rem]">
                        <div>
                            <img src={IMG} className="w-10 h-10 border rounded-full m-5" alt="" />
                        </div>
                        <div>
                            <p className="text-xs m-5 font-sans font-normal">The freelance talent we work with are more
                                productive than we ever thought possible.
                                The freelance talent we work with are more
                                productive than.</p>
                            <p className="text-2xl m-5">Sam Crockett</p>
                            <p className="text-xs m-5 font-sans font-normal">Independent Web Developer</p>
                        </div>
                    </div>
                </div><hr />
                <p className="mt-4 text-blue-500 text-center">View All</p>
            </div>
        </div>
    )
}



export default profileReviews;