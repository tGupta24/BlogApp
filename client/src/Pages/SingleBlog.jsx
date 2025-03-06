import axios from "axios";
import React, { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { useAuth } from "../contextApi/AuthProvider";

function Singleblog() {
    const { id } = useParams();
    const [blogs, setBlogs] = useState({});
    const [loading, setLoading] = useState(true);
    const { isAuthenticated } = useAuth(); // Check authentication

    useEffect(() => {
        if (!isAuthenticated) return; // Prevent API call if not authenticated

        const fetchBlogs = async () => {
            try {
                const res = await axios.get(
                    `${import.meta.env.VITE_BASE_URL}/blog/getsingleBlog/${id}`,
                    {
                        withCredentials: true,
                        headers: { "Content-Type": "application/json" },
                    }
                );
                setBlogs(res.data.data);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };

        fetchBlogs();
    }, [id, isAuthenticated]);


    if (!isAuthenticated) {
        return <Navigate to="/" />;
    }

    return (
        <section className="container mx-auto p-4 md:p-8">
            {loading ? (
                <div className="flex justify-center items-center min-h-screen">
                    <div className="w-12 h-12 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
                </div>
            ) : (
                blogs && (
                    <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden p-6">
                        {/* --- Author Info, Category, and Title --- */}
                        <div className="mb-6">
                            <div className="flex items-center space-x-4">
                                {blogs?.owner?.avatar && (
                                    <img
                                        src={blogs.owner.avatar}
                                        alt="author_avatar"
                                        className="w-14 h-14 rounded-full border border-gray-300"
                                    />
                                )}
                                <div>
                                    <h2 className="text-xl font-semibold">{blogs?.owner?.name}</h2>
                                    <p className="text-blue-500 uppercase text-sm font-bold">
                                        {blogs?.category}
                                    </p>
                                </div>
                            </div>
                            <h1 className="text-3xl md:text-4xl font-extrabold mt-4">{blogs?.title}</h1>
                        </div>

                        <div className={`flex flex-col ${blogs?.blogImageWidth > blogs?.blogImageHeight ? "md:flex-col" : "md:flex-row"} gap-6`}>
                            {blogs?.blogImage && (
                                <img
                                    src={blogs.blogImage}
                                    alt="blog_main"
                                    className={`w-full rounded-lg shadow-lg border ${blogs?.blogImageWidth > blogs?.blogImageHeight
                                        ? "h-[300px] object-cover"
                                        : "md:w-1/2 h-auto object-contain"
                                        }`}
                                />
                            )}

                            <div className="md:w-1/2 flex flex-col justify-center">
                                <p className="text-lg text-gray-700 leading-relaxed">{blogs?.content}</p>
                            </div>
                        </div>
                    </div>
                )
            )}
        </section>
    );
}

export default Singleblog;
