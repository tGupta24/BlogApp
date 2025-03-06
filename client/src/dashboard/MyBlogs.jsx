import React, { useEffect, useState } from "react";
import { useAuth } from "../contextApi/AuthProvider";
import Card from "./myBlogCard/BlogCard";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";


export default function MyBlogs() {
    const { blogs, profile } = useAuth();
    const [myBlogs, setMyBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const BASE_URL = import.meta.env.VITE_BASE_URL;

    useEffect(() => {
        if (blogs.length > 0 && profile) {
            const filteredBlogs = blogs.filter(blog => blog.owner._id === profile._id);
            filteredBlogs.reverse();
            setMyBlogs(filteredBlogs);
        }
        setLoading(false);
    }, [blogs, profile]);

    const handleDelete = async (id) => {
        await axios
            .delete(`${BASE_URL}/blog/delete-blog/${id}`, {
                withCredentials: true,
            })
            .then((res) => {
                toast.success(res.data.message || "Blog deleted successfully");
                setMyBlogs((value) => value.filter((blog) => blog._id !== id));
            })
            .catch((error) => {
                toast.error(error.response.message || "Failed to delete blog");
            });
    };



    return (
        <>
            <Toaster />
            {loading ? (
                <div className="flex justify-center items-center h-screen">
                    <div className="w-12 h-12 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {myBlogs.length > 0 ? (
                        myBlogs.map((blog) => (
                            <Card
                                key={blog._id}
                                blog={blog}
                                onDelete={() => handleDelete(blog._id)}
                                onUpdate={`/dashboard/update/${blog._id}`}
                            />

                        ))
                    ) : (
                        <p className="text-gray-500 text-lg font-semibold text-center mt-20 col-span-3">
                            🚀 You haven't posted any blogs yet. Start writing your first blog now!
                        </p>
                    )}
                </div>
            )}
        </>
    );
}
