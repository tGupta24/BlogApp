import React from "react";
import { useAuth } from "../contextApi/AuthProvider";
import { NavLink, useNavigate } from "react-router-dom";
import { Drawer, Avatar, IconButton, Box, Button } from "@mui/material";
import { BiSolidLeftArrowAlt } from "react-icons/bi";
import { FaUserCircle } from "react-icons/fa";

const Sidebar = ({ open, setOpen }) => {
    const { profile, logout } = useAuth();
    const navigateTo = useNavigate();

    const handleClose = () => setOpen(false);

    const handleLogout = async () => {
        await logout();
        navigateTo("/");
        handleClose();
    };

    const gotoHome = () => {
        navigateTo("/");
        handleClose();
    };

    return (
        <>
            {/* Drawer for Mobile Screens */}
            <Drawer
                anchor="left"
                open={open}
                onClose={handleClose}
                PaperProps={{
                    className: "w-72 bg-gradient-to-b from-gray-900 to-gray-700 text-white shadow-2xl rounded-r-xl p-6",
                }}
            >
                {/* Close Icon */}
                <IconButton
                    className="absolute top-4 right-4 text-gray-300 hover:text-white transition-all"
                    onClick={handleClose}
                >
                    <BiSolidLeftArrowAlt className="text-3xl" />
                </IconButton>

                <SidebarContent
                    profile={profile}
                    gotoHome={gotoHome}
                    handleLogout={handleLogout}
                    handleClose={handleClose}
                />
            </Drawer>
        </>
    );
};

// Sidebar Content Component
const SidebarContent = ({ profile, gotoHome, handleLogout, handleClose }) => {
    return (
        <Box>
            {/* Profile Section */}
            <div className="flex flex-col items-center py-6 border-b border-gray-600">
                {profile?.avatar ? (
                    <Avatar
                        src={profile.avatar}
                        sx={{
                            width: 100,
                            height: 100,
                            border: "4px solid #ffffff",
                            boxShadow: "0 0 10px rgba(255, 255, 255, 0.4)",
                            "&:hover": { transform: "scale(1.05)" },
                            transition: "transform 0.3s",
                        }}
                    />
                ) : (
                    <FaUserCircle className="text-gray-300 w-24 h-24" />
                )}
                <p className="text-xl font-semibold mt-3 text-black tracking-wide">
                    {profile?.name || "Guest User"}
                </p>
            </div>

            {/* Menu Buttons */}
            <div className="flex flex-col mt-6 space-y-4">
                {[
                    { name: "My Blogs", route: "/dashboard/my-blogs" },
                    { name: "Create Blog", route: "/dashboard/create-blog" },
                    { name: "My Profile", route: "/dashboard/my-profile" },
                    { name: "Home", action: gotoHome },
                    { name: "Logout", action: handleLogout },
                ].map(({ name, route, action }) => (
                    <NavLink to={route || "#"} key={name}>
                        <Button
                            onClick={() => {
                                action ? action() : handleClose();
                            }}
                            variant="contained"
                            sx={{
                                width: "100%",
                                bgcolor: "#1e293b",
                                color: "white",
                                "&:hover": { bgcolor: "#374151" },
                                textTransform: "none",
                                fontSize: "1rem",
                                padding: "9px",
                                borderRadius: "10px",
                                boxShadow: "0 4px 10px rgba(0, 0, 0, 0.3)",
                                transition: "all 0.3s",
                            }}
                        >
                            {name}
                        </Button>
                    </NavLink>
                ))}
            </div>
        </Box>
    );
};

export default Sidebar;
