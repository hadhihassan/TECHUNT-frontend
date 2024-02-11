import React, { ChangeEvent, useState } from 'react';
import './adminlogin.css';
import { login } from '../../api/admin.Api';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import { useNavigate } from 'react-router-dom';
import { admin_Routes } from '../../util/pathVariables';
import * as yup from 'yup';

const schema = yup.object().shape({
    userName: yup.string().matches(/^[a-zA-Z0-9]{4,}$/, 'Username must be 4 letters and only contain letters and numbers').required('Username is required'),
    password: yup.string().matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, 'Password must be 8 characters or more, containing at least one number and one special character').required('Password is required'),
});

function adminLogin() {
    const [state, setState] = useState({
        password: '',
        userName: '',
    });
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleChnage: (e: ChangeEvent<HTMLInputElement>) => void = (e) => {
        const { name, value } = e.target;
        setState((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleLogin: () => void = () => {
        schema
            .validate(state, { abortEarly: false })
            .then(() => {
                login(state)
                    .then((res: any) => {
                        console.log(res.data)
                        localStorage.setItem('adminToken', res?.data?.data?.token);
                        if (!res.data) {
                            setError(res?.error.response.data.message);
                            setTimeout(() => {
                                setError('');
                            }, 5000);
                        } else {
                            localStorage.setItem('admin', JSON.stringify({ isLogged: true }));
                            setSuccess(res?.data.data.message);
                            setTimeout(() => {
                                setSuccess('');
                            }, 5000);
                            navigate(admin_Routes.UserMangment);
                        }
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            })
            .catch((errors) => {
                const errorMessage = errors.errors.join(', ');
                setError(errorMessage);
                setTimeout(() => {
                    setError('');
                }, 3000);
            });
    };

    return (
        <>
            <div className="rootColor w-[60vw] m-auto h-[75vh] sm:h-auto border rounded-md sm:flex mt-16 justify-center items-center">
                <div className="h-full md:w-[50%] sm:w-[100%]   bg-white ">
                    <div className="m-12 w-[87%] ">
                        {error && <Alert severity="error" className="w-[25vw]">{error}</Alert>}
                        {success && <Alert severity="success" className="w-[25vw]">{success}</Alert>}
                        <p className="text-3xl font-sans font-normal">Login</p>
                        <div className="mt-10">
                            <label className="text-md uppercase font-sans font-semibold">UserName</label> <br />
                            <input type="text" name="userName" onChange={handleChnage} className="input mt-5 h-10 w-[20rem] " placeholder="Type here..."></input>
                        </div>
                        <div className="mt-10">
                            <label className="text-md font-sans uppercase font-semibold">PassWord</label> <br />
                            <input onChange={handleChnage} type="password" name="password" className="input mt-5 h-10 w-[20rem] " placeholder="Type here..."></input>
                        </div><br />
                        <input type="checkbox" className="mt-[.0]" />
                        <label className="text-xs font-sans  font-medium  rootColorBack m-1">Remember Me</label> <br />
                        <div className="flex justify-center items-center ml-16 w-[13vw]">
                            <button onClick={handleLogin} className="button">
                                <span className="button-content ">Log In </span>
                            </button>
                        </div><br />
                    </div>
                </div>
                <div className="h-full w-[50%] flex flex-col justify-center items-center">
                    <p className="text-white text-2xl font-sans font-semibold">Welcome to login</p>
                </div>
            </div>
        </>
    );
}

export default adminLogin;
