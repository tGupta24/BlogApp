import React, { useState } from "react";
import FilterSlider from "./Blog/FilterSlider";
import { useAuth } from "../contextApi/AuthProvider";
import CardForBlog from "./BlogItems/CardForBlog";
import { NavLink } from "react-router-dom";

export default function Blog() {
    const { blogs, isAuthenticated } = useAuth();
    const [filteredCategory, setFilteredCategory] = useState("all");

    // Filter blogs based on selected category
    const filteredBlogs = filteredCategory === "all"
        ? blogs
        : blogs.filter((blog) => blog.category === filteredCategory);

    // If not authenticated, show only first 2 blogs
    const displayedBlogs = !isAuthenticated ? filteredBlogs.slice(0, 2) : filteredBlogs;


    const pleaseLogin = (e) => {
        e.preventDefault(); // Prevents navigation if not logged in
        toast.error("Please login to view the full blog");
    };

    return (
        <div className="container mx-auto p-4">
            {/* Filter Section */}
            <div className="sticky top-12 bg-white">
                <FilterSlider onFilter={setFilteredCategory} />
            </div>

            {/* Blog Cards Section */}
            <div className="mt-6 p-5">
                <div className="grid grid-cols-1 gap-4 w-full sm:w-[75%]">
                    {displayedBlogs.length > 0 ? (
                        displayedBlogs.map((blog) => (
                            <CardForBlog key={blog._id} blog={blog} />
                        ))
                    ) : (
                        <div className="  text-gray-500  text-center h-screen">
                            No blogs available
                        </div>
                    )}
                </div>

                {/* Show a message if only limited blogs are displayed */}
                {!isAuthenticated && blogs.length > 4 && (
                    <NavLink to="/login">
                        <p className="text-blue-500 text-center mt-4">
                            🔐 Login to explore all blogs!
                        </p></NavLink>
                )}
            </div>
        </div>
    );
}
