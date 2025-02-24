import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Popup = () => {
    return (
        <div>
            <ToastContainer position="top-right" autoClose={3000} /> {/* Global Toast */}
        </div>
    );
};

export { Popup };