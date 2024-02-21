import React, { ChangeEvent, useEffect, useState } from "react";
import { createContactDetails, uploadProfilePhoto } from "../../api/client.Api";
import { useSelector } from "react-redux";
import { INITIALSTATE } from "../../redux/Slice/signupSlice";
import { ROOTSTORE } from "../../redux/store";
import { useNavigate } from "react-router-dom";
import routerVariables from "../../routes/pathVariables";
import { Client_INITIALSTATE } from "../../redux/Slice/Client/clientSlice";
import Select from 'react-select'
import { AxiosError, AxiosResponse } from "axios"
import { nameValidator, numberValidator, pincodeValidator, addressValidator } from '../../../src/config/validators'
import toast, { Toaster } from "react-hot-toast";

// interface for the form data shap
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
    const error = (err: string) => toast.error(err);

    const naviagte = useNavigate()
    const [image, setImage] = useState<any>(null)
    const [countries, setCountries] = useState([]);

    // form validation state error message
    const [lError, setlError] = useState<string | null>(null)
    const [fError, setfError] = useState<string | null>(null)
    const [numberError, setNumberError] = useState<string | null>(null)
    const [cityError, setCityError] = useState<string | null>(null)
    const [pinCodeError, setPinCodeError] = useState<string | null>(null)
    const [AddressError, setAddressError] = useState<string | null>(null)
    const [countryError, setCountryError] = useState<string | null>(null)
    const [photoError, setPhotoErro] = useState<string | null>(null)

    const role: INITIALSTATE["role"] = useSelector((state: ROOTSTORE) => state.signup.role)
    const description: Client_INITIALSTATE["description"] = useSelector((state: ROOTSTORE) => state.client.description)

    // form data state
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
    useEffect(() => {
        const fetchCountries = async () => {
            try {
                const response = await axios.get('https://restcountries.com/v3.1/all');
                setCountries(response.data);
                console.log(response)
            } catch (error) {
                console.error('Error fetching countries:', error);
            }
        };
        fetchCountries();
    }, []);
    ;
    const handleInputChnage = (e: ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
        validateForm()
    }
    const validateForm = () => {
        const errors: any = {};
        errors.fName = nameValidator(formData.fName, "First Name");
        errors.lName = nameValidator(formData.lName, "Last Name");
        errors.city = nameValidator(formData.city, "City");
        errors.number = numberValidator(formData.number || "");
        errors.pinCode = pincodeValidator(formData.pinCode || "");
        errors.address = addressValidator(formData.address);
        if (formData.country === "") {
            errors.country = "djkfhsdjf";
            setCountryError("Country is required");
        }
        if (!image) {
            setPhotoErro("Photo is required");
        }

        setfError(errors.fName);
        setlError(errors.lName);
        setCityError(errors.city);
        setNumberError(errors.number);
        setPinCodeError(errors.pinCode);
        setAddressError(errors.address);

        return !(errors.city || errors.number || errors.pinCode || errors.address || formData.Country === "" || !image);
    };
    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        const valid = validateForm()
        if (valid) {
            createContactDetails(formData, role)
                .then((res: any) => {
                    console.log("response =>", res);
                    naviagte(routerVariables.Login)
                }).catch((e: AxiosError) => {
                    console.log(e.message)
                })
        }
    }
    const handlePhotoChange: (e: ChangeEvent<HTMLInputElement>) => void = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            let img: any = e.target.files[0];
            if (img) {
                if (img.size > 5242880) { // Max file size: 5MB (in bytes)
                    error('File size exceeds the limit (5MB)');
                    return;
                }
                if (!['image/jpeg', 'image/png'].includes(img.type)) {
                    error('Invalid file type. Only JPG and PNG files are allowed.');
                    return;
                }
            }
            setImage(e.target.files[0]);
            setPhotoErro("")
            const data = new FormData();
            data.append('image', img);
            uploadProfilePhoto(data, role)
                .then((res: any) => {
                    console.log(res);
                }).catch((error: any) => {
                    console.log(error)
                })
        }
    }

    const [selectedCountry, setSelectedCountry] = useState<any>('');
    const handleCountryChange = (selectedOption: React.SetStateAction<null>) => {
        console.log('Selected country:', selectedOption);
        setCountryError("")
        setFormData({
            ...formData,
            ["country"]: selectedOption?.value,
        });
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
                    {photoError && <p className="text-red-500 text-xs text-center">{photoError}</p>}
                </div>
            </div>
            <Toaster
                position="top-left"
                reverseOrder={false}
            />
            <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">

                <div>
                    <div className="flex justify-between">
                        <label className="block text-sm font-semibold leading-6 text-gray-900">Last name</label>
                        {lError && <p className="text-red-500 text-xs text-end">{lError}</p>}
                    </div>
                    <div className="mt-2.5">
                        <input onChange={handleInputChnage} type="text" name="lName" id="last-name" className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                    </div>
                </div>
                <div>
                    <div className="flex justify-between">

                        <label className="block text-sm font-semibold leading-6 text-gray-900">First name</label>
                        {fError && <p className="text-red-500 text-xs text-end">{fError}</p>}
                    </div>
                    <div className="mt-2.5">
                        <input onChange={handleInputChnage} type="text" name="fName" id="last-name" className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                    </div>
                </div>
                <div className="sm:col-span-2">
                    <div className="flex justify-between">
                        <label className="block text-sm font-semibold leading-6 text-gray-900">Address</label>
                        {AddressError && <p className="text-red-500 text-xs text-end">{AddressError}</p>}
                    </div>
                    <div className="mt-2.5">
                        <input onChange={handleInputChnage} type="text" name="address" className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                    </div>
                </div>
                <div>
                    <div className="flex justify-between">
                        <label className="block text-sm font-semibold leading-6 text-gray-900">Country</label>
                        {countryError && <p className="text-red-500 text-xs text-end">{countryError}</p>}
                    </div>
                    <div>
                        <div className="mt-2.5">
                            <div className="mt-2.5">
                                <Select
                                    options={countries.map((country: any) => ({ value: country.name.common, label: country.name.common }))}
                                    onChange={handleCountryChange}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <div className="flex justify-between">
                        <label className="block text-sm font-semibold leading-6 text-gray-900">
                            City name
                        </label>
                        {cityError && <p className="text-red-500 text-xs text-end">{cityError}</p>}
                    </div>
                    <div className="mt-2.5">
                        <input onChange={handleInputChnage} type="text" name="city" id="last-name" className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                    </div>
                </div>
                <div>
                    <div className="flex justify-between">
                        <label className="block text-sm font-semibold leading-6 text-gray-900">Zip code/ Pincode</label>
                        {pinCodeError && <p className="text-red-500 text-xs text-end">{pinCodeError}</p>}
                    </div>
                    <div className="mt-2.5">
                        <input onChange={handleInputChnage} type="text" name="pinCode" id="last-name" className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                    </div>
                </div>
                <div>
                    <div className="flex justify-between">
                        <label className="block text-sm font-semibold leading-6 text-gray-900">Phone number</label>
                        {numberError && <p className="text-red-500 text-xs text-end">{numberError}</p>}
                    </div>

                    <div className="mt-2.5">
                        <input onChange={handleInputChnage} type="text" name="number" className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                    </div>
                </div>


            </div>
            <div className="mt-10">
                <button type="submit" className="block w-full rounded-md () px-1 py-1 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Create</button>
            </div>
        </form>
    )
}

export default ContactForm;