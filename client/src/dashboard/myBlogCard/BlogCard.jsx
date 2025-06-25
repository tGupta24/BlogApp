import React from "react";
import { Link, NavLink } from "react-router-dom";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { FaHeart } from "react-icons/fa";

const BlogCard = ({ blog, onDelete, onUpdate }) => {
    const {
        blogImage,
        category,
        likeCount,
        authorImg,
        authorName,
        toForAuthor,
        differenceDays,
    } = blog;

    return (
        <div className="rounded-lg m-2 max-w-sm shadow-lg bg-white hover:scale-105 transition-transform duration-300">
            {/* Image Section */}
            <div className="relative group">
                <Link to={`/singleBlog/${blog._id}`}>
                    <img
                        src={blogImage || "/cardimg.jpg"}
                        alt="Card Image"
                        className="w-full h-60 object-cover rounded-md"
                    />
                </Link>
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


                {/* Action Buttons */}
                <div className="flex justify-between w-full">
                    <button
                        onClick={onDelete}
                        className="flex items-center gap-1 text-red-500 hover:text-red-700 transition"
                    >
                        <AiFillDelete size={20} />
                        Delete
                    </button>
                    <NavLink
                        to={onUpdate}
                        className="flex items-center gap-1 text-blue-500 hover:text-blue-700 transition"
                    >
                        <AiFillEdit size={20} />
                        Update
                    </NavLink>
                </div>
            </div>
        </div>
    );
};

export default BlogCard;
