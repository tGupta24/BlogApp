import React from "react";
import FilterSlider from "../Blog/FilterSlider";
import Card from "../Blog/Cards";
import { useAuth } from "../contextApi/AuthProvider";

export default function Blog() {
    const { blogs } = useAuth();

    return (
        <div className="container mx-auto p-4">
            {/* Filter Section */}
            <FilterSlider />

            {/* Blog Cards Section */}
            <div className="mt-6 p-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
                    {blogs.length > 0 ? (
                        blogs.map((blog) => (
                            <Card
                                key={blog._id}
                                blogImg={blog.blogImage}
                                description={blog.content} // Using 'content' for description
                                authorImg={blog.owner.avatar}
                                authorName={blog.owner.name}
                                likeCount={0} // Add likes if available in the future
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
