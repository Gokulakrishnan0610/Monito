import React, { useState, useEffect } from 'react';
import {  Link, useNavigate } from 'react-router-dom';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline'; 
import { useService } from '../../service/ServiceProvider';
import { createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import './Signup.css'
import auth from '../../firebase/firebase';
const Signup = () => {

    const { } = useService;
    const navigate = useNavigate();
   
    // Signup details
    const [userName, setUserName] = useState("");
    const [gmail, setGmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    // Error handling
    const [userNameError, setUserNameError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [signUpError, setSignUpError] = useState("");
    // Password visibility toggle
    const [showPassword, setShowPassword] = useState(false); // State to manage password visibility
    
    useEffect(() => {
        

        function authathicata (){
            navigate("/")
                alert("login true")
           
        }
        onAuthStateChanged(auth,authathicata)
    }, [])


    const onSignUp = async (e) => {
        e.preventDefault()
        if (userName === "") {
            setUserNameError("Required");
        } else if (userName.length < 6) {
            setUserNameError("Username at least 6 characters long");
        }

        if (gmail === "") {
            setEmailError("Required");
        }

        if (password === "") {
            setPasswordError("Required");
        } else if (password.length < 6) {
            return setPasswordError("Password at least 6 characters long");
        }

        if (userName === "" || gmail === "" || password === "") {
            return;
        } else {

            setLoading(true);
            createUserWithEmailAndPassword(auth, gmail, password)
                .then((userCredential) => {
                    console.log(userCredential.user.email)
                    navigate('/login');
                    setGmail("");
                    setUserName("");
                    setPassword("");
                    setLoading(false);
                })
                .catch((error) => {
                    setEmailError(error.message);
                    setLoading(false);
                });

        }


    };






    // Toggle password visibility
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="signin  flex flex-col items-center justify-center w-full sm:px-8  min-h-screen">
            <div className="background-shadow absolute inset-0 bg-black/40"></div>

            <form className="signup-form h-full sm:h-auto flex flex-col gap-4 w-full sm:max-w-md z-50 bg-white/10 backdrop-blur-sm p-6 sm:p-8 rounded-lg sm:shadow-md  text-white ">
                <div className="title font-semibold text-2xl text-center text-white">
                    Register
                </div>

                {signUpError && (
                    <div className="text-red-500 text-center mb-3">
                        {signUpError}
                    </div>
                )}

                <div className="flex flex-col gap-1">
                    <div className="flex justify-between items-center">
                        <label htmlFor="userName" className='font-semibold'>Name</label>
                        <p className='text-red-600 text-xs'>{userNameError}</p>
                    </div>
                    <input
                        type="text"
                        id="userName"
                        placeholder='Enter Your Name'
                        className='focus:outline-none py-2 px-3 rounded border border-gray-300 bg-white/20 backdrop-blur-sm'
                        value={userName}
                        onChange={(e) => { setUserName(e.target.value); setUserNameError(""); setSignUpError(""); }}
                    />
                </div>

                <div className="flex flex-col gap-1">
                    <div className="flex justify-between items-center">
                        <label htmlFor="gmail" className='font-semibold'>Email</label>
                        <p className='text-red-600 text-xs'>{emailError}</p>
                    </div>
                    <input
                        type="email"
                        id="gmail"
                        placeholder='Enter Your Gmail'
                        className='focus:outline-none py-2 px-3 rounded border border-gray-300 bg-white/20 backdrop-blur-sm'
                        value={gmail}
                        onChange={(e) => { setGmail(e.target.value); setEmailError(""); setSignUpError(""); }}
                    />
                </div>

                <div className="flex flex-col gap-1">
                    <div className="flex justify-between items-center">
                        <label htmlFor="password" className='font-medium'>Password</label>
                        <p className='text-red-600 text-xs'>{passwordError}</p>
                    </div>
                    <div className="relative">
                        <input
                            type={showPassword ? 'text' : 'password'}
                            id="password"
                            placeholder='Enter Your Password'
                            className='focus:outline-none py-2 px-3 rounded border border-gray-300 w-full bg-white/20 backdrop-blur-sm'
                            value={password}
                            onChange={(e) => { setPassword(e.target.value); setPasswordError(""); setSignUpError(""); }}
                        />
                        <button
                            type="button"
                            className="absolute right-3 top-[10px] text-gray-600"
                            onClick={togglePasswordVisibility}
                        >
                            {showPassword ? (
                                <EyeSlashIcon className="h-5 w-5" />
                            ) : (
                                <EyeIcon className="h-5 w-5" />
                            )}
                        </button>
                    </div>
                </div>

                <button
                    className='px-4 py-2 bg-orange-500 text-white font-semibold rounded mt-4 hover:bg-orange-600 transition-all'
                    onClick={onSignUp}
                    disabled={loading}
                >
                    Register
                </button>

                <Link to={'/login'}>
                    <p className='capitalize font-medium text-center text-blue-600 mt-4'>
                        Existing User? Login
                    </p>
                </Link>
            </form>
        </div>
    );
};

export default Signup;
