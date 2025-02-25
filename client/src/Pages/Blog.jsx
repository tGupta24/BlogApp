import React from "react";
import FilterSlider from "./Blog/FilterSlider";
import { useAuth } from "../contextApi/AuthProvider";
import CardForBlog from "./BlogItems/CardForBlog";

export default function Blog() {
    const { blogs, isAuthenicated } = useAuth();

    // If authenticated, show only first 3-4 blogs; otherwise, show all
    const displayedBlogs = !isAuthenicated ? blogs.slice(0, 2) : blogs;

    return (
        <div className="container mx-auto p-4">
            {/* Filter Section */}
            <FilterSlider />

            {/* Blog Cards Section */}
            <div className="mt-6 p-5">
                <div className="grid grid-cols-1 gap-4 w-[75%]">
                    {displayedBlogs.length > 0 ? (
                        displayedBlogs.map((blog) => (
                            <CardForBlog key={blog._id} blog={blog} />
                        ))
                    ) : (
                        <p className="text-gray-500 col-span-3 text-center">
                            No blogs available
                        </p>
                    )}
                </div>

                {/* Show a message if only limited blogs are displayed */}
                {!isAuthenicated && blogs.length > 4 && (
                    <p className="text-blue-500 text-center mt-4">
                        🔐 Login to explore all blogs!
                    </p>
                )}
            </div>
        </div>
    );
}
