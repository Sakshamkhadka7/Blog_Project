import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import.meta.env.VITE_API_URL

const UploadBlog = () => {
  const navigate = useNavigate();
  const [image, setImage] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    content: "",
    status: "draft",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    let blogData = new FormData();
    blogData.append("title", formData.title);
    blogData.append("slug", formData.slug);
    blogData.append("content", formData.content);
    blogData.append("image", image);
    console.log(blogData);
    // API call here
    try {
      let res = await fetch(`${import.meta.env.VITE_API_URL}/api/blog/createBlog`, {
        method: "POST",
        body: blogData,
        credentials: "include",
      });

      if (res.ok) {
        res = await res.json();
        console.log(res);
        toast.success("Blog is Uploaded Successfully");
        setFormData({
          title: "",
          slug: "",
          content: "",
          status: "draft",
          image: null,
        });
        navigate("/home");
      }
    } catch (error) {
      console.log("Error happened while uploading blog", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-6">
      <div className="w-full max-w-3xl bg-white shadow-xl rounded-2xl p-8">
        <ToastContainer position="top-right" autoClose={3000} />
        <h2 className="text-3xl font-bold mb-6 text-center">Create New Blog</h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {/* Title */}
          <div className="flex flex-col gap-2">
            <label className="font-semibold">Blog Title</label>
            <input
              type="text"
              name="title"
              placeholder="Enter blog title"
              value={formData.title}
              onChange={handleChange}
              className="border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Slug */}
          <div className="flex flex-col gap-2">
            <label className="font-semibold">Slug</label>
            <input
              type="text"
              name="slug"
              placeholder="example-blog-title"
              value={formData.slug}
              onChange={handleChange}
              className="border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Image URL */}
          <div className="flex flex-col gap-2">
            <label className="font-semibold">Image</label>
            <input
              type="file"
              name="image"
              placeholder="Paste image link"
              onChange={(e) => {
                setImage(e.target.files[0]);
              }}
              className="border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Status */}
          <div className="flex flex-col gap-2">
            <label className="font-semibold">Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>
          </div>

          {/* Content */}
          <div className="flex flex-col gap-2">
            <label className="font-semibold">Content</label>
            <textarea
              name="content"
              rows="6"
              placeholder="Write your blog content..."
              value={formData.content}
              onChange={handleChange}
              className="border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            ></textarea>
          </div>

          {/* Button */}
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition"
          >
            Publish Blog
          </button>
        </form>
      </div>
    </div>
  );
};

export default UploadBlog;
