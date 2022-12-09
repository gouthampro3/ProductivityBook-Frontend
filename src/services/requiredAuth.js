import React from 'react'
import useAuth from './useAuth'
import { Navigate } from 'react-router';

export default function RequireAuth({ children }) {
    const { getCurrentUser } = useAuth();  
    const userdata = getCurrentUser();
    return userdata.status === true
      ? children
      : <Navigate to="/login" replace/>;
  }