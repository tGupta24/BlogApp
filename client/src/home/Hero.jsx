import React, { useEffect, useState } from "react";
import { useAuth } from "../contextApi/AuthProvider";
import Cards from "../Pages/Blog/Cards";

export default function Hero() {
    const { blogs } = useAuth();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // blogs === null means still loading; array means loaded
        if (blogs !== null) {
            setLoading(false);
        }
    }, [blogs]);

    // Defensive: If blogs is null still, set newBlogs empty array to avoid errors
    const newBlogs = blogs ? blogs.slice().reverse() : [];

    return (
        <div className="p-4 m-auto">
            <div className="mt-6 p-5">
                {loading ? (
                    <div className="flex justify-center items-center min-h-[200px]">
                        <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-blue-500"></div>
                    </div>
                ) : newBlogs.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
                        {newBlogs.slice(0, 3).map((blog) => (
                            <Cards
                                key={blog._id}
                                toForImg={`/singleBlog/${blog._id}`}
                                toForAuthor="/home"
                                blogImg={blog.blogImage}
                                category={blog.category}
                                authorImg={blog.owner.avatar}
                                authorName={blog.owner.name}
                                likeCount={0}
                                createdAt={blog.createdAt}
                            />
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-500 col-span-3 text-center">No blogs available</p>
                )}
            </div>
        </div>
    );
}
