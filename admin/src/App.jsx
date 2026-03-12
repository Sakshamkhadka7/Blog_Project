import React, { useContext } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { AdminContext } from "./context/AdminAuth";
import Login from "./pages/Login";
import ProtectedAdmin from "./pages/ProtectedAdmin";
import AdminLayout from "./pages/AdminLayout";
import Dashboard from "./pages/Dashboard";
import Learn from "./pages/Learn";
import User from "./pages/User";
import Product from "./pages/Product";
import EditProduct from "./pages/EditProduct";
import EditLearn from "./pages/EditLearn";

const App = () => {
  const { admin, loading, error } = useContext(AdminContext);

  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={
            loading ? (
              <h1>Loading......</h1>
            ) : admin?.role == "admin" ? (
              <Navigate to="/admin" replace />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        <Route path="/login" element={<Login />} />
        <Route path="/editProduct" element={<EditProduct />} />
        <Route path="/editLearn" element={<EditLearn/>} />

        <Route
          path="/admin"
          element={
            <ProtectedAdmin>
              <AdminLayout />
            </ProtectedAdmin>
          }
        >
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="product" element={<Product />} />
          <Route path="learn" element={<Learn />} />
          <Route path="user" element={<User />} />
          
        </Route>
      </Routes>
    </div>
  );
};

export default App;
