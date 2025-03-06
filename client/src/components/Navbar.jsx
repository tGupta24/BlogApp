import React, { useState } from "react";
import { Navigate, NavLink, useNavigate } from "react-router-dom";
import { AppBar, Toolbar, IconButton, Drawer, List, ListItem, Button, Typography, Box, Menu, MenuItem } from "@mui/material";
import { Menu as MenuIcon, Close as CloseIcon } from "@mui/icons-material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useAuth } from "../contextApi/AuthProvider";
import { MdSettings } from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { Toaster } from "react-hot-toast";


// Custom Breakpoints
const theme = createTheme({
    breakpoints: {
        values: {
            end: 0,
            xs: 300,
            sm: 340,
            md: 440,
            lg: 740,
            xl: 1536,
        },
    },
});

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const { profile, isAuthenticated, logout, isAdmin, setIsAdmin } = useAuth();

    // Dropdown State
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    // Handle Dropdown Open/Close
    const handleProfileClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    const navigate = useNavigate();
    const Navigate = () => {
        navigate("/dashboard/my-profile");
    };


    return (
        <ThemeProvider theme={theme}>
            <Toaster position="top-center" reverseOrder={false} />
            {/* Navbar */}
            <AppBar position="sticky" sx={{ backgroundColor: "#ffffff", color: "black", boxShadow: 0 }}>
                <Toolbar sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>

                    {/* Website Title */}
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                        <img src="/B.png" alt="" style={{ height: 40, marginRight: 8 }} />
                        <Typography variant="h6" sx={{ fontWeight: "bold", fontSize: "25px" }}>
                            Blogger
                        </Typography>
                    </Box>

                    {/* Middle Links */}
                    <List sx={{
                        display: { end: "none", xs: "none", sm: "none", md: "none", lg: "flex" },
                        gap: 1,
                        flexGrow: 1,
                        justifyContent: "center"
                    }}>
                        {["Home", "Blogs", "Creators", "About", "Contact"].map((text) => (
                            <NavLink key={text} to={`/${text.toLowerCase()}`} style={{ textDecoration: "none" }}>
                                <Button sx={{ color: "black", ":hover": { bgcolor: "#e5e7eb" }, textTransform: "none", fontWeight: "bold", fontSize: "16px" }}>
                                    {text}
                                </Button>
                            </NavLink>
                        ))}
                    </List>

                    <Box sx={{ display: "flex" }}>
                        {/* Right-Side Buttons */}
                        <List sx={{
                            display: { end: "none", xs: "none", md: "none", lg: "flex" },
                            alignItems: "center",
                            gap: 2,
                            flexGrow: { xs: 1, md: 0 },
                            justifyContent: { xs: "center", md: "flex-end" }
                        }}>
                            {isAuthenticated ? (
                                profile?.role === "admin" ? (
                                    <NavLink to="/dashboard" style={{ textDecoration: "none" }}>
                                        <Button sx={{ color: "black", bgcolor: "#9ca3af", ":hover": { bgcolor: "#96a2b6c4" } }}>Dashboard</Button>
                                    </NavLink>
                                ) : null
                            ) : (
                                <NavLink to="/register" style={{ textDecoration: "none" }}>
                                    <Button sx={{ ":hover": { bgcolor: "#9ca3af" } }}>SignUp</Button>
                                </NavLink>
                            )}

                            {/* Profile Image with Dropdown */}
                            {isAuthenticated ? (
                                <>
                                    <img
                                        src={profile?.avatar || "/default-avatar.png"}
                                        alt="Author"
                                        className="w-12 h-12 rounded-full bg-gray-300 cursor-pointer"
                                        onClick={handleProfileClick}
                                    />
                                    <Menu
                                        anchorEl={anchorEl}
                                        open={open}
                                        onClose={handleClose}
                                        anchorOrigin={{
                                            vertical: "bottom",
                                            horizontal: "right",
                                        }}
                                        transformOrigin={{
                                            vertical: "top",
                                            horizontal: "right",
                                        }}
                                        sx={{
                                            "& .MuiPaper-root": {
                                                borderRadius: "8px",
                                                boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
                                                minWidth: "180px",
                                                padding: "8px 0",
                                            },
                                        }}
                                    >
                                        <MenuItem onClick={() => { handleClose(); Navigate(); }} sx={{ fontSize: "14px", fontWeight: "500", padding: "10px 20px", display: "flex", gap: "8px", "&:hover": { backgroundColor: "#f5f5f5" } }}>
                                            <FaUserCircle /> Profile
                                        </MenuItem>

                                        <MenuItem onClick={handleClose} sx={{ fontSize: "14px", fontWeight: "500", padding: "10px 20px", display: "flex", gap: "8px", "&:hover": { backgroundColor: "#f5f5f5" } }}>
                                            <MdSettings /> Settings
                                        </MenuItem>

                                        <MenuItem onClick={() => { handleClose(); logout(); }} sx={{ fontSize: "14px", fontWeight: "500", padding: "10px 20px", color: "red", display: "flex", gap: "8px", "&:hover": { backgroundColor: "#ffebeb" } }}>
                                            <FiLogOut /> Logout
                                        </MenuItem>
                                    </Menu>
                                </>
                            ) : (
                                <NavLink to="/login" style={{ textDecoration: "none" }}>
                                    <Button sx={{ bgcolor: "black", color: "white", borderRadius: "50px", ":hover": { bgcolor: "black" }, px: "15px" }}>Login</Button>
                                </NavLink>
                            )}
                        </List>

                        {/* Hamburger Icon */}
                        <IconButton sx={{ display: { sm: "flex", md: "flex", lg: "none" } }} onClick={() => setIsOpen(true)}>
                            <MenuIcon fontSize="large" />
                        </IconButton>
                    </Box>
                </Toolbar>
            </AppBar>
            <Drawer anchor="right" open={isOpen} onClose={() => setIsOpen(false)}>
                <List sx={{ width: 250, display: "flex", flexDirection: "column", height: "100vh" }}>

                    {/* Close Button */}
                    <IconButton onClick={() => setIsOpen(false)} sx={{ alignSelf: "flex-end", m: 1 }}>
                        <CloseIcon />
                    </IconButton>

                    {/* Sidebar Links */}
                    {["Home", "Blogs", "Creators", "About", "Contact"].map((text) => (
                        <ListItem key={text} sx={{ justifyContent: "center" }}>
                            <NavLink to={`/${text.toLowerCase()}`} style={{ textDecoration: "none", width: "100%" }} onClick={() => setIsOpen(false)}>
                                <Button fullWidth sx={{ textTransform: "none", fontSize: 18, ":hover": { bgcolor: "#e5e7eb" } }}>{text}</Button>
                            </NavLink>
                        </ListItem>
                    ))}

                    {/* Sidebar Buttons (Visible only when hidden in Navbar) */}
                    <ListItem sx={{ justifyContent: "center", mt: 2 }}>
                        {isAuthenticated ? (
                            isAdmin ? (
                                <NavLink to="/dashboard" style={{ textDecoration: "none", width: "80%" }}>
                                    <Button
                                        fullWidth
                                        sx={{
                                            color: "black",
                                            bgcolor: "#9ca3af",
                                            fontWeight: "bold",
                                            borderRadius: "50px",
                                            ":hover": { bgcolor: "#96a2b6c4" },
                                        }}
                                    >
                                        Dashboard
                                    </Button>
                                </NavLink>
                            ) : null
                        ) : (
                            <NavLink to="/register" style={{ textDecoration: "none", width: "80%" }}>
                                <Button
                                    fullWidth
                                    sx={{
                                        bgcolor: "#9ca3af",
                                        color: "black",
                                        fontWeight: "bold",
                                        borderRadius: "50px",
                                        ":hover": { bgcolor: "#96a2b6c4" },
                                    }}
                                >
                                    Sign Up
                                </Button>
                            </NavLink>
                        )}
                    </ListItem>

                    <ListItem sx={{ justifyContent: "center" }}>
                        {isAuthenticated ? (
                            <NavLink style={{ textDecoration: "none", width: "80%" }} onClick={() => setIsOpen(false)}>
                                <Button
                                    onClick={logout}
                                    fullWidth
                                    sx={{
                                        color: "white",
                                        bgcolor: "black",
                                        fontWeight: "bold",
                                        borderRadius: "50px",
                                        ":hover": { bgcolor: "" },
                                    }}
                                >
                                    Logout
                                </Button>
                            </NavLink>
                        ) : (
                            <NavLink to="/login" style={{ textDecoration: "none", width: "80%" }}>
                                <Button
                                    fullWidth
                                    sx={{
                                        bgcolor: "black",
                                        color: "white",
                                        fontWeight: "bold",
                                        borderRadius: "50px",
                                        ":hover": { bgcolor: "#333" },
                                    }}
                                >
                                    Login
                                </Button>
                            </NavLink>
                        )}
                    </ListItem>

                </List>
            </Drawer>
        </ThemeProvider >
    );
}
