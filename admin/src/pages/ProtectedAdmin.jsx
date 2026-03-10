import React, { useContext } from "react";
import { AdminContext } from "../context/AdminAuth";
import { Navigate } from "react-router-dom";

function ProtectedAdmin({ children }) {
  const { admin, loading } = useContext(AdminContext);

  if (loading) {
    return <h1>Loading ........</h1>;
  }

  if (!admin || admin.role !== "admin") {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedAdmin;
