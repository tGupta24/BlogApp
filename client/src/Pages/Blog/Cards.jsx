import React from "react";
import { FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useAuth } from "../../contextApi/AuthProvider";
import toast from "react-hot-toast";



export default function Cards({
    toForImg,
    toForAuthor,
    blogImg,
    category,
    authorImg,
    authorName,
    likeCount,
    createdAt,
}) {

    const uploadTime = new Date(createdAt)  // timing of createdAt 
    const currentTime = new Date();// currect timmming
    const diff = currentTime - uploadTime
    const differenceDays = Math.floor(diff / (1000 * 60 * 60 * 24));// diffrence in days
    const pleaseLogin = (e) => {
        e.preventDefault(); // Prevents navigation if not logged in
        toast.error("Please login to view the full blog");
    };
    const { isAuthenticated } = useAuth()


    return (
        <div className="rounded-lg m-2 max-w-sm shadow-lg bg-white hover:scale-105 transition-transform duration-300">
            {/* Image Section */}
            <div className="relative group">
                <Link
                    to={isAuthenticated ? (toForImg) : "#"} onClick={!isAuthenticated ? pleaseLogin : undefined}
                >
                    <img
                        src={blogImg || "/cardimg.jpg"}
                        alt="Card Image"
                        className="w-full h-60 object-cover rounded-md"
                    /></Link>
                <div
                    className="absolute bottom-0 w-full h-16 text-white 
                    bg-gradient-to-t from-black to-transparent opacity-0 
                    group-hover:opacity-100 transition-opacity duration-300 flex justify-between items-center px-4"
                >
                    <span className="text-sm font-medium">{category}</span>

                </div>
            </div>

            {/* Card Footer */}
            <div className="flex justify-between items-center mt-4 px-4 pb-4">
                {/* Author Section */}
                <div className="flex items-center gap-2">
                    <img
                        src={authorImg || "/default-avatar.png"}
                        alt="Author"
                        className="w-10 h-10 rounded-full bg-gray-300"
                    />
                    <div className="flex flex-col">
                        <Link
                            to={toForAuthor}
                        >
                            <p className="text-md font-semibold">{authorName || "Unknown Author"}</p>
                        </Link>
                        <p className="text-[10px] text-slate-500">{differenceDays < 1 ? "New" : ""}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
