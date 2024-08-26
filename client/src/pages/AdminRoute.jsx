import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../store/Auth';
import AdminDashboard from './Admin/AdminDashboard';

const AdminRoute = () => {
  const { user, isLoggedIn } = useAuth();

  // Check if the user is logged in and is an admin
  if (!isLoggedIn || !user?.isAdmin) {
    return <Navigate to="/" replace />;
  }

  // If the user is an admin, render the AdminDashboard component
  return <AdminDashboard />;
};

export default AdminRoute;
