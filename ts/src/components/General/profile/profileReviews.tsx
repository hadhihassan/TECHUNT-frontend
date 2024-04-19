import { message } from "antd";
import React, { useEffect, useState, Fragment } from "react";
import { getAllReviews } from "../../../services/commonApiService";
import { useSelector } from "react-redux";
import { ROOTSTORE } from "../../../redux/store";
import { Dialog, Transition } from '@headlessui/react'
import Rating from '@mui/material/Rating';
export interface ReviewType {
    from: string | {
        First_name: string;
        Profile: {
            profile_Dp: string,
            Title: string
        }
    },
    to: string,
    comment: string,
    rating: number
}

const ProfileReviews: React.FC<{ id: string }> = ({ id }) => {
    const [reviews, setReviews] = useState<ReviewType[]>([])
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const closeModal = () => setIsOpen(!isOpen)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [userData, setuserData] = useState<any[]>([])
    const role = useSelector((state: ROOTSTORE) => state.signup.role)
    useEffect(() => {
        getAllReviews(id, role)
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            .then((res: { data: { data: { data: ReviewType[], userDatas: any[] } } }) => {
                if (res) {
                    console.log(res?.data?.data)
                    setReviews(res?.data?.data?.data)
                    setuserData(res?.data?.data?.userDatas)
                }
            }).catch(() => {
                message.error("Somthing went wrong !")
            })
    }, [])
    return (<>
        <div className="flex items-center  flex-row ">
            <div className="w-[48rem]  rounded-xl h-[22rem] shadow-2xl border bg-white">
                <div className="flex justify-between">
                    <p className="m-4 font-sans font-medium">Reviews</p>
                </div>
                <hr />
                <div className="flex justify-evenly items-center m-5">

                    <div className="bg-gray-200 border items-center rounded-md flex w-[18rem] h-[12rem]">
                        <div>
                            <img src={`https://timezones.website/images/${userData[0]?.Profile?.profile_Dp}`} className="w-10 h-10 border rounded-full m-5" alt="Loading.." />
                        </div>
                        <div >
                            <p className="text-lg m-1">{userData[0]?.First_name}</p>
                            <p className="text-xs m-1 font-sans font-normal">{reviews[0]?.comment}</p>
                            <p className="text-xs m-1 font-sans font-normal">{typeof reviews[0]?.from === "object" ? reviews[0]?.from?.First_name : ""}</p>
                        </div>
                    </div>
                    <div className="bg-gray-200 border rounded-md items-center flex w-[18rem] h-[12rem]">
                        <div>
                            <img src={`https://timezones.website/images/${userData[1]?.Profile?.profile_Dp}`} className="w-10 h-10 border rounded-full m-5" alt="Loading.." />
                        </div>
                        <div>
                            <p className="text-lg m-1">{userData[1]?.First_name}</p>
                            <p className="text-xs m-1 font-sans font-normal">{reviews[1]?.comment}</p>
                            <p className="text-xs m-1 font-sans font-normal">{typeof reviews[1]?.from === "object" ? reviews[1]?.from?.First_name : ""}</p>
                        </div>
                    </div>
                </div><hr />
                <p className="mt-4 text-blue-500 text-center" onClick={() => setIsOpen(true)}>View All</p>
            </div>
        </div>
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog className="relative z-10" onClose={closeModal}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black/25" />
                </Transition.Child>
                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                <p className="font-semibold text-xl"> Review</p>
                                <div className="mt-2 flex flex-col">
                                    {
                                        reviews.map((review: ReviewType, index: number) => (
                                            <div key={index} className="bg-gray-200 border rounded-md flex w-auto h-auto mt-2">
                                                <div>
                                                    <img src={`https://timezones.website/images/${userData[index]?.Profile?.profile_Dp}`} className="w-10 h-10 border rounded-full m-5" alt="Loading.." />
                                                </div>
                                                <div>
                                                    <p className="text-lg m-1">{userData[index]?.First_name}</p>
                                                    <p className="text-xs m-1 font-sans font-normal">{review.comment}</p>
                                                    <p className="text-xs m-1 font-sans font-normal">{typeof review?.from === "object" ? review?.from?.First_name : ""}</p>
                                                        <Rating name="half-rating-read" size="small" defaultValue={review.rating} precision={review.rating} readOnly />
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    </>)
}



export default ProfileReviews;