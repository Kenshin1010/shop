import React from 'react';
import { Navigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

interface PrivateRouteProps {
  element: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ element }) => {
  const { isAuthenticated } = useAuth();

  // Return a ReactElement
  return isAuthenticated ? (
    <>{element}</> // Wrapping element in a fragment
  ) : (
    <Navigate to="/login" replace />
  );
};

export default PrivateRoute;
