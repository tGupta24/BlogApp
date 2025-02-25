import React from "react";
import FilterSlider from "./Blog/FilterSlider";
import Cards from "./Blog/Cards";
import { useAuth } from "../contextApi/AuthProvider";
import CardForBlog from "./BlogItems/CardForBlog";

export default function Blog() {
    const { blogs } = useAuth();

    return (
        <div className="container mx-auto p-4">
            {/* Filter Section */}
            <FilterSlider />
            {console.log(blogs)
            }
            {/* Blog Cards Section */}
            <div className="mt-6 p-5">
                <div className="grid grid-cols-1 gap-4 w-[75%]">
                    {blogs.length > 0 ? (
                        blogs.map((blog) => (
                            <CardForBlog
                                key={blog._id}
                                blog={blog}

                            />
                        ))
                    ) : (
                        <p className="text-gray-500 col-span-3 text-center">No blogs available</p>
                    )}
                </div>
            </div>
        </div>
    );
}
