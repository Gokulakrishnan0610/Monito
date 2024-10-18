import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import { useService } from '../../service/ServiceProvider';
import './ResetPass.css';
const ResetPass = () => {

    const { passwordReset } = useService();

    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [gmail, setGmail] = useState("");
    const [password, setPassword] = useState("");
    const [conformPassword, setConformPassword] = useState("");

    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [conformPasswordError, setConformPasswordError] = useState("");

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const onResetPassword = async () => {
        if (gmail === "") setEmailError("Required");
        if (password === "") setPasswordError("Required");
        if (password === "") setPasswordError("Required");
        if (conformPassword === "") setConformPasswordError("Required");
        if (password.length < 6) return setPasswordError("Password must be at least 6 characters long");
        if (password !== conformPassword) return setConformPasswordError("Passwords do not match");
        if (gmail === "" || password === "" || conformPassword === "") return;

        setLoading(true);
        const res = await passwordReset({ gmail, password });
        setLoading(false);

        if (res.success) {
            navigate('/login');
            setGmail("");
            setPassword("");
            setConformPassword("");
        } else {
            if (res.for === "gmail") setEmailError(res.message);
        }
    };

    const togglePasswordVisibility = () => setShowPassword(!showPassword);
    const toggleConfirmPasswordVisibility = () => setShowConfirmPassword(!showConfirmPassword);

    return (
        <div className="reset flex flex-col items-center justify-center w-full sm:px-8  min-h-screen bg-transparent  text-white ">
            <div className="background-shadow absolute inset-0 bg-black/40"></div>
            <form className={`flex h-full sm:h-auto flex-col gap-4 w-full sm:max-w-md px-4 py-6 sm:px-8 sm:py-10 bg-white/10 rounded-lg backdrop-blur-sm  sm:shadow-md ${loading ? 'opacity-50 pointer-events-none' : ''}`}>
                <div className="font-bold text-2xl text-center">Reset Password</div>

                <div className="flex flex-col gap-1">
                    <div className="flex justify-between items-center">
                        <label htmlFor="gmail" className="font-semibold">Email</label>
                        <p className="text-red-500 text-xs">{emailError}</p>
                    </div>
                    <input
                        type="email"
                        id="gmail"
                        placeholder="Enter Your Gmail"
                        className="focus:outline-none py-2 px-3 rounded border border-gray-300"
                        value={gmail}
                        onChange={(e) => { setGmail(e.target.value); setEmailError(""); }}
                    />
                </div>

                <div className="flex flex-col gap-1">
                    <div className="flex justify-between items-center">
                        <label htmlFor="password" className="font-semibold">Password</label>
                        <p className="text-red-500 text-xs">{passwordError}</p>
                    </div>
                    <div className="relative">
                        <input
                            type={showPassword ? 'text' : 'password'}
                            id="password"
                            placeholder="Enter Your Password"
                            className="focus:outline-none py-2 px-3 rounded border border-gray-300 w-full"
                            value={password}
                            onChange={(e) => { setPassword(e.target.value); setPasswordError(""); }}
                        />
                        <button
                            type="button"
                            className="absolute right-3 top-[10px] flex justify-center items-center text-gray-600"
                            onClick={togglePasswordVisibility}
                        >
                            {showPassword ? <EyeSlashIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
                        </button>
                    </div>
                </div>

                <div className="flex flex-col gap-1">
                    <div className="flex justify-between items-center">
                        <label htmlFor="confirm-password" className="font-semibold">Confirm Password</label>
                        <p className="text-red-500 text-xs">{conformPasswordError}</p>
                    </div>
                    <div className="relative">
                        <input
                            type={showConfirmPassword ? 'text' : 'password'}
                            id="confirm-password"
                            placeholder="Confirm Your Password"
                            className="focus:outline-none py-2 px-3 rounded border border-gray-300 w-full"
                            value={conformPassword}
                            onChange={(e) => { setConformPassword(e.target.value); setConformPasswordError(""); }}
                        />
                        <button
                            type="button"
                            className="absolute right-3 top-[10px] flex justify-center items-center text-gray-600"
                            onClick={toggleConfirmPasswordVisibility}
                        >
                            {showConfirmPassword ? <EyeSlashIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
                        </button>
                    </div>
                </div>

                <button
                    className="py-2 mt-4 bg-orange-500 text-white font-semibold rounded hover:bg-orange-600 transition-all"
                    onClick={onResetPassword}
                    disabled={loading}
                >
                    Reset Password
                </button>

                <Link to="/login" className="text-sm text-center   mt-4">
                    Existing User? Login
                </Link>
            </form>
        </div>
    );
};

export default ResetPass;



