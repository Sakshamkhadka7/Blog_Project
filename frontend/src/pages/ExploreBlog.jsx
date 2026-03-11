import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaCommentAlt, FaEdit } from "react-icons/fa";
import { BiSolidLike } from "react-icons/bi";
import { GiClick } from "react-icons/gi";
import { AiFillDelete } from "react-icons/ai";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ExploreBlog = () => {
  const [blogs, setBlogs] = useState([]);
  const [comment, setComment] = useState({});
  const navigate = useNavigate();

  // Fetch blogs from backend
  const getBlog = async () => {
    let res = await fetch("http://localhost:9000/api/blog/displayBlog", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });

    if (res.ok) {
      res = await res.json();
      setBlogs(res.blog);
    }
  };

  useEffect(() => {
    getBlog();
  }, []);

  const handleCommentChange = (blogId, value) => {
    setComment({ ...comment, [blogId]: value });
  };

  const submitComment = async (id) => {
    try {
      const commenText = comment[id];
      let res = await fetch("http://localhost:9000/api/comment/commentPost", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: commenText, post: id }),
        credentials: "include",
      });

      if (res.ok) {
        res = await res.json();
        setComment({ ...comment, [id]: "" });
        toast.success("Comment added successfully");
        getBlog();
      }
    } catch (error) {
      console.log("Error in submitting comment:", error);
      toast.error("Failed to add comment");
    }
  };

  const deleteComment = async (id) => {
    try {
      let res = await fetch(
        `http://localhost:9000/api/comment/deleteComment/${id}`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        },
      );

      if (res.ok) {
        toast.success("Comment deleted successfully");
        getBlog();
      }
    } catch (error) {
      console.log("Error in deleting comment:", error);
      toast.error("Failed to delete comment");
    }
  };

  return (
    <div className=" min-h-screen">
      <ToastContainer position="top-right" autoClose={3000} />
      <h1 className="text-4xl text-center font-bold mt-10">Explore Our Blog</h1>
      
      {blogs.length > 0 ? (
        <div className="flex  flex-col items-center gap-8 mt-20">
          {blogs.map((blog) => (
            <div
              key={blog._id}
              className=" w-full rounded-xl shadow-lg p-5 flex flex-col gap-4"
            >
             
              <div className="text-3xl font-medium font-serif text-center">
                Title : {blog.title}
              </div>

            
              {blog.image && (
                <img
                  src={`http://localhost:9000/image/${blog.image}`}
                  alt={blog.title}
                  className="object-cover  w-130 m-auto h-full  rounded"
                />
              )}

              <div className="text-gray-700">{blog.content}</div>

              
              <div className="flex justify-between items-center text-sm text-gray-600">
                <span>Status: {blog.status}</span>
                <span className="text-blue-500">Slug: {blog.slug}</span>
              </div>

              
              <div className="flex items-center gap-4 mt-2">
                <BiSolidLike
                  size={22}
                  className="cursor-pointer hover:text-blue-400"
                />
                <FaCommentAlt
                  size={22}
                  className="cursor-pointer hover:text-blue-400"
                />
              </div>

            
              <div className="flex items-center gap-2 mt-3">
                <input
                  type="text"
                  placeholder="Write a comment..."
                  className="flex-1 border p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                  value={comment[blog._id] || ""}
                  onChange={(e) =>
                    handleCommentChange(blog._id, e.target.value)
                  }
                />
                <GiClick
                  size={27}
                  className="cursor-pointer hover:text-blue-400"
                  onClick={() => submitComment(blog._id)}
                />
              </div>

              
              <div className="mt-4">
                <h1 className="font-semibold border-b pb-1 mb-3">Comments</h1>
                {blog.comments && blog.comments.length > 0 ? (
                  <div className="flex flex-col gap-2">
                    {blog.comments.map((com) => (
                      <div
                        key={com._id}
                        className="flex justify-between items-center bg-gray-50 p-2 rounded"
                      >
                        <span>{com.content}</span>
                        <div className="flex gap-2">
                          <FaEdit
                            size={18}
                            className="cursor-pointer hover:text-blue-400"
                            onClick={() =>
                              navigate("/editComment", { state: com })
                            }
                          />
                          <AiFillDelete
                            size={18}
                            className="cursor-pointer hover:text-red-600"
                            onClick={() => deleteComment(com._id)}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-gray-500">No comments yet</div>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-500">No Blog Found</div>
      )}
    </div>
  );
};

export default ExploreBlog;
