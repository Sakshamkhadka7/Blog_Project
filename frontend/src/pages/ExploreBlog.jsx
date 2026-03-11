import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaCommentAlt } from "react-icons/fa";
import { BiSolidLike } from "react-icons/bi";
import { GiClick } from "react-icons/gi";
import { FaEdit } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";

const ExploreBlog = () => {
  const [blogs, setBlogs] = useState([]);
  //   const [commentBlog, setCommentBlog] = useState("");

  const [comment, setComment] = useState({});

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
      console.log(res.blog);
      setBlogs(res.blog);
      // console.log(blogs);
    }
  };

  useEffect(() => {
    getBlog();
  }, []);

  const handleCommentChange = (blogId, value) => {
    setComment({
      ...comment,
      [blogId]: value,
    });
  };

  const submitComment = async (id) => {
    // e.preventDefault();
    try {
      const commenText = comment[id];
      let res = await fetch("http://localhost:9000/api/comment/commentPost", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content: commenText, post: id }),
        credentials: "include",
      });

      if (res.ok) {
        res = await res.json();
        setComment({
          ...comment,
          [id]: " ",
        });
        alert("Commented successfully");
        getBlog();
      }
    } catch (error) {
      console.log("Error occured in a comment post of Explore Blog", error);
    }
  };

  const deleteComment = async (id) => {
    let res = await fetch(
      `http://localhost:9000/api/comment/deleteComment/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      },
    );

    if (res.ok) {
      alert("Comment has been deleted");
      getBlog();
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-4xl text-center font-bold">Explore Our Blog</h1>
      <br />
      {blogs.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-5">
          {blogs.map((blog) => {
            return (
              <div
                key={blog._id}
                className="shadow-2xl p-5 rounded-xl flex flex-col justify-center items-start gap-2"
              >
                <div className="text-xl font-bold font-serif p-5">
                  <h1>Title : {blog.title}</h1>
                </div>

                <div className="w-80">
                  <img
                    height={300}
                    width={300}
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
                </div>

                <div className="flex justify-center items-center gap-4 p-5">
                  <FaCommentAlt size={24} />
                  <input
                    type="text"
                    placeholder="Comment Here for post"
                    className="border p-1 rounded-2xl"
                    value={comment[blog._id] || ""}
                    onChange={(e) => {
                      handleCommentChange(blog._id, e.target.value);
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

                <div className="mt-3 w-full">
                  <h1 className="mb-2 font-semibold border-b pb-1">Comments</h1>

                  {blog.comments && blog.comments.length > 0 ? (
                    <div>
                      {blog.comments.map((com) => {
                        return (
                          <div
                            key={com._id}
                            className="text-sm bg-gray-100 p-2 rounded mb-6 flex justify-between items-center"
                          >
                            <div>{com.content}</div>

                            <div className="flex gap-2">
                              <FaEdit
                                size={22}
                                className="hover:text-blue-400"
                                onClick={() => {
                                  navigate("/editComment", {
                                    state: com,
                                  });
                                }}
                              />
                              <AiFillDelete
                                size={22}
                                className="hover:text-red-600"
                                onClick={() => deleteComment(com._id)}
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div>No Comment Yet</div>
                  )}
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
