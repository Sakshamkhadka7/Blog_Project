import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [profileImage, setProfileImage] = useState();

  const registerUser = async (e) => {
    e.preventDefault();

    console.log(name);
    console.log(email);
    console.log(password);
    console.log(profileImage);

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("profileImage",profileImage);
    try {
      let res = await fetch("http://localhost:9000/api/user/register", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        res = await res.json();
        console.log(res.user);
        navigate("/login");
      }
    } catch (error) {
      console.log("Error occured in a register", error);
    }
  };

  return (
    <div className="p-2 shadow-2xl w-120 m-auto rounded-2xl flex justify-center items-center">
      <form
        onSubmit={(e) => {
          registerUser(e);
        }}
        className="flex flex-col gap-4 p-2 text-gray-800"
      >
        <h2 className="text-3xl font-bold mb-6 ">Register Account</h2>

        <div className="flex flex-col gap-3">
          <label className="font-medium text-xl">Name:</label>
          <input
            onChange={(e) => setName(e.target.value)}
            className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
            type="text"
            placeholder="Enter your name"
          />
        </div>

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

        <div className="flex flex-col gap-3">
          <label className="font-medium text-xl">Profile Image:</label>
          <input
            onChange={(e) => setProfileImage(e.target.files[0])}
            className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 file:bg-blue-500 file:text-white file:px-4 file:py-1 file:border-none file:rounded-md"
            type="file"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-600 transition duration-200"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
