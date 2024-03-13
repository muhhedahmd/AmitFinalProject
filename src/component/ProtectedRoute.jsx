import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './Contexts/Authenticated';
import { PATHS } from './PATHS';

const ProtectedRoute = () => {
  const { isAuthenticated } = useAuth();


  if (isAuthenticated) {
    return <Outlet />;
  } else {
    // Redirect to the login page if not authenticated
    return <Navigate to={PATHS.Login} />;
  }
};

export default ProtectedRoute;
