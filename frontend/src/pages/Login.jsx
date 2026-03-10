import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserProvider";

const Login = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginUser = async (e) => {
    e.preventDefault();

    console.log(email);
    console.log(password);

    try {
      let res = await fetch("http://localhost:9000/api/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });

      if (res.ok) {
        res = await res.json();
        console.log(res.user);
        setUser(res.user);
        navigate("/learn");
        alert("User Login succssfully")
      }
    } catch (error) {
      console.log("Error occured in a register", error);
    }
  };

  return (
    <div className="p-2 shadow-2xl w-120 m-auto rounded-2xl flex justify-center items-center">
      <form
        onSubmit={(e) => {
          loginUser(e);
        }}
        className="flex flex-col gap-4 p-2 text-gray-800"
      >
        <h2 className="text-3xl font-bold mb-6 ">Login</h2>

        <div className="flex flex-col gap-3">
          <label className="font-medium text-xl">Email:</label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
            type="email"
            placeholder="Enter Your Email"
          />
        </div>

        <div className="flex flex-col gap-3">
          <label className="font-medium text-xl">Password:</label>
          <input
            onChange={(e) => setPassword(e.target.value)}
            className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
            type="password"
            placeholder="Enter Your Password"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-600 transition duration-200"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
