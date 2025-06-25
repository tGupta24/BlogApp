import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

const BASE_URL = import.meta.env.VITE_BASE_URL;

// Step 1: Create Context
export const AuthContext = createContext();

// Step 2: AuthProvider
export const AuthProvider = ({ children }) => {
    const [blogs, setBlogs] = useState([]);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [profile, setProfile] = useState(null);
    const [admins, setAdmins] = useState([]);

    // 👉 Moved fetch functions out so you can reuse them
    const fetchProfile = async () => {
        try {
            const res = await axios.get(`${BASE_URL}/users/my-profile`, {
                withCredentials: true,
            });
            setProfile(res.data.data);
            if (res.data.data.role === "admin") setIsAdmin(true);
            setIsAuthenticated(true);
        } catch (error) {
            console.error("Error fetching profile:", error);
        }
    };

    const fetchBlogs = async () => {
        try {
            const res = await axios.get(`${BASE_URL}/blog/getallBlogs`);
            setBlogs(res.data.data);
        } catch (error) {
            console.error("Error fetching blogs:", error);
        }
    };

    const fetchAdmins = async () => {
        if (!isAuthenticated) {
            setAdmins([]);
            return;
        }
        try {
            const res = await axios.get(`${BASE_URL}/users/all-Admins`, {
                withCredentials: true,
            });
            setAdmins(res.data.data);
        } catch (error) {
            console.log(error.response?.data?.message);
        }
    };

    useEffect(() => {
        fetchProfile();
        fetchBlogs();
        fetchAdmins();
    }, [isAuthenticated]);

    const logout = async () => {
        try {
            await axios.post(`${BASE_URL}/users/logout`, {}, { withCredentials: true });
            setIsAuthenticated(false);
            setProfile(null);
            setIsAdmin(false);
            setAdmins([]);
            setBlogs([]);
            toast.success("Logged Out Successfully");
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    return (
        <AuthContext.Provider
            value={{
                blogs,
                profile,
                isAuthenticated,
                setIsAuthenticated,
                logout,
                admins,
                isAdmin,
                setIsAdmin,
                fetchBlogs,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

// Step 3: Custom hook
export const useAuth = () => useContext(AuthContext);
