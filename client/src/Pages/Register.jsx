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
    const [photo, setPhoto] = useState("");
    const [loader, setLoader] = useState(false); // <-- loader state added
    const navigate = useNavigate();

    const changeFileHandler = (e) => {
        setPhoto(e.target.files[0]);
    };

    const onSubmit = async (user) => {
        try {
            setLoader(true); // start loader when request starts

            const formData = new FormData();
            formData.append("name", user.name);
            formData.append("email", user.email);
            formData.append("phoneNumber", user.phoneNumber);
            formData.append("password", user.password);
            formData.append("role", user.role);
            formData.append("avatar", photo);

            const res = await axios.post(`${BASE_URL}/users/register`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            if (res.status >= 200 && res.status < 300) {
                toast.success("You are registered successfully");
                navigate("/login");
            } else {
                toast.error("Registration failed, something went wrong");
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Something went wrong!");
        } finally {
            setLoader(false); // stop loader when request ends (success or error)
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

                        <form onSubmit={handleSubmit(onSubmit)} className="mt-6">
                            <TextField
                                label="Name"
                                type="text"
                                variant="standard"
                                fullWidth
                                {...register("name", { required: "Name is required" })}
                            />

                            <TextField
                                label="Email"
                                type="email"
                                variant="standard"
                                fullWidth
                                sx={{ mt: 1 }}
                                {...register("email", { required: "Email is required" })}
                            />

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

                            <TextField
                                label="Phone Number"
                                type="number"
                                variant="standard"
                                fullWidth
                                sx={{ mt: 1 }}
                                {...register("phoneNumber", { required: "Phone number is required" })}
                            />

                            <FormControl variant="standard" fullWidth sx={{ mt: 1 }}>
                                <InputLabel>Role</InputLabel>
                                <Select {...register("role")} defaultValue="user">
                                    <MenuItem value="user">User</MenuItem>
                                    <MenuItem value="admin">Admin</MenuItem>
                                </Select>
                            </FormControl>

                            <Box className="mt-6 flex items-center gap-4">
                                <label
                                    htmlFor="avatar-upload"
                                    className="bg-gray-600 text-white px-4 py-2 rounded-md cursor-pointer flex items-center gap-1"
                                >
                                    <FaUpload />
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

                            {/* Submit Button with Loader */}
                            <button
                                type="submit"
                                className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200 flex items-center justify-center mt-6"
                                disabled={loader}
                            >
                                {loader ? (
                                    <svg
                                        className="animate-spin h-5 w-5 text-white"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <circle
                                            className="opacity-25"
                                            cx="12"
                                            cy="12"
                                            r="10"
                                            stroke="currentColor"
                                            strokeWidth="4"
                                        ></circle>
                                        <path
                                            className="opacity-75"
                                            fill="currentColor"
                                            d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4z"
                                        ></path>
                                    </svg>
                                ) : (
                                    "Sign Up"
                                )}
                            </button>
                        </form>

                        <Box className="text-center mt-4">
                            <p className="text-gray-600 text-sm">
                                Have an account?{" "}
                                <NavLink className="text-blue-400" to="/login">
                                    Login
                                </NavLink>
                            </p>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </>
    );
}

export default Register;
