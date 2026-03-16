import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaCommentAlt } from "react-icons/fa";
import { GiClick } from "react-icons/gi";
import { useState } from "react";

const EditComment = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  console.log(state);
  const id = state._id;
  const [comUpdate, setComUpdate] = useState(state.content);

  const updateComment = async () => {
    let res = await fetch(
      `${import.meta.env.VITE_API_URL}/api/comment/updateComment/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content: comUpdate }),
        credentials: "include",
      },
    );

    if (res.ok) {
      res = await res.json();
      alert("Comment is updated");
      navigate("/explore");
    }
  };

  return (
    <div className="flex justify-center items-center gap-4 p-5">
      <FaCommentAlt size={24} />
      <input
        type="text"
        placeholder="Comment Here for post"
        className="border p-3 w-80 rounded-2xl"
        value={comUpdate}
        onChange={(e) => {
          setComUpdate(e.target.value);
        }}
      />
      <div className="border px-18 py-3 rounded bg-blue-400 text-white hover:bg-blue-800">
        <button onClick={() => updateComment()}>Update</button>
      </div>
    </div>
  );
};

export default EditComment;
