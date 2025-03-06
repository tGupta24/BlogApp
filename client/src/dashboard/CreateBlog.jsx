import axios from "axios";
import React, { useEffect, useState } from "react";

import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { useAuth } from "../contextApi/AuthProvider";

const BASE_URL = import.meta.env.VITE_BASE_URL;

function CreateBlog() {
    const [blogImagePreview, setBlogImagePreview] = useState("");
    const { isAuthenticated, setIsAuthenticated } = useAuth();
    const [loader, setLoader] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        watch, // use for constantly watching the input field

    } = useForm();

    const onSubmit = async (data) => {
        const formData = new FormData();
        formData.append("title", data.title);
        formData.append("category", data.category);
        formData.append("content", data.content);
        formData.append("blogImage", data.blogImage[0]);

        try {
            setLoader(true);

            const response = await axios.post(
                `${BASE_URL}/blog/create-blog`,
                formData,
                {
                    withCredentials: true,
                    headers: { "Content-Type": "multipart/form-data" },
                }
            );

            toast.success(response.data.message || "Blog created successfully");
            reset(); // Reset form after submission
            setBlogImagePreview(""); // Clear image preview
            setLoader(false);

        } catch (error) {
            setLoader(false);
            toast.error(error.response?.data?.message || "Error creating blog");
        }
    };

    // Watch the file input to preview image
    const blogImage = watch("blogImage");
    if (blogImage && blogImage.length > 0) {
        const file = blogImage[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => setBlogImagePreview(reader.result);
    }

    return (
        <>

            <Toaster />
            <div className="flex items-center justify-center min-h-screen bg-gray-50">
                <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg">
                    <h3 className="text-xl font-semibold text-center text-gray-700 mb-4">📝 Create a Blog</h3>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        {/* Category */}
                        <select
                            {...register("category", { required: "Category is required" })}
                            className="w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300 outline-none"
                        >
                            <option value="">Select Category</option>
                            {[
                                "Devotion",
                                "Sports",
                                "Coding",
                                "Entertainment",
                                "Business",
                                "Health",
                                "Education",
                                "Science",
                                "Technology",
                                "Travel",
                                "Food",
                                "Fashion",
                            ].map((category) => (
                                <option key={category} value={category}>
                                    {category}
                                </option>
                            ))}
                        </select>



                        {/* Title */}
                        <input
                            type="text"
                            placeholder="Blog Title"
                            {...register("title", { required: "Title is required" })}
                            className="w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300 outline-none"
                        />


                        {/* Image Preview */}
                        {blogImagePreview && (
                            <div className="flex justify-center">
                                <img
                                    src={blogImagePreview}
                                    alt="Preview"
                                    className="w-32 h-32 object-cover rounded-md border"
                                />
                            </div>
                        )}

                        {/* Image Upload */}
                        <input
                            type="file"
                            {...register("blogImage", { required: "Blog image is required" })}
                            className="w-full p-2 border border-gray-300 rounded-md"
                            accept="image/*"
                        />


                        {/* About */}
                        <textarea
                            rows="8"
                            placeholder="Write something about your blog"
                            {...register("content", { required: "About section is required" })}
                            className="w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300 outline-none resize-none overflow-y-auto scrollbar-none"
                        />





                        {/* Submit Button */}

                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200 flex items-center justify-center"
                            disabled={loader} // Disable button when loading
                        >
                            {loader ? (
                                <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4z"></path>
                                </svg>
                            ) : "Post Blog"}
                        </button>

                    </form>
                </div>
            </div>
        </>
    );
}

export default CreateBlog;
