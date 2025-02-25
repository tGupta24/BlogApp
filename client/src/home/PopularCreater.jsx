import axios from "axios";
import React, { use, useEffect, useState } from "react"
import PopularCreaterCard from "./PopularCreater/PopularCreaterCard";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export default function PopularCreater() {
    const [admins, setAdmins] = useState([]);

    useEffect(() => {
        const fetchAdmins = async () => {
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
    }, []);
    return (
        <div className="p-4 m-auto">
            <h2 className="text-xl font-semibold mb-4 ml-9">Popular Creaters</h2>
            <div className="mt-6 ">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-2 m-auto">
                    {admins.length > 0 ? (
                        admins.slice(0, 4).map((admin) =>
                            <PopularCreaterCard key={admin._id} authorImg={admin.avatar} authorName={admin.name} />
                        )
                    ) : (
                        <p>"Login to see more...."</p>
                    )}
                </div>
            </div>
        </div>
    );

}