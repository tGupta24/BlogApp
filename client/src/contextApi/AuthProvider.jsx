import axios from "axios"
import React, { createContext, useContext, useEffect, useState } from "react";

const BASE_URL = import.meta.env.VITE_BASE_URL;

// step1  make a context
export const AuthContext = createContext();

//step 2 make a authprovier who provide all data to all children
export const AuthProvider = ({ children }) => {
    // Taking blogs using fetching
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const res = await axios.get(`${BASE_URL}/blog/getallBlogs`);

                setBlogs(res.data.data);
            } catch (error) {
                console.error("Error fetching blogs:", error);
            }
        };
        fetchBlogs();
    }, []);


    return (
        <AuthContext.Provider value={{ blogs }} >  {/* pass all blogs so that we can use them in chidren componets */}
            {children}
        </ AuthContext.Provider>
    )
}

// step3 make a custom hook to use the data
export const useAuth = () => useContext(AuthContext) //useAuth is a custom hook that we can use in any component to get the data from AuthContext