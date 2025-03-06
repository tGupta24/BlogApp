import { Navigate } from "react-router-dom";
import { useAuth } from "../contextApi/AuthProvider";

export default function ProtectedRoute({ children }) {
    const { isAdmin } = useAuth();

    if (!isAdmin) {
        return <Navigate to="/" />;
    }

    return children;
}
