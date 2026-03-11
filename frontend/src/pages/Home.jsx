import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { BiSolidLike } from "react-icons/bi";
import { FaCommentAlt } from "react-icons/fa";

const Home = () => {
  const [blogs, setBlogs] = useState([]);

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

  return (
    <>
      <div className="flex flex-col gap-10 justify-center items-center p-1 mt-15">
        {console.log(blogs)}
        <div className="flex border-2 p-2 w-70 font-medium gap-5 rounded-md">
          <div>Logo</div>
          <h1>Made by Saksham Khadka</h1>
        </div>

        <div>
          <h1 className="text-6xl font-medium">
            Discover <span className="text-blue-600">Blog</span> Websites <br />{" "}
            Built By Saksham Khadka
          </h1>
        </div>

        <div>
          <h1 className="text-xl text-gray-800 font-semibold">
            Find a best blog here to learn and create a blog post here and
            contribute to blog society
          </h1>
        </div>

        <div
          className="border px-12 py-2 rounded-l bg-blue-500 text-xl font-mono text-white hover:cursor-pointer"
          onClick={() => {
            navigate("/upload");
          }}
        >
          <div className="flex items-center justify-center gap-4">
            <div>Upload a blog to website</div>
            <div>
              <FaArrowRight size={26} className="hover:cursor-pointer" />
            </div>
          </div>
        </div>
      </div>

      <div className="p-8">
        <h1 className="text-4xl text-center font-extrabold">
          Best Blog of our websites
        </h1>
        <br />
        {blogs.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 p-3 gap-7">
            {blogs.map((blog) => {
              return (
                <div key={blog._id} className="shadow-2xl p-5 rounded-xl">
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
                    <h1 className="text-sm">Content : {blog.content}</h1>
                    {/* <h1 className="text-blue-400">Link:{blog.slug}</h1> */}
                   
                  </div>

                  <div className="flex justify-center gap-7 items-center">
                    <BiSolidLike size={32} />
                    <FaCommentAlt size={24} />
                    <h1 className="font-medium text-black text-blue-400">
                      Slug : {blog.slug}
                    </h1>
                  </div>

                  <div className="">
                     <h1 className="font-bold text-black text-center mt-8">
                      Status : {blog.status}
                    </h1>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div>No Blog Found</div>
        )}
      </div>
    </>
  );
};

export default Home;
