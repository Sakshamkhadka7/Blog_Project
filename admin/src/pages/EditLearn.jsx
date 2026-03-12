import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const EditLearn = () => {
    const navigate=useNavigate();
  const { state } = useLocation();
  const id = state._id;
  console.log(state._id);

  const [form, setForm] = useState({
    title: state.learn,
    descriptions: state.descriptions,
    link: state.link,
  });

  const submitForm = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const updateLearn = async (e) => {
    e.preventDefault();
    console.log(form);

    try {
      let res = await fetch(
        `http://localhost:9000/api/learn/updateLearn/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            learn: form.title,
            descriptions: form.descriptions,
            link: form.link,
          }),
          credentials: "include",
        },
      );

      if (res.ok) {
        // res = await res.json();
        alert("Learn updated");
        navigate("/admin/learn");
      }
    } catch (error) {
      console.log("Error occured in uploading Learn frontend", error);
    }
  };
  return (
    <div className="p-5 m-auto shadow-2xl ">
      <form className="flex flex-col gap-4" onSubmit={(e) => updateLearn(e)}>
        <div className="flex flex-col gap-2 font-bold">
          <label className="text-xl">Learn Title</label>
          <input
            onChange={submitForm}
            className="outline-none w-full border p-3 rounded-2xl"
            type="text"
            name="title"
            value={form.title}
            placeholder="Enter Learn title"
          />
        </div>

        <div className="flex flex-col gap-2 font-bold">
          <label className="text-xl">Descriptions</label>
          <input
            onChange={submitForm}
            className="outline-none w-full border p-3 rounded-2xl"
            type="text"
            name="descriptions"
            value={form.descriptions}
            placeholder="Enter product descriptions"
          />
        </div>

        <div className="flex flex-col gap-2 font-bold">
          <label className="text-xl">Learn Link</label>
          <input
            onChange={submitForm}
            className="outline-none w-full border p-3 rounded-2xl"
            type="text"
            name="link"
            value={form.link}
            placeholder="Enter Learn Link"
          />
        </div>

        <div className="flex flex-col gap-2">
          <button
            type="submit"
            className="border p-4 rounded-xl bg-green-600 text-xl font-bold hover:bg-green-300"
          >
            Update Learn
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditLearn;
