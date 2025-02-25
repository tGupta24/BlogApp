import { RssFeed } from "@mui/icons-material";
import { Box, TextField, Button, IconButton } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate, NavLink } from "react-router-dom";
import { Popup } from "../ToastContainer/Popup";
import { toast } from "react-toastify";
import { useAuth } from "../contextApi/AuthProvider";

const BASE_URL = import.meta.env.VITE_BASE_URL;

function Login() {
    const [showPass, setShowPass] = useState(false);
    const { register, handleSubmit, reset } = useForm();
    const { isAuthenicated, setIsAuthenticated } = useAuth()


    const navigate = useNavigate();

    const onsubmit = async (data) => {
        console.log(data);

        try {
            const res = await axios.post(`${BASE_URL}/users/login`, data, {
                withCredentials: true  // to accept token  
            })
            if (res.status >= 200 && res.status < 300) {
                toast.success("you are logged in");
                setIsAuthenticated(true)
                navigate("/home")

            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Something went wrong!");
            throw error.response
        }
        reset()
    };

    return (
        <Box className="flex items-center justify-center min-h-screen bg-gradient-to-b from-[#4b5a6d] via-[#4b5a6d] to-[#b29985] px-4">
            <Popup />
            <Box className="flex w-full max-w-[800px] bg-white rounded-lg shadow-lg overflow-hidden mx-auto">

                {/* Image Section */}
                <Box className="w-1/2 hidden md:block p-5">
                    <img src="/boy.jpg" alt="Login" className="w-full h-full object-cover" />
                </Box>

                {/* Login Form Section */}
                <form onSubmit={handleSubmit(onsubmit)} className="w-full md:w-1/2 p-6 flex flex-col justify-center">
                    <h1 className="text-3xl font-bold text-center text-gray-700 mb-2">LOGIN</h1>
                    <p className="text-center text-gray-600">Unlock your world</p>

                    {/* Email Input */}
                    <Box className="mt-6">
                        <TextField
                            label="Email"
                            type="email"
                            variant="standard"
                            fullWidth
                            {...register("email", { required: true })}
                        />
                    </Box>

                    {/* Password Input with Toggle */}
                    <Box className="mt-6 mb-10 relative flex">
                        <TextField
                            label="Password"
                            type={showPass ? "text" : "password"}
                            variant="standard"
                            fullWidth
                            {...register("password", { required: true })}
                        />
                        <IconButton onClick={() => setShowPass(!showPass)}>
                            {showPass ? <FaEyeSlash /> : <FaEye />}
                        </IconButton>
                    </Box>

                    {/* Login Button */}
                    <Button variant="contained" color="primary" fullWidth className="mt-6 py-2" type="submit">
                        Login
                    </Button>

                    {/* Forgot Password & Signup Links */}
                    <Box className="text-center mt-4">
                        <p className="text-gray-600 text-sm">
                            Forgot password? <a href="#" className="text-blue-500 hover:underline">Reset</a>
                        </p>
                        <p className="text-gray-600 text-sm mt-2">
                            Don't have an account?
                            <NavLink
                                className="text-blue-400"
                                to="/register"
                            >
                                Sign Up
                            </NavLink>
                        </p>
                    </Box>
                </form>
            </Box>
        </Box>
    );
}

export default Login;
