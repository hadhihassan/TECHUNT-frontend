import React, { ChangeEvent, useEffect, useState } from "react";
import { createContactDetails, uploadProfilePhoto } from "../../api/client.Api";
import { useSelector } from "react-redux";
import { INITIALSTATE } from "../../redux/Slice/signupSlice";
import { ROOTSTORE } from "../../redux/store";
import { useNavigate } from "react-router-dom";
import routerVariables from "../../util/pathVariables";
import { Client_INITIALSTATE } from "../../redux/Slice/Client/clientSlice";
import Select from 'react-select'
import axios from 'axios';

export interface CONTACT_FROM {
    photo?: File | null,
    lName: string,
    fName: string,
    address: string,
    city: string,
    pinCode: number | null,
    number: number | null,
    country: string

}

const ContactForm: React.FC = () => {
    const naviagte = useNavigate()
    const [image, setImage] = useState<any>(null)
    const role: INITIALSTATE["role"] = useSelector((state: ROOTSTORE) => state.signup.role)
    const description: Client_INITIALSTATE["description"] = useSelector((state: ROOTSTORE) => state.client.description)
    const [formData, setFormData] = useState({
        photo: null,
        address: "",
        city: "",
        fName: "",
        lName: "",
        number: null,
        pinCode: null,
        country: "",
        description: description
    })

    const handleInputChnage = (e: ChangeEvent<HTMLInputElement>) => {
        console.log(e.target.name);
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    }
    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        createContactDetails(formData, role)
            .then((res: any) => {
                console.log("response =>", res);
                naviagte(routerVariables.Login)
            }).catch((e: any) => {
                console.log(e.message)
            })
        console.log(formData);
    }
    const handlePhotoChange: (e: ChangeEvent<HTMLInputElement>) => void = (e) => {
        if (e.target.files && e.target.files.length > 0) {

            setImage(e.target.files[0]);
            let img: any = e.target.files[0];
            const data = new FormData();
            data.append('image', img);
            console.log(img);

            for (var key of data.entries()) {
                console.log(key[0] + ', ' + key[1]);
            }
            uploadProfilePhoto(data, role)
                .then((res: any) => {
                    console.log(res);
                }).catch((error: any) => {
                    console.log(error)
                })
        }
    }
    const [countries, setCountries] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState(null);

    useEffect(() => {
        axios.get('your-api-endpoint-url')
            .then(response => {
                // Assuming the API response is an array of country objects with label and value properties
                setCountries(response.data);
            })
            .catch(error => {
                console.error('Error fetching countries:', error);
            });
    }, []);

    const handleCountryChange = (selectedOption: React.SetStateAction<null>) => {
        setSelectedCountry(selectedOption);
        console.log('Selected country:', selectedOption);
    };
    // };

    return (
        <form onSubmit={handleFormSubmit} className="mx-auto mt-4 max-w-xl sm:mt-20" encType="multipart/form-data">
            <div className="flex  3xl items-cente justify-center flex-col m-10">
                <div className="w-20 ml-[13rem] h-20 bg-blue-200 rounded-full ">
                    {image && <img className="rounded-full h-20 w-20" src={URL.createObjectURL(image)} alt="Selected" />}
                </div>
                <div>
                    <label className="flex flex-col items-center m-auto mt-5  w-[10rem]  bg-white red-blue-500 rounded-md shadow-md tracking-wide uppercase border red-blue-500 cursor-pointer hover:bg-red-500 hover:text-white">
                        <svg
                            className="w-6 h-6"
                            fill="currentColor"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                        >
                            <path
                                fillRule="evenodd"
                                d="M13 8a2 2 0 100-4 2 2 0 000 4zM3 14a2 2 0 100-4 2 2 0 000 4zM13 14a2 2 0 100-4 2 2 0 000 4z"
                                clipRule="evenodd"
                            />
                            <path
                                fillRule="evenodd"
                                d="M5 18a2 2 0 100-4 2 2 0 000 4zM5 14a2 2 0 100-4 2 2 0 000 4zM5 10a2 2 0 100-4 2 2 0 000 4z"
                                clipRule="evenodd"
                            />
                        </svg>
                        <span className="mt-1 text-xs leading-normal">Choose a photo</span>
                        <input type="file" accept="image/*" className="hidden" onChange={handlePhotoChange} />
                    </label>
                </div>
            </div>
            <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">

                <div>
                    <label className="block text-sm font-semibold leading-6 text-gray-900">Last name</label>
                    <div className="mt-2.5">
                        <input onChange={handleInputChnage} type="text" name="lName" id="last-name" className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-semibold leading-6 text-gray-900">First name</label>
                    <div className="mt-2.5">
                        <input onChange={handleInputChnage} type="text" name="fName" id="last-name" className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                    </div>
                </div>
                <div className="sm:col-span-2">
                    <label className="block text-sm font-semibold leading-6 text-gray-900">Address</label>
                    <div className="mt-2.5">
                        <input onChange={handleInputChnage} type="text" name="address" className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-semibold leading-6 text-gray-900">Country</label>
                    <div className="mt-2.5">
                        {/* <Select
                            options={countries}
                            value={selectedCountry}
                            onChange={handleCountryChange}
                            isSearchable
                            placeholder="Select a country"
                        /> */}
                        <input onChange={handleInputChnage} type="text" name="country" id="last-name" className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-semibold leading-6 text-gray-900">
                        City name
                    </label>
                    <div className="mt-2.5">
                        <input onChange={handleInputChnage} type="text" name="city" id="last-name" className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-semibold leading-6 text-gray-900">Zip code/ Pincode</label>
                    <div className="mt-2.5">
                        <input onChange={handleInputChnage} type="text" name="pinCode" id="last-name" className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-semibold leading-6 text-gray-900">Phone number</label>
                    <div className="mt-2.5">
                        <input onChange={handleInputChnage} type="text" name="number" className="block w-full rounded-md border-0 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                    </div>
                </div>


            </div>
            <div className="mt-10">
                <button type="submit" className="block w-full rounded-md () px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Create</button>
            </div>
        </form>)
}

export default ContactForm;