import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaCommentAlt } from "react-icons/fa";
import { BiSolidLike } from "react-icons/bi";
import { GiClick } from "react-icons/gi";

const ExploreBlog = () => {
  const [blogs, setBlogs] = useState([]);
  const [commentBlog, setCommentBlog] = useState("");

  const [comment, setComment] = useState("");

  const navigate = useNavigate();

  const getBlog = async () => {
    let res = await fetch("http://localhost:9000/api/blog/displayBlog", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    if (res.ok) {
      res = await res.json();
      setBlogs(res.blog);
      console.log(blogs);
    }
  };

  useEffect(() => {
    getBlog();
  }, []);

  const submitComment = async (id) => {
    // e.preventDefault();
    try {
      let res = await fetch("http://localhost:9000/api/comment/commentPost", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content: comment, post: id }),
        credentials: "include",
      });

      if (res.ok) {
        res = await res.json();
        setCommentBlog(res.data);
        alert("Commented successfully");
      }
    } catch (error) {
      console.log("Error occured in a comment post of Explore Blog", error);
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-4xl text-center font-bold">Explore Our Blog</h1>
      <br />
      {blogs.length > 0 ? (
        <div className="flex flex-wrap justify-evenly gap-5 items-center p-5">
          {blogs.map((blog) => {
            return (
              <div
                key={blog._id}
                className="shadow-2xl p-5 rounded-xl flex flex-col justify-center items-center gap-2"
              >
                <div className="text-xl font-bold font-serif p-5">
                  <h1>Title : {blog.title}</h1>
                </div>

                <div className="w-80">
                  <img
                    src={`http://localhost:9000/image/${blog?.image}`}
                    alt={blog.image}
                  />
                </div>

                <div className="font-semibold text-gray-700 p-4 flex justify-center items-center gap-4">
                  <h1 className="text-xl">Content : {blog.content}</h1>
                  {/* <h1 className="text-blue-400">Link:{blog.slug}</h1> */}
                  <h1 className="font-bold text-black">Status:{blog.status}</h1>
                </div>

                <div className="flex justify-center gap-24 items-center">
                  <BiSolidLike size={32} />

                  <h1 className="font-medium text-black text-blue-400">
                    Slug : {blog.slug}
                  </h1>
                  {
                    console.log(commentBlog.content)
                  }
                </div>

                <div className="flex justify-center items-center gap-4 p-5">
                  <FaCommentAlt size={24} />
                  <input
                    type="text"
                    placeholder="Comment Here for post"
                    className="border p-1 rounded-2xl"
                    onChange={(e) => {
                      setComment(e.target.value);
                    }}
                  />
                  <GiClick
                    onClick={() => {
                      submitComment(blog._id);
                    }}
                    size={27}
                    className="hover:text-blue-400 hover:cursor-pointer"
                  />
                </div>

                <div>
                  <h1 className="font-light">{commentBlog.data}</h1>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div>No Blog Found</div>
      )}
    </div>
  );
};

export default ExploreBlog;
