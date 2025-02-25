import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { NavLink } from "react-router-dom";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { Select, MenuItem } from "@mui/material"

// Custom Previous Arrow
const PrevArrow = (props) => {
    const { onClick } = props
    return (
        <div
            className="absolute top-1/2  bg-white/80 -left-0.5  transform -translate-y-1/2 text-black p-2 rounded-full cursor-pointer z-10"
            onClick={onClick}
        >
            <FaChevronLeft size={20} />
        </div>
    );
};

// Custom Next Arrow
const NextArrow = (props) => {
    const { onClick } = props
    return (
        <div
            className="absolute top-1/2 bg-white/80 transform -translate-y-1/2  right-0 text-black p-2 rounded-full cursor-pointer z-10"
            onClick={onClick}
        >
            <FaChevronRight size={20} />
        </div>
    );
};

function FilterSlider() {
    const settings = {
        dots: false,
        infinite: false,
        speed: 900,
        slidesToShow: 7,
        slidesToScroll: 1,
        autoplay: false,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 8,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 800,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 2,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1
                }
            }
        ]
    };
    const [selectedValue, setSelectedValue] = React.useState("popular");


    return (

        <div className="p-2">

            <div className="lg:flex mt-10 justify-around ">
                <div className="">
                    <Select
                        value={selectedValue}
                        onChange={(e) => setSelectedValue(e.target.value)}
                        size="small" // Makes it compact
                        className="w-30 bg-white  font-mona border-gray-300 rounded-md shadow-sm transition duration-200"
                    >
                        <MenuItem value="popular" >Popular</MenuItem>
                        <MenuItem value="new">New</MenuItem>
                    </Select>
                </div>
                <div className="w-full max-w-4xl relative m-auto lg:m-0 ">
                    <Slider {...settings}>
                        {[...Array(9)].map((_, index) => (
                            <div key={index} className="">
                                <div className="text-center p-2 rounded-md">
                                    <NavLink className="text-lg font-semibold hover:bg-gray-200">Mobile</NavLink>
                                </div>
                            </div>
                        ))}
                    </Slider>
                </div>
            </div >
        </div>

    );
}

export default FilterSlider;
