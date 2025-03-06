import React, { useState, useEffect } from "react";
import { useAuth } from "../contextApi/AuthProvider";
import Cards from "../Pages/Blog/Cards";

export default function Hero() {
    const { blogs } = useAuth();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (blogs.length > 0 || blogs.length === 0) {
            setLoading(false);
        }
    }, [blogs]);

    const newBlogs = blogs.slice().reverse();

    return (
        <div className="p-4 m-auto">
            <div className="mt-6 p-5">
                {loading ? (
                    <div className="flex justify-center items-center min-h-[200px]">
                        <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-blue-500"></div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
                        {newBlogs.length > 0 ? (
                            newBlogs.slice(0, 3).map((blog) => (
                                <Cards
                                    toForImg={`/singleBlog/${blog._id}`}
                                    toForAuthor="/home"
                                    key={blog._id}
                                    blogImg={blog.blogImage}
                                    category={blog.category}
                                    authorImg={blog.owner.avatar}
                                    authorName={blog.owner.name}
                                    likeCount={0}
                                    createdAt={blog.createdAt}
                                />
                            ))
                        ) : (
                            <p className="text-gray-500 col-span-3 text-center">No blogs available</p>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}