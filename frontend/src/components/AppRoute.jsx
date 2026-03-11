import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
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
import EditComment from "../pages/EditComment";
import { useContext } from "react";
import { UserContext } from "../context/UserProvider";

const AppRoute = () => {
  const { user, isLoading } = useContext(UserContext);

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
        <Route
          path="/upload"
          element={
            isLoading ? (
              <h1>Loading ......</h1>
            ) : user ? (
              <UploadBlog />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route path="/explore" element={<ExploreBlog />} />
        <Route path="/editComment" element={<EditComment />} />
      </Routes>
    </div>
  );
};

export default AppRoute;
