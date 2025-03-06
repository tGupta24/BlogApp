import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { useParams } from "react-router-dom";

const BASE_URL = import.meta.env.VITE_BASE_URL;

function UpdateBlog() {
    const { id } = useParams();
    const [blogImagePreview, setBlogImagePreview] = useState("");
    const [loader, setLoader] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        watch,
        setValue // Used to pre-fill form fields
    } = useForm();

    // Fetch existing blog details
    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const res = await axios.get(`${BASE_URL}/blog/getsingleBlog/${id}`, {
                    withCredentials: true,
                    headers: { "Content-Type": "application/json" },
                });

                const blogData = res.data.data;
                setValue("title", blogData.title);
                setValue("category", blogData.category);
                setValue("content", blogData.content);
                setBlogImagePreview(blogData.blogImage); // Show previous image
            } catch (error) {
                console.log(error);
                toast.error("Error fetching blog details");
            }
        };

        fetchBlog();
    }, [id, setValue]);

    const onSubmit = async (data) => {
        const formData = new FormData();
        formData.append("title", data.title);
        formData.append("category", data.category);
        formData.append("content", data.content);

        if (data.blogImage.length > 0) {
            formData.append("blogImage", data.blogImage[0]);
        }

        try {
            setLoader(true);
            const response = await axios.put(`${BASE_URL}/blog/update-blog/${id}`, formData, {
                withCredentials: true,
                headers: { "Content-Type": "multipart/form-data" },
            });

            toast.success(response.data.message || "Blog updated successfully");
            setLoader(false);
        } catch (error) {
            setLoader(false);
            toast.error(error.response?.data?.message || "Error updating blog");
        }
    };

    // Watch the file input to preview image
    const blogImage = watch("blogImage");
    useEffect(() => {
        if (blogImage && blogImage.length > 0) {
            const file = blogImage[0];
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => setBlogImagePreview(reader.result);
        }
    }, [blogImage]);

    return (
        <>
            <Toaster />
            <div className="flex items-center justify-center min-h-screen bg-gray-50">
                <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg">
                    <h3 className="text-xl font-semibold text-center text-gray-700 mb-4">✍️ Update Blog</h3>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        {/* Category */}
                        <select
                            {...register("category", { required: "Category is required" })}
                            className="w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300 outline-none"
                        >
                            <option value="">Select Category</option>
                            <option value="Devotion">Devotion</option>
                            <option value="Sports">Sports</option>
                            <option value="Coding">Coding</option>
                            <option value="Entertainment">Entertainment</option>
                            <option value="Business">Business</option>
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
                            {...register("blogImage")}
                            className="w-full p-2 border border-gray-300 rounded-md"
                            accept="image/*"
                        />

                        {/* Content */}
                        <textarea
                            rows="8"
                            placeholder="Update blog content"
                            {...register("content", { required: "Content is required" })}
                            className="w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300 outline-none resize-none overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 scrollbar-thumb-rounded"
                        />

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200 flex items-center justify-center"
                            disabled={loader}
                        >
                            {loader ? (
                                <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4z"></path>
                                </svg>
                            ) : "Update Blog"}
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}

export default UpdateBlog;
