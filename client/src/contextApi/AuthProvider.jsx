import { useStepContext } from "@mui/material";
import axios from "axios"
import React, { createContext, use, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie"

const BASE_URL = import.meta.env.VITE_BASE_URL;

// step1  make a context
export const AuthContext = createContext();

//step 2 make a authprovier who provide all data to all children
export const AuthProvider = ({ children }) => {
    // Taking blogs using fetching
    const [blogs, setBlogs] = useState([]);
    const [isAuthenicated, setIsAuthenticated] = useState(false);
    const [profile, setProfile] = useState(null)
    const [admins, setAdmins] = useState([]);


    useEffect(() => {
        const fetchProfile = async () => {

            try {
                const res = await axios.get(`${BASE_URL}/users/my-profile`,
                    { withCredentials: true }
                );
                setProfile(res.data.data);
                setIsAuthenticated(true);

            } catch (error) {
                console.error("Error fetching blogs:", error);
            }
        }
        fetchProfile();
        const fetchBlogs = async () => {
            try {
                const res = await axios.get(`${BASE_URL}/blog/getallBlogs`);

                setBlogs(res.data.data);
            } catch (error) {
                console.error("Error fetching blogs:", error);
            }
        };
        fetchBlogs();
        const fetchAdmins = async () => {
            if (!isAuthenicated) {
                setAdmins([])
                return;
            }
            try {
                const res = await axios.get(`${BASE_URL}/users/all-Admins`, {
                    withCredentials: true,      // using this we can verify our  token
                });
                console.log(res.data.data)
                setAdmins(res.data.data)

            } catch (error) {
                console.log(error.response?.data?.message)
                throw error
            }
        }
        fetchAdmins()
    }, [isAuthenicated]);

    const logout = async () => {
        try {
            await axios.post(`${BASE_URL}/users/logout`, {}, { withCredentials: true });
            setIsAuthenticated(false);  // Logout hone ke baad UI turant update hoga
            setProfile(null);
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };


    return (
        <AuthContext.Provider value={{ blogs, profile, isAuthenicated, setIsAuthenticated, logout, admins }} >  {/* pass all blogs so that we can use them in chidren componets */}
            {children}
        </ AuthContext.Provider>
    )
}

// step3 make a custom hook to use the data
export const useAuth = () => useContext(AuthContext) //useAuth is a custom hook that we can use in any component to get the data from AuthContext