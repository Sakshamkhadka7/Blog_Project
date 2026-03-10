import React from "react";
import { NavLink, Outlet } from "react-router-dom";

const AdminLayout = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      <aside className="w-64 bg-white shadow-md">
        <div className="p-6 text-2xl font-bold border-b">Admin panel</div>

        <nav>
          <NavLink to="dashboard" className="block px-4 py-2 rounded-lg">
            Dashboard
          </NavLink>
          <NavLink to="product" className="block px-4 py-2 rounded-lg">
            Product
          </NavLink>
          <NavLink to="learn" className="block px-4 py-2 rounded-lg">
            Learn
          </NavLink>
          <NavLink to="user" className="block px-4 py-2 rounded-lg">
            User
          </NavLink>
        </nav>
      </aside>

      <div className="flex-1 flex flex-col">
        <header className="flex justify-between items-center bg-white shadow px-6 py-4">
          <h1 className="text-xl font-semibold text-gray-700">
            Admin Dashboard
          </h1>

          <button className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-700">
            Logout
          </button>
        </header>
        <main className="flex-1 p-6 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
