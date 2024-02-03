import React from "react";
import { Navigate, useLocation } from "react-router-dom";

interface UserVerificationProps {
  children: React.ReactNode;
}

const UserVerification: React.FC<UserVerificationProps> = ({ children }) => {
  const location = useLocation();

  const userToken = localStorage.getItem("userToken");

  if (userToken) {
    // If the userToken exists, allow access to /* routes except /login
    if (location.pathname !== "/login") {
      return <>{children}</>;
    } else {
      // Redirect the admin to the dashboard if they try to access /login while authenticated.
      return <Navigate to="/" replace />;
    }
  } else {
    // If no adminToken, allow access only to /login
    if (location.pathname === "/login" ) {
      return <>{children}</>;
    } else {
      // Redirect to /login if the user tries to access other routes without authentication.
      return <Navigate to="/login" replace />;
    }
  }
};

export default UserVerification;
