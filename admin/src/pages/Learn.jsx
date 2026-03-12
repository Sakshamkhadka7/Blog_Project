import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Learn = () => {
  const [form, setForm] = useState({
    title: "",
    descriptions: "",
    link: "",
  });
  const [learn, setLearn] = useState([]);

  const navigate = useNavigate();

  const submitForm = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const deleteProduct = async (id) => {
    try {
      let res = await fetch(
        `http://localhost:9000/api/learn/deleteLearn/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        },
      );

      if (res.ok) {
        alert("Learn successfully deleted");
        getLearn();
      }
    } catch (error) {
      console.log("Error occured in a learn frontend deleteproduct", error);
    }
  };

  const getLearn = async () => {
    try {
      let res = await fetch("http://localhost:9000/api/learn/displayLearn", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (res.ok) {
        res = await res.json();
        setLearn(res.learn);
      }
    } catch (error) {
      console.log("Error occured in getting Learn frontend", error);
    }
  };

  const uploadLearn = async (e) => {
    e.preventDefault();
    console.log(form);

    try {
      let res = await fetch("http://localhost:9000/api/learn/createLearn", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          learn: form.title,
          descriptions: form.descriptions,
          link: form.link,
        }),
        credentials: "include",
      });

      if (res.ok) {
        // res = await res.json();
        alert("Learn uploaded");
        getLearn();
      }
    } catch (error) {
      console.log("Error occured in uploading Learn frontend", error);
    }
  };

  useEffect(() => {
    getLearn();
  }, []);

  return (
    <>
      <div className="p-5 m-auto shadow-2xl ">
        <form className="flex flex-col gap-4" onSubmit={(e) => uploadLearn(e)}>
          <div className="flex flex-col gap-2 font-bold">
            <label className="text-xl">Learn Title</label>
            <input
              onChange={submitForm}
              className="outline-none w-full border p-3 rounded-2xl"
              type="text"
              name="title"
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
              placeholder="Enter Learn Link"
            />
          </div>

          <div className="flex flex-col gap-2">
            <button
              type="submit"
              className="border p-4 rounded-xl bg-green-600 text-xl font-bold hover:bg-green-300"
            >
              Submit Learn
            </button>
          </div>
        </form>
      </div>

      <div className="overflow-x-auto mt-5">
        <table className="min-w-full bg-white shadow-md rounded-xl overflow-hidden">
          <thead className="bg-gray-100">
            <tr className="">
              <th className="py-3 px-6 text-left text-gray-700 font-semibold">
                Id
              </th>
              <th className="py-3 px-6 text-left text-gray-700 font-semibold">
                Learn title
              </th>
              <th className="py-3 px-6 text-left text-gray-700 font-semibold">
                Descriptions
              </th>
              <th className="py-3 px-6 text-left text-gray-700 font-semibold">
                Link
              </th>
              <th className="py-3 px-6 text-left text-gray-700 font-semibold">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {learn.length > 0 ? (
              learn.map((pro, idx) => {
                return (
                  <tr key={idx} className="bg-gray-50">
                    <td className="py-3 px-6">{pro._id}</td>
                    <td className="py-3 px-6">{pro.learn}</td>
                    <td className="py-3 px-6">{pro.descriptions}</td>
                    <td className="py-3 px-6">{pro.link}</td>

                    <td className="py-3 px-6 flex gap-2">
                      <button
                        className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition"
                        onClick={() => {
                          navigate("/editLearn", {
                            state: pro,
                          });
                        }}
                      >
                        Edit
                      </button>

                      <button
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                        onClick={() => {
                          deleteProduct(pro._id);
                        }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr colSpan={6} className="text-center py-5 text-gray-500">
                <td>Product Not Found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Learn;
