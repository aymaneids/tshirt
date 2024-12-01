import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

interface PrivateRouteProps {
  children: React.ReactNode;
  admin?: boolean;
}

export function PrivateRoute({ children, admin = false }: PrivateRouteProps) {
  const { user, isAdmin, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/" />;
  }

  if (admin && !isAdmin) {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
}