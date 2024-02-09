import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute: React.FC = ({ children }) => {
    const adminData = JSON.parse(localStorage.getItem("admin") || false);
    const isLogged = adminData.isLogged;
    const location = useLocation();
    
    if (!isLogged) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }
    
    return <>{children}</>; // Render children using curly braces
};

export default ProtectedRoute;
