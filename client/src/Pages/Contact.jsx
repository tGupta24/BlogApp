import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import axios from "axios";
import { Popup } from "../ToastContainer/Popup"
import { useState } from "react";

export default function Contact() {
    const { register, handleSubmit, reset } = useForm();
    const [loader, setLoader] = useState(false)

    const onSubmit = async (data) => {
        setLoader(true)
        const userInfo = {
            name: data.name,
            email: data.email,
            message: data.message,
            access_key: "65328d6c-8489-41cf-a608-b97d16935e21"
        };

        try {
            await axios.post("https://api.web3forms.com/submit", userInfo);
            toast.success("Messege sent successfully");
            reset();
            setLoader(false)

        } catch (err) {
            toast.error("Error occured while sending messege");
            reset();
            setLoader(false)
        }


    };

    return (
        <div className="m-auto p-2 mt-5">
            <Popup />
            <div className=" p-4  rounded-md">
                <div className="flex flex-col sm:flex-row sm:gap-8 p-6 justify-center">
                    {/* Left Section: Title and Description */}
                    <div className="p-6 sm:rounded-lg flex flex-col justify-center items-center sm:items-start">
                        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                            Get in touch:
                        </h1>
                        <p className="text-lg sm:text-xl font-medium text-gray-400 mt-2">
                            Fill in the form to start a conversation
                        </p>
                    </div>

                    {/* Right Section: Form */}
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="p-2 flex flex-col justify-center w-full sm:w-1/2"
                    >
                        <div className="flex gap-3">
                            {/* Name Field */}
                            <div className="flex flex-col mb-4 w-full">
                                <input
                                    {...register("fullName", { required: true })}
                                    type="text"
                                    placeholder="Full Name"
                                    className="w-full py-3 px-4 rounded-lg border border-gray-600 text-black font-semibold focus:border-orange-500 focus:outline-none"
                                />
                            </div>

                            {/* Email Field */}
                            <div className="flex flex-col mb-4 w-full">
                                <input
                                    {...register("email", {
                                        required: "Email is required",
                                        pattern: { value: /^\S+@\S+$/i, message: "Invalid email format" }
                                    })}
                                    type="email"
                                    placeholder="Email"
                                    className="w-full py-3 px-4 rounded-lg border border-gray-600 text-black font-semibold focus:border-orange-500 focus:outline-none"
                                />
                            </div>
                        </div>

                        {/* Telephone Field */}
                        <div className="flex flex-col mb-4">
                            <input
                                {...register("phoneNumber", { required: true })}
                                type="tel"
                                placeholder="Telephone Number"
                                className="w-full py-3 px-4 rounded-lg border border-gray-600 text-black font-semibold focus:border-orange-500 focus:outline-none"
                            />
                        </div>

                        {/* Message Field */}
                        <div className="flex flex-col mb-4">
                            <textarea
                                {...register("message")}
                                placeholder="Write Your Message Here...."
                                className="w-full py-3 px-4 rounded-lg border border-gray-600 text-black font-semibold focus:border-orange-500 focus:outline-none"
                                rows={4}
                            ></textarea>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="w-full sm:w-auto bg-orange-700 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-lg mt-3 transition ease-in-out duration-300 flex justify-center items-center gap-2"
                            disabled={loader} // Disable button when loading
                        >
                            {loader ? (
                                <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4z"></path>
                                </svg>
                            ) : "Submit"}
                        </button>

                    </form>
                </div>
            </div>
        </div>
    );
}
