import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext"; 

const ProtectedRoute = ({ children }) => {
  
  const { user, loading } = useContext(AuthContext);
  
  console.log("ProtectedRoute Status -> User:", user, "Loading:", loading);
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-white">
        <div className="w-10 h-10 border-4 border-rose-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!user) {
    console.log("User not authenticated, redirecting to signin");
    return <Navigate to="/signin" />;
  }


  return children;
};

export default ProtectedRoute;