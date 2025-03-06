import React, { useState } from "react";
import Sidebar from "../dashboard/Sidebar";
import { Outlet } from "react-router-dom";
import { CiMenuBurger } from "react-icons/ci";
import { IconButton } from "@mui/material";

export default function Dashboard() {
    const [open, setOpen] = useState(true);

    return (
        <>
            {/* Sidebar Toggle Button */}
            <IconButton
                className="fixed top-4 left-4 h-15 w-10 z-50 lg:hidden"
                onClick={() => setOpen(true)}
            >
                <CiMenuBurger className="text-3xl text-gray-700 hover:text-black transition-all" />
            </IconButton>

            {/* Sidebar Component */}
            <Sidebar open={open} setOpen={setOpen} />

            {/* Main Content */}
            <div className="flex-1 p-6">
                <Outlet />
            </div>
        </>
    );
}
