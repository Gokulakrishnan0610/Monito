


import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import { useService } from '../../service/ServiceProvider';
import './Login.css'
const Login = () => {
    const { logIn, setLogin } = useService;
    const navigate = useNavigate();
    const [gmail, setGmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [logInError, setLogInError] = useState("");
    const [showPassword, setShowPassword] = useState(false); // New state for password visibility

    const onSignIn = async (e) => {
        e.preventDefault()
        setLoading(true);
        if (gmail === "") setEmailError("Required");
        if (password === "") setPasswordError("Required");

        if (gmail === "" || password === "") {
            setLoading(false);
            return;
        }

        const res = await logIn({ gmail, password });
        setLoading(false);

        if (res.success === true) {
            const status = JSON.parse(localStorage.getItem("wallMat"));
            status.gmail = gmail;
            status.login = true;
            localStorage.setItem("wallMat", JSON.stringify(status));
            setLogin(true);
            navigate('/');
            setGmail("");
            setPassword("");
        } else {
            if (res.for === "gmail") {
                setEmailError(res.message);
            } else if (res.for === "password") {
                setPasswordError(res.message);
            }
            setLogInError(res.message);
        }
    };

    // Function to toggle password visibility
    const togglePasswordVisibility = () => setShowPassword(!showPassword);

    return (
        <div className="login flex flex-col items-center justify-center w-full sm:px-8  min-h-screen">
            <div className="background-shadow absolute inset-0 bg-black/40"></div>

            <form className={`login-form h-full sm:h-auto flex flex-col gap-4 w-full sm:max-w-md z-50 bg-white/10 p-6 sm:p-8 rounded-lg sm:shadow-md  backdrop-blur-sm ${loading ? 'opacity-50 pointer-events-none' : ''}`}>
                <div className="font-bold text-2xl text-center text-white">Login</div>

                {logInError && (
                    <div className="text-red-500 text-center mb-3">
                        {logInError}
                    </div>
                )}

                <div className="flex flex-col gap-1">
                    <div className="flex justify-between items-center">
                        <label htmlFor="username" className="font-semibold text-white">Email</label>
                        <p className="text-red-600 text-xs">{emailError}</p>
                    </div>
                    <input
                        type="text"
                        id="username"
                        placeholder="Enter Your Email"
                        className="focus:outline-none py-2 px-3 rounded bg-transparent border border-gray-300 text-white"
                        value={gmail}
                        onChange={(e) => { setGmail(e.target.value); setEmailError(""); setLogInError(""); }}
                    />
                </div>

                <div className="flex flex-col gap-1">
                    <div className="flex justify-between items-center">
                        <label htmlFor="password" className="font-semibold text-white">Password</label>
                        <p className="text-red-600 text-xs">{passwordError}</p>
                    </div>
                    <div className="relative">
                        <input
                            type={showPassword ? 'text' : 'password'}
                            id="password"
                            placeholder="Enter Your Password"
                            className="focus:outline-none py-2 px-3 rounded bg-transparent border border-gray-300 w-full text-white"
                            value={password}
                            onChange={(e) => { setPassword(e.target.value); setPasswordError(""); setLogInError(""); }}
                        />
                        <button
                            type="button"
                            className="absolute right-3 top-[10px] text-gray-400"
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

                <Link to="/resetPassword" className="text-sm text-gray-400 text-right">
                    Forgot Password?
                </Link>

                <button
                    className="px-4 py-2 bg-orange-500 text-white font-semibold rounded mt-4 hover:bg-orange-600 transition-all"
                    onClick={onSignIn}
                    disabled={loading}
                >
                    Login
                </button>

                <Link to="/signup">
                    <p className="text-sm font-medium text-center text-white mt-4">
                        New User? Sign Up
                    </p>
                </Link>
            </form>
        </div>
    );
};

export default Login;


