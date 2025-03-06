import React from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../../contextApi/AuthProvider";
import toast from "react-hot-toast";

export default function CardForBlog({ blog }) {
    let date = new Date(blog.createdAt);
    const options = { year: "numeric", month: "short", day: "numeric" };
    let formattedDate = date.toLocaleDateString(undefined, options);
    const { isAuthenticated } = useAuth();

    const pleaseLogin = (e) => {
        e.preventDefault(); // Prevents navigation if not logged in
        toast.error("Please login to view the full blog");
    };

    return (
        <div className="border border-gray-300 p-4 mb-4 rounded-lg shadow-sm overflow-hidden flex flex-col md:flex-row">
            {/* Image (Left on big screens, top on mobile) */}
            <div className="w-full md:w-48 shrink-0 md:mr-4 flex justify-center md:justify-start">
                <Link to={isAuthenticated ? `/singleBlog/${blog._id}` : "#"} onClick={!isAuthenticated ? pleaseLogin : undefined}>
                    <img
                        src={blog.blogImage}
                        alt={blog.title}
                        className="w-full md:w-48 h-auto object-cover rounded-md"
                    />
                </Link>
            </div>

            {/* Text Content */}
            <div className="flex-grow flex flex-col">
                {/* Date (Above title in mobile, inline in big screens) */}
                <div className="text-sm text-gray-600 mb-1 md:mb-2 md:order-1">
                    {formattedDate}
                </div>

                {/* Title */}
                <h2 className="text-xl font-semibold mb-2">{blog.title}</h2>

                {/* Content */}
                <p className="text-base leading-relaxed">
                    {blog.content.slice(0, 400)}....
                    {isAuthenticated ? (
                        <NavLink to={`/singleBlog/${blog._id}`} className="text-sm text-slate-400"> read more</NavLink>
                    ) : (
                        <span className="text-sm text-slate-400 cursor-pointer" onClick={pleaseLogin}> read more</span>
                    )}
                </p>
            </div>
        </div>
    );
}
