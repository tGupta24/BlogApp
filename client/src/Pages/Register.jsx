import { Box, Button, IconButton, Select, MenuItem, FormControl, InputLabel, TextField } from "@mui/material";
import { grey, red } from "@mui/material/colors";
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash, FaUpload } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { Popup } from "../ToastContainer/Popup";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const BASE_URL = import.meta.env.VITE_BASE_URL;


function Register() {
    const [showPass, setShowPass] = useState(false);
    const { register, handleSubmit, reset } = useForm();
    const [photo, setPhoto] = useState("")
    const navigate = useNavigate();

    const changeFileHandler = (e) => {
        setPhoto(e.target.files[0]);
    }

    // Function to handle form submission //
    // we have upload using form data since we are sending files
    const onSubmit = async (user) => {
        try {
            const formData = new FormData(); // amake a obj of FormData class  

            formData.append("name", user.name);
            formData.append("email", user.email);
            formData.append("phoneNumber", user.phoneNumber);
            formData.append("password", user.password);

            formData.append("role", user.role);
            formData.append("avatar", photo);


            const res = await axios.post(`${BASE_URL}/users/register`, formData
                , {
                    headers: { "Content-Type": "multipart/form-data" },
                }
            );
            console.log(res)
            console.log(res.status)
            if (res.status >= 200 && res.status < 300) {
                toast.success("you are registered successFully");
                navigate("/login")
            }
            else {
                toast.error("you are not register somethiing went wrong")
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Something went wrong!");
            throw error.response.data
        }

        reset(); // Reset form after submission
    };

    return (
        <>
            <Popup />
            <Box className="flex items-center justify-center min-h-screen bg-gradient-to-b from-[#4b5a6d] via-[#4b5a6d] to-[#b29985] px-4">
                <Box className="flex w-full max-w-[800px] bg-white rounded-lg shadow-lg overflow-hidden mx-auto">

                    {/* Image Section */}
                    <Box className="w-1/2 hidden md:block p-5">
                        <img src="/boy.jpg" alt="Login" className="w-full h-full object-cover" />
                    </Box>

                    {/* Registration Form */}
                    <Box className="w-full md:w-1/2 p-6 flex flex-col justify-center">
                        <h1 className="text-3xl font-bold text-center text-gray-700 mb-2">SIGN UP</h1>
                        <p className="text-center text-gray-600">Create your account</p>

                        {/* Form */}
                        <form onSubmit={handleSubmit(onSubmit)} className="mt-6">
                            {/* Name Input */}
                            <TextField
                                label="Name"
                                type="text"
                                variant="standard"
                                fullWidth
                                {...register("name", { required: "Name is required" })}
                            />

                            {/* Email Input */}
                            <TextField
                                label="Email"
                                type="email"
                                variant="standard"
                                fullWidth
                                sx={{ mt: 1 }} // Equivalent to className="mt-6"
                                {...register("email", { required: "Email is required" })}
                            />


                            {/* Password Input */}
                            <Box className="relative flex items-center">
                                <TextField
                                    label="Password"
                                    type={showPass ? "text" : "password"}
                                    variant="standard"
                                    fullWidth
                                    sx={{ mt: 1 }}
                                    {...register("password", { required: "Password is required" })}
                                />
                                <IconButton onClick={() => setShowPass(!showPass)}>
                                    {showPass ? <FaEyeSlash /> : <FaEye />}
                                </IconButton>
                            </Box>

                            {/* Phone Number */}
                            <TextField
                                label="Phone Number"
                                type="number"
                                variant="standard"
                                fullWidth
                                sx={{ mt: 1 }}
                                {...register("phoneNumber", { required: "Phone number is required" })}
                            />

                            {/* Role Selection */}
                            <FormControl
                                variant="standard"
                                fullWidth
                                sx={{ mt: 1 }}
                            >
                                <InputLabel>Role</InputLabel>
                                <Select {...register("role")} defaultValue="user">
                                    <MenuItem value="user">User</MenuItem>
                                    <MenuItem value="admin">Admin</MenuItem>
                                </Select>
                            </FormControl>

                            {/* Image Upload */}
                            <Box className="mt-6 flex items-center gap-4">
                                <label
                                    htmlFor="avatar-upload"
                                    className="bg-gray-600 text-white px-4 py-2 rounded-md cursor-pointer flex items-center gap-1"
                                >
                                    <FaUpload className="" />
                                    Upload
                                </label>
                                <input
                                    id="avatar-upload"
                                    type="file"
                                    {...register("avatar")}
                                    onChange={changeFileHandler}
                                    className="border border-gray-300 rounded-md p-2 max-w-7/12"
                                />
                            </Box>



                            {/* Submit Button */}
                            <Button variant="contained" color="primary" fullWidth type="submit"
                                sx={{
                                    mt: 2
                                }}
                            >
                                Sign Up
                            </Button>
                        </form>

                        {/* Login Redirect */}
                        <Box className="text-center mt-4">
                            <p className="text-gray-600 text-sm">
                                Have an account?
                                <NavLink className="text-blue-400" to="/login"> Login
                                </NavLink>
                            </p>
                        </Box>
                    </Box>
                </Box>
            </Box >
        </>
    );
}

export default Register;
