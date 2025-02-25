import React from "react"
import { useAuth } from "../contextApi/AuthProvider"
import Cards from "../Pages/Blog/Cards";

export default function Hero() {

    const { blogs } = useAuth();

    const newBlogs = blogs.slice().reverse();
    return (
        <div className="p-4 m-auto">
            <div className="mt-6 p-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
                    {newBlogs.length > 0 ? (
                        newBlogs.slice(0, 3).map((blog) => (

                            <Cards
                                toForImg="/home"
                                toForAuthor="/home"
                                key={blog._id}
                                blogImg={blog.blogImage}
                                category={blog.category} // Using 'content' for description
                                authorImg={blog.owner.avatar}
                                authorName={blog.owner.name}
                                likeCount={0} // Add likes if available in the future
                                createdAt={blog.createdAt}
                            />
                        ))
                    ) : (
                        <p className="text-gray-500 col-span-3 text-center">No blogs available</p>
                    )}
                </div>
            </div>
        </div>
    )
}