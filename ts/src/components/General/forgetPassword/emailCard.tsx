/* eslint-disable @typescript-eslint/no-unused-vars */
import { useNavigate } from "react-router-dom";
import { Path } from "../../../routes/route/imports";
import { sendForgetOtp } from "../../../services/commonApiService";
import { AxiosError, AxiosResponse } from "axios";
import { message } from "antd";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import routerVariables from "../../../routes/pathVariables";

const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email address").required("Email is required"),
});
const ForgetPasswordEmailCard = () => {
    const navigate = useNavigate()
    const handeSubmit = (values: { email: string }, { setSubmitting }: { setSubmitting: (ar:boolean) => void }) => {
        sendForgetOtp(values.email)
            .then((res: AxiosResponse) => {
                localStorage.setItem("forgetEmail", JSON.stringify(values.email))
                message.success(res?.data?.message);
                navigate(routerVariables.forgetPassowrdOtp)
            })
            .catch((err) => {
                message.error(err?.response?.data?.message as string );
            })
            .finally(() => {
                setSubmitting(false);
            });
    };
    return <>
        <div className="w-full flex justify-center items-center ">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8 w-[550px] m-10    shadow-2xl rounded-xl border-2">
                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl text-center">
                    Forget password
                </h1>
                <Formik
                    initialValues={{
                        email: "",
                    }}
                    validationSchema={validationSchema}
                    onSubmit={handeSubmit}
                >
                    {() => (
                        <Form>
                            <div>
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Your email</label>
                                <Field
                                    type="email"
                                    name="email"
                                    id="email"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-xl focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:border-gray-600  dark:placeholder-gray-400 outline-none dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="Email"
                                />
                                <ErrorMessage name="email" component="div" className="text-red-500 text-xs text-end" />
                            </div>
                            <div className="flex justify-center items-center flex-col ">
                                <br />
                                <button type="submit" className="bg-red-500 w-[10rem] mb-4 h-[2rem] text-white border rounded-xl">Send otp</button>
                                <p className="text-sm font-normal font-sans text-start">
                                    Don’t have an account yet? <span className="font-medium  hover:underline text-red-500" onClick={() => {
                                        navigate(Path.VerifyEmail)
                                    }}>Sign up</span>
                                </p>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    </>;
}

export default ForgetPasswordEmailCard;