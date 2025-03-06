import { Card, CardContent } from "@mui/material";
import { Avatar } from "@mui/material";
import { useAuth } from "../contextApi/AuthProvider";

export default function MyProfile() {
    const { profile } = useAuth();
    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <Card className="relative w-full max-w-lg p-6 shadow-lg rounded-2xl bg-white overflow-hidden">
                {/* Rectangle Section */}
                <div className="bg-blue-500 h-32 w-full absolute top-0 left-0 rounded-t-2xl"></div>

                {/* Circular Image Overlapping the Rectangle */}
                <div className="relative flex justify-center mt-20">
                    <Avatar
                        src={profile.avatar}
                        alt="Profile Picture"
                        sx={{ width: 150, height: 150, border: "4px solid white", boxShadow: 2 }}
                    />
                </div>

                {/* User Details */}
                <CardContent className="mt-6 text-center">
                    <h2 className="text-2xl font-bold">{profile.name}</h2>
                    <p className="text-gray-500">Administrator</p>
                    <div className="mt-4 space-y-3">
                        <div className="flex items-center justify-center gap-3">
                            <span className="text-gray-700">{profile.email}</span>
                        </div>
                        <div className="flex items-center justify-center gap-3">
                            <span className="text-gray-700">{profile.phoneNumber}</span>
                        </div>
                        <div className="flex items-center justify-center gap-3">
                            <span className="text-gray-700">{profile.role.toUpperCase()}</span>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
