import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import About from "../pages/About";
import Learn from "../pages/Learn";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Comment from "../pages/Comment";
import Profile from "../pages/Profile";
import Resources from "../pages/Resources";
import UploadBlog from "../pages/UploadBlog";
import ExploreBlog from "../pages/ExploreBlog";

const AppRoute = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/learn" element={<Learn />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/comment" element={<Comment />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/upload" element={<UploadBlog />} />
        <Route path="/explore" element={<ExploreBlog />} />
      </Routes>
    </div>
  );
};

export default AppRoute;
