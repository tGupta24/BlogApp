import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { AppBar, Toolbar, IconButton, Drawer, List, ListItem, Button, Typography, Box } from "@mui/material";
import { Menu as MenuIcon, Close as CloseIcon } from "@mui/icons-material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

// Custom Breakpoints
const theme = createTheme({
    breakpoints: {
        values: {
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

    return (
        <ThemeProvider theme={theme}>
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

                    {/* Middle Links (Hide on Medium Screens) */}
                    <List sx={{
                        display: { xs: "none", sm: "none", md: "none", lg: "flex" },
                        gap: 1,
                        flexGrow: 1, // Allows the list to take up space before buttons
                        justifyContent: "center" // Center align links
                    }}>
                        {["Home", "Blogs", "Creators", "About", "Contact"].map((text) => (
                            <NavLink key={text} to={`/${text.toLowerCase()}`} style={{ textDecoration: "none" }}>
                                <Button sx={{ color: "black", ":hover": { bgcolor: "#e5e7eb" }, textTransform: "none", fontWeight: "bold", fontSize: "16px" }}>{text}</Button>
                            </NavLink>
                        ))}
                    </List>

                    <Box sx={{ display: "flex" }}>
                        {/* Right-Side Buttons (Move to Right when Middle Links are Hidden) */}
                        <List sx={{
                            display: { xs: "none", md: "flex" },
                            gap: 2,
                            flexGrow: { xs: 1, md: 0 }, // Make it take space when links are hidden
                            justifyContent: { xs: "center", md: "flex-end" } // Center on small, right on larger screens
                        }}>
                            <NavLink to="/register" style={{ textDecoration: "none" }}>
                                <Button sx={{ text: "white", ":hover": { bgcolor: "#9ca3af" } }}>Sign In</Button>
                            </NavLink>
                            <NavLink to="/login" style={{ textDecoration: "none" }}>
                                <Button sx={{ bgcolor: "black", color: "white", borderRadius: "50px", ":hover": { bgcolor: "black" }, px: "15px" }}>Login</Button>
                            </NavLink>
                        </List>

                        {/* Hamburger Icon (Appears on Small Screens) */}
                        <IconButton sx={{ display: { sm: "flex", md: "flex", lg: "none" } }} onClick={() => setIsOpen(true)}>
                            <MenuIcon fontSize="large" />
                        </IconButton>
                    </Box>
                </Toolbar>
            </AppBar>

            {/* Sidebar Drawer (Opens from Right) */}
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
                        <NavLink to="/register" style={{ textDecoration: "none", width: "80%" }} onClick={() => setIsOpen(false)}>
                            <Button fullWidth sx={{ bgcolor: "#9ca3af", borderRadius: "50px", color: "black", ":hover": { bgcolor: "#9ca3af" } }}>Sign In</Button>
                        </NavLink>
                    </ListItem>
                    <ListItem sx={{ justifyContent: "center" }}>
                        <NavLink to="/login" style={{ textDecoration: "none", width: "80%" }} onClick={() => setIsOpen(false)}>
                            <Button fullWidth sx={{ bgcolor: "black", color: "white", borderRadius: "50px", ":hover": { bgcolor: "black" }, px: "15px" }}>Login</Button>
                        </NavLink>
                    </ListItem>
                </List>
            </Drawer>
        </ThemeProvider >
    );
}
