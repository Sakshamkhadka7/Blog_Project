import React, { useState } from "react";
import { useContext } from "react";
import { CgProfile } from "react-icons/cg";
import { GiHamburgerMenu } from "react-icons/gi";
import { RxCross2 } from "react-icons/rx";
import { NavLink, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserProvider";
import { toast, ToastContainer } from "react-toastify";
const Navbar = () => {
  const [menu, setMenu] = useState(false);
  const { user, isLoading, setUser,error } = useContext(UserContext);
  console.log(user, isLoading, error);
  const navigate=useNavigate();

  const logout = async () => {
    let res = await fetch("http://localhost:9000/api/user/logout", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    if (res.ok) {
      toast.success("Logout successfully");
      setUser("");
      navigate("/login");
    }
  };

  return (
    <nav className="relative px-5 py-3 shadow-2xl bg-white">
      <div className="flex justify-between items-center">
        <div className="flex items-center justify-center gap-15">
          <h1 className="text-2xl font-bold text-blue-600 cursor-pointer">
            LeaBlog
          </h1>

          <div className="hidden md:flex gap-6 text-gray-700 font-medium">
            <div className="cursor-pointer hover:text-blue-300 transition">
              Product
            </div>

            <div className="cursor-pointer hover:text-blue-300 transition">
              <NavLink to="/learn"> Learn</NavLink>
            </div>

            <div className="cursor-pointer hover:text-blue-300 transition">
              <NavLink to="/resources">Resources</NavLink>
            </div>

            <div className="cursor-pointer hover:text-blue-300 transition">
              <NavLink to="/explore">Explore Blog</NavLink>
            </div>
          </div>
        </div>

        <div className="hidden   md:flex  items-center justify-center gap-5 text-gray-700 font-medium">
            <ToastContainer position="top-right" autoClose={3000} />
          <div className="hover:text-blue-300 transition cursor-pointer">
            <NavLink to="/home"> Home</NavLink>
          </div>
          <div className="hover:text-blue-300 transition cursor-pointer">
            <NavLink to="/about">About us</NavLink>
          </div>

          <div>
            <div className="relative group text-2xl">
              {error || isLoading || user ? (
                <div className="w-10 rounded-4xl p-1">
                  <img
                    src={`http://localhost:9000/image/${user?.profileImage}`}
                  />
                </div>
              ) : (
                <CgProfile
                  className="cursor-pointer w-36 text-gray-500 hover:text-blue-400"
                  size={40}
                />
              )}

              <div className="absolute hidden group-hover:block right-4 p-2 border border-cyan-700 rounded-2xl bg-blue-200">
                {user ? (
                  <>
                    <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer hover:text-blue-300 transition">
                      <NavLink to="/profile">Profile</NavLink>
                    </div>

                    <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer hover:text-blue-300 transition">
                      <button
                        onClick={() => {
                          logout();
                        }}
                      >
                        Logout
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer hover:text-blue-300 transition">
                      <NavLink to="/login"> Login</NavLink>
                    </div>
                    <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer hover:text-blue-300 transition">
                      <NavLink to="/register"> Register</NavLink>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Mobile responsive */}

        <div className="md:hidden">
          {menu ? (
            <RxCross2 onClick={() => setMenu(false)} />
          ) : (
            <GiHamburgerMenu onClick={() => setMenu(true)} />
          )}
        </div>
      </div>

      {menu && (
        <div className="md:hidden absolute right-1 w-40 bg-white shadow-lg border-spacing-0.5 rounded-2xl p-4 flex flex-col gap-4  text-gray-700 font-medium">
        
          <div className="px-2 py-1 hover:bg-gray-100 cursor-pointer hover:text-blue-300 transition">
            {" "}
            <NavLink to="/home"> Home</NavLink>
          </div>
          <div className="px-2 py-1 hover:bg-gray-100 cursor-pointer hover:text-blue-300 transition">
            <NavLink to="/about">About us</NavLink>
          </div>
          <div className="px-2 py-1 hover:bg-gray-100 cursor-pointer hover:text-blue-300 transition">
            <NavLink to="/login"> Login</NavLink>
          </div>
          <div className="px-2 py-1 hover:bg-gray-100 cursor-pointer hover:text-blue-300 transition">
            {" "}
            <NavLink to="/register"> Register</NavLink>
          </div>
          <div className="px-2 py-1 hover:bg-gray-100 cursor-pointer hover:text-blue-300 transition">
            {" "}
            <NavLink to="/profile"> Profile</NavLink>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
