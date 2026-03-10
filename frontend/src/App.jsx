import React from "react";
import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Learn from "./pages/Learn";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import About from "./pages/About";
import Resources from "./pages/Resources";
import AppRoute from "./components/AppRoute";

const App = () => {
  return (
    <div>
      <Navbar />

      <div className="min-h-400 mt-3">
        <AppRoute />
      </div>
    </div>
  );
};

export default App;
