import axios from 'axios';
import emailjs from 'emailjs-com';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Logo from '../assets/Logo';
import base_url from '../server/api';

const Signup = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [universityName, setUniversityName] = useState('');
    const [otp, setOtp] = useState('');
    const [otpSent, setOtpSent] = useState(false);
    const [otpValid, setOtpValid] = useState(false);
    const [generatedOtp, setGeneratedOtp] = useState('');
    const navigate = useNavigate();

    const generateOtp = () => {
        const otp = Math.floor(100000 + Math.random() * 900000);
        setGeneratedOtp(otp);
        return otp;
    };

    const validateForm = () => {
        let new_name = name.trim(); 
        let new_password = password.trim();
        let new_number = phoneNumber.trim();

        if (new_name !== name) {
            toast.warning("Name cannot have starting and ending spaces");
            return false;
        }
        if (new_password !== password) {
            toast.warning("Password cannot have spaces");
            return false;
        }
        if (phoneNumber.length !== 10) {
            toast.warning("Phone number must have 10 digits only");
            return false;
        }
        if (new_number !== phoneNumber) {
            toast.warning("Phone number cannot have spaces");
            return false;
        }
        if (!email.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/)) {
            toast.warning("Please enter a valid email address");
            return false;
        }

        return true;
    };

    const handleOtpRequest = (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        const otp = generateOtp();

        const templateParams = {
            reply_to: email,
            message: otp,
        };

        emailjs.send('service_jlgxdh6', 'template_mxc1y99', templateParams, 'h2wrS2QBoy-ezeqTv')
            .then((response) => {
                if (response.status === 200) {
                    setOtpSent(true);
                    toast.success("OTP sent to your email");
                } else {
                    toast.error("Error sending OTP");
                }
            })
            .catch((error) => {
                toast.error("Error sending OTP");
                console.log(error);
            });
    };

    const handleOtpValidation = (e) => {
        e.preventDefault();
        if (otp === generatedOtp.toString()) {
            setOtpValid(true);
            toast.success("OTP verified successfully");
        } else {
            toast.error("Invalid OTP");
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!otpValid) {
            toast.warning("Please verify OTP before submitting the form.");
            return;
        }

        axios.post(`${base_url}/register`, {
            name: name.trim(),
            email,
            password: password.trim(),
            phoneNumber: phoneNumber.trim(),
            universityName
        })
        .then((response) => {
            if (response.data === "Email already registered") {
                toast.warning("User already exists");
            } else {
                toast.success("User Registered Successfully");
                navigate('/login');
            }
        })
        .catch((error) => {
            toast.error("Server Error! Try Again");
            console.log("Error Occurred: " + error);
        });
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-black">
            <div className="p-8 border-2 rounded-lg shadow-lg bg-customBlack w-96 border-customOb">
                <h1 className="flex justify-center"><Logo/></h1>
                <p className="mb-6 text-center text-white">Create an account</p>

                <form className="space-y-4" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-customRed"
                        required
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        disabled={otpValid}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-customRed"
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-customRed"
                        required
                    />
                    <input
                        type="text"
                        placeholder="Phone Number"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-customRed"
                        required
                    />
                    <input
                        type="text"
                        placeholder="University Name"
                        value={universityName}
                        onChange={(e) => setUniversityName(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-customRed"
                        required
                    />

                    {otpSent && !otpValid && (
                        <div>
                            <input
                                type="text"
                                placeholder="Enter OTP"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-customRed"
                                required
                            />
                            <button 
                                onClick={handleOtpValidation} 
                                className="w-full py-2 mt-2 text-white rounded-lg bg-customRed hover:bg-customPinkHover"
                            >
                                Verify OTP
                            </button>
                        </div>
                    )}

                    {!otpSent && (
                        <button 
                            onClick={handleOtpRequest} 
                            className="w-full py-2 mt-4 text-white rounded-lg bg-customRed hover:bg-customPinkHover"
                        >
                            Send OTP
                        </button>
                    )}

                    {otpValid && (
                        <button type="submit" className="w-full py-2 mt-4 text-white rounded-lg bg-customRed hover:bg-customPinkHover">
                            Sign Up
                        </button>
                    )}
                </form>

                <div className="mt-4 text-center text-white">
                    Already have an account? <Link to="/login" className="text-customRed hover:underline">Login here</Link>
                </div>
            </div>
        </div>
    );
};

export default Signup;
