import axios from "axios";
import React, { use, useEffect, useState } from "react"
import { useAuth } from "../contextApi/AuthProvider";
import PopularCreatorCard from "../home/PopularCreater/PopularCreaterCard";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export default function PopularCreater() {


    const { isAuthenticated, setIsAuthenticated, admins } = useAuth();

    return (

        !isAuthenticated ? (
            <div>
                <div className="h-screen" style={{ fontSize: "18px", fontWeight: "bold", color: "#333", textAlign: "center", background: "#f8f9fa", padding: "10px", borderRadius: "8px", boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)" }}>
                    🔐 Login to explore more content!
                </div>


            </div>
        ) : (

            <div className="p-4 m-auto">
                <h2 className="text-xl font-semibold mb-4 ml-9">Popular Creaters</h2 >
                <div className="mt-6 ">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-2 m-auto">
                        {admins.length > 0 ? (
                            admins.map((admin) =>
                                <PopularCreatorCard key={admin._id} authorImg={admin.avatar} authorName={admin.name} />
                            )
                        ) : (
                            <p style={{ fontSize: "18px", fontWeight: "bold", color: "#333", textAlign: "center", background: "#f8f9fa", padding: "10px", borderRadius: "8px", boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)" }}>
                                No admins right Now
                            </p>

                        )}
                    </div>
                </div>
            </div >
        )
    );

}