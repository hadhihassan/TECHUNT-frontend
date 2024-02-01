import Header from "../../components/General/Home/Header/header";
import Footer from "../../components/General/Home/footer/footer";
import IMG from '../../assets/3714960.jpg'

const ProfileStarMessage = () => {
    return (
        <div>
            <Header layout={true} />
            <div className="w-full flex justify-center items-center">
                <div className="w-[794px] flex space-y-14 items-center flex-col h-[40rem] mt-16 mb-16 border shadow-2xl rounded-lg">
                    <div>
                        <img src={IMG} className="w-[12rem] h-[13rem]" alt="Lodding" />
                    </div>

                    <div>
                        <p className="text-xl text-center  font-sans ">
                            Hey Hadhi. Ready for your <br />
                            next big opportunity?
                        </p>
                    </div>
                    <div>
                        <p className="text-xs text-center font-sans leading-8 ">
                            Build a profile to show the world what you can do
                            <br />
                            Apply on jobs posted from clients, around the world
                            <br />
                            Get paid safely and know we’re here to help
                        </p>
                    </div>
                    <div>
                        <button className="w-[392px] h-[45px] bg-red-500 text-white rounded-[100px]">Create Your Profile</button>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default ProfileStarMessage;