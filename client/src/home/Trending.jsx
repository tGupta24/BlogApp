import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Cards from "../Pages/Blog/Cards";
import { useAuth } from "../contextApi/AuthProvider";

// Custom Arrow Components
const PrevArrow = ({ onClick }) => (
    <div
        className="absolute top-1/2 left-2 bg-white/80 transform -translate-y-1/2 text-black p-2 rounded-full cursor-pointer z-10 shadow-md"
        onClick={onClick}
    >
        <FaChevronLeft size={20} />
    </div>
);

const NextArrow = ({ onClick }) => (
    <div
        className="absolute top-1/2 right-2 bg-white/80 transform -translate-y-1/2 text-black p-2 rounded-full cursor-pointer z-10 shadow-md"
        onClick={onClick}
    >
        <FaChevronRight size={20} />
    </div>
);

function Trending() {
    const { blogs } = useAuth();
    const trendingBlogs = blogs.slice().reverse().slice(0, 6); // Get latest 6 blogs

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: false,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };

    return (
        <div className="p-9">
            <h2 className="text-xl font-semibold mb-4 ml-9">Trending Blogs</h2>
            {trendingBlogs.length > 0 ? (
                <Slider {...settings}>
                    {trendingBlogs.map((blog) => (
                        <Cards
                            key={blog._id}
                            toForImg={`/singleBlog/${blog._id}`}
                            toForAuthor="/home"
                            blogImg={blog.blogImage}
                            category={blog.category}
                            authorImg={blog.owner.avatar}
                            authorName={blog.owner.name}
                            likeCount={0} // Future feature
                            createdAt={blog.createdAt}
                        />
                    ))}
                </Slider>
            ) : (
                <p className="text-gray-500 text-center">No trending blogs available</p>
            )}
        </div>
    );
}

export default Trending;
