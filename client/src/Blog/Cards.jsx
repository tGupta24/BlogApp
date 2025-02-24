import React from "react";
import { FaHeart } from "react-icons/fa";

export default function Cards({
    blogImg,
    description,
    authorImg,
    authorName,
    likeCount,
}) {
    return (
        <div className="rounded-lg m-2 max-w-sm shadow-lg bg-white">
            {/* Image Section */}
            <div className="relative group">
                <img
                    src={blogImg || "/cardimg.jpg"}
                    alt="Card Image"
                    className="w-full h-60 object-cover rounded-md"
                />
                <div
                    className="absolute bottom-0 w-full h-16 text-white 
                    bg-gradient-to-t from-black to-transparent opacity-0 
                    group-hover:opacity-100 transition-opacity duration-300 flex justify-between items-center px-4"
                >
                    <span className="text-sm font-medium">{description}</span>
                    <button className="bg-white p-2 rounded-full flex items-center">
                        <FaHeart className="text-red-500" />
                        <span className="text-gray-700 text-sm ml-1">{likeCount}</span>
                    </button>
                </div>
            </div>

            {/* Card Footer */}
            <div className="flex justify-between items-center mt-4 px-4 pb-4">
                {/* Author Section */}
                <div className="flex items-center gap-2">
                    <img
                        src={authorImg || "/default-avatar.png"}
                        alt="Author"
                        className="w-8 h-8 rounded-full bg-gray-300"
                    />
                    <p className="text-sm font-semibold">{authorName || "Unknown Author"}</p>
                </div>
            </div>
        </div>
    );
}
