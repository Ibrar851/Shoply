import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function AdminRoute({ children }) {
  const { user } = useAuth();

  if (!user || user.role !== "admin") {
    // Agar login nahi ya admin nahi hai → redirect to admin login
    return <Navigate to="/admin/login" />;
  }

  return children;
}
