import React from "react";
import { Link } from "react-router-dom";

export default function CardForBlog({ blog }) {
    let date = new Date(blog.createdAt);
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    let formattedDate = date.toLocaleDateString(undefined, options);

    return (
        <div className="flex border border-gray-300 p-4 mb-4 rounded-lg shadow-sm overflow-hidden">
            <div className="w-48 mr-4 shrink-0"> {/* Image Container - shrink-0 is crucial */}
                <Link> {/* Add a dynamic link */}
                    <img
                        src={blog.blogImage}
                        alt={blog.title}
                        className="w-full h-auto object-cover rounded-md" // Key changes here
                    />
                </Link>
            </div>
            <div className="flex-grow flex flex-col">
                <div className="text-sm text-gray-600 mb-2">{formattedDate}</div>
                <h2 className="text-xl font-semibold mb-2">{blog.title}</h2>
                <p className="text-base leading-relaxed overflow-hidden">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Accusantium cum excepturi dolores, ad placeat magnam deleniti praesentium animi tenetur, quo aliquid est voluptas inventore a, vel enim illum laborum officiis!Lorem
                    lorme34
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione quibusdam consequatur debitis quia, architecto corrupti nesciunt labore ex beatae molestiae quod voluptates, vel tenetur sunt omnis, quisquam libero! Totam commodi voluptatem laboriosam harum expedita amet dignissimos ab, pariatur asperiores ullam voluptas magni eius eveniet minus!</p> {/* Show content */}
                {/* ... other content (author, etc.) */}
            </div>
        </div>
    );
}