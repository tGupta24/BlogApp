import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa"; 
import { Select, MenuItem, Button } from "@mui/material";
import { useAuth } from "../../contextApi/AuthProvider";

// Custom Arrows
const Arrow = ({ onClick, direction }) => (
    <div
        className={`absolute top-1/2 bg-gray-200 hover:bg-gray-300 transition-all duration-200 transform -translate-y-1/2 ${direction === "left" ? "-left-2" : "right-0"
            } text-black p-3 rounded-full cursor-pointer z-10 shadow-md`}
        onClick={onClick}
    >
        {direction === "left" ? <FaChevronLeft size={18} /> : <FaChevronRight size={18} />}
    </div>
);

function FilterSlider({ onFilter }) {
    const { blogs } = useAuth();
    const [selectedValue, setSelectedValue] = useState();
    const [selectedType, setSelectedType] = useState("all");

    const categories = [
        "Devotion",
        "Sports",
        "Coding",
        "Entertainment",
        "Business",
        "Health",
        "Education",
        "Science",
        "Technology",
        "Travel",
        "Food",
        "Fashion",
    ];

    const handleFilterChange = (category) => {
        setSelectedValue(category);
        onFilter(category);
    };

    const settings = {
        dots: false,
        infinite: false,
        speed: 900,
        slidesToShow: 6,
        slidesToScroll: 1,
        autoplay: false,
        nextArrow: <Arrow direction="right" />,
        prevArrow: <Arrow direction="left" />,
        responsive: [
            { breakpoint: 1024, settings: { slidesToShow: 5, slidesToScroll: 2 } },
            { breakpoint: 800, settings: { slidesToShow: 3, slidesToScroll: 1 } },
            { breakpoint: 480, settings: { slidesToShow: 2, slidesToScroll: 1 } },
        ],
    };

    return (
        <div className="p-4">
            <div className="lg:flex mt-8 justify-around items-center">
                {/* Select Category Type */}
                <Select
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value)}
                    size="small"
                    className="w-32 bg-white border-gray-300 rounded-md shadow-sm transition duration-200"
                >
                    <MenuItem value="all">All</MenuItem>
                    <MenuItem value="popular">Popular</MenuItem>
                    <MenuItem value="new">New</MenuItem>
                </Select>

                {/* Category Slider */}
                <div className="w-full max-w-4xl relative m-auto lg:m-0">
                    <Slider {...settings}>
                        <div className="text-center p-2">
                            <Button
                                onClick={() => handleFilterChange("all")}
                                variant={selectedValue === "all" ? "contained" : "outlined"}
                                sx={{
                                    textTransform: "none",
                                    fontSize: "0.9rem",
                                    padding: "8px 16px",
                                    borderRadius: "8px",
                                    minWidth: "120px",
                                    bgcolor: selectedValue === "all" ? "#1e293b" : "white",
                                    color: selectedValue === "all" ? "white" : "#1e293b",
                                    border: "1px solid #1e293b",
                                    transition: "all 0.3s ease",
                                    "&:hover": {
                                        bgcolor: selectedValue === "all" ? "#374151" : "#f3f4f6",
                                    },
                                    "&:active": {
                                        transform: "scale(0.95)",
                                    },
                                }}
                            >
                                All
                            </Button>
                        </div>
                        {categories.map((category) => (
                            <div key={category} className="text-center p-2">
                                <Button
                                    onClick={() => handleFilterChange(category)}
                                    variant={selectedValue === category ? "contained" : "outlined"}
                                    sx={{
                                        textTransform: "none",
                                        fontSize: "0.9rem",
                                        padding: "8px 16px",
                                        borderRadius: "8px",
                                        minWidth: "120px",
                                        bgcolor: selectedValue === category ? "#1e293b" : "white",
                                        color: selectedValue === category ? "white" : "#1e293b",
                                        border: "1px solid #1e293b",
                                        transition: "all 0.3s ease",
                                        "&:hover": {
                                            bgcolor: selectedValue === category ? "#374151" : "#f3f4f6",
                                        },
                                        "&:active": {
                                            transform: "scale(0.95)",
                                        },
                                    }}
                                >
                                    {category}
                                </Button>
                            </div>
                        ))}
                    </Slider>
                </div>
            </div>
        </div>
    );
}

export default FilterSlider;
