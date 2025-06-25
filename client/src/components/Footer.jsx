import React from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

export default function Footer() {
    return (
        <footer className="bg-gray-100 text-black py-6 mt-5  bottom-0">
            <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between px-4 text-center md:text-left">

                {/* Left Section - Website Name */}
                <h2 className="text-lg font-bold mb-4 md:mb-0">My Website</h2>

                {/* Center Section - Navigation Links */}
                <nav className="flex flex-wrap justify-center md:justify-start gap-4">
                    <a href="#" className="hover:text-blue-600">Home</a>
                    <a href="#" className="hover:text-blue-600">About</a>
                    <a href="#" className="hover:text-blue-600">Services</a>
                    <a href="#" className="hover:text-blue-600">Contact</a>
                </nav>

                {/* Right Section - Social Media Icons */}
                <div className="flex space-x-4 mt-4 md:mt-0">
                    <a href="#" className="text-blue-600 hover:text-blue-800">
                        <FaFacebook size={20} />
                    </a>
                    <a href="#" className="text-blue-600 hover:text-blue-800">
                        <FaTwitter size={20} />
                    </a>
                    <a href="#" className="text-blue-600 hover:text-blue-800">
                        <FaInstagram size={20} />
                    </a>
                    <a href="#" className="text-blue-600 hover:text-blue-800">
                        <FaLinkedin size={20} />
                    </a>
                </div>
            </div>

            {/* Bottom Section */}
            <p className="text-sm text-gray-600 text-center mt-4">
                © {new Date().getFullYear()} My Website. All Rights Reserved.
            </p>
        </footer>
    );
}
