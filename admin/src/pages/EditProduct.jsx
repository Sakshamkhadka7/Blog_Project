import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const EditProduct = () => {
   const navigate=useNavigate(); 
  const { state } = useLocation();
  const id = state._id;
  const [form, setForm] = useState({
    title: state.product,
    price: state.price,
    descriptions: state.descriptions,
  });
  const [image, setImage] = useState(null);

  const submitForm = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const updateProduct = async (e) => {
    e.preventDefault();
    console.log(form);

    let formData = new FormData();
    formData.append("product", form.title);
    formData.append("price", form.price);
    formData.append("descriptions", form.descriptions);
    formData.append("image", image);

    try {
      let res = await fetch(
        `http://localhost:9000/api/product/updateProduct/${id}`,
        {
          method: "PUT",
          body: formData,
          credentials: "include",
        },
      );

      if (res.ok) {
        res = await res.json();
        navigate("/product")
      }
    } catch (error) {
      console.log("Error occured in uploading product frontend", error);
    }
  };

  console.log(state);
  return (
    <div className="p-5 m-auto shadow-2xl ">
      <form className="flex flex-col gap-4" onSubmit={(e) => updateProduct(e)}>
        <div className="flex flex-col gap-2 font-bold">
          <label className="text-xl">Product Title</label>
          <input
            onChange={submitForm}
            className="outline-none w-full border p-3 rounded-2xl"
            type="text"
            name="title"
            value={form.title}
            placeholder="Enter product"
          />
        </div>

        <div className="flex flex-col gap-2 font-bold">
          <label className="text-xl">Product Price</label>
          <input
            onChange={submitForm}
            className="outline-none w-full border p-3 rounded-2xl"
            type="text"
            name="price"
            value={form.price}
            placeholder="Enter product price"
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
          <label className="text-xl">Image</label>
          <img
            src={`http://localhost:9000/image/${state.image}`}
            className="w-56"
          />
          <input
            onChange={(e) => {
              setImage(e.target.files[0]);
            }}
            className="outline-none w-full border p-3 rounded-2xl"
            type="file"
            name="image"
            // value={state.image}
            placeholder="Enter product image"
          />
        </div>

        <div className="flex flex-col gap-2">
          <button
            type="submit"
            className="border p-4 rounded-xl bg-green-600 text-xl font-bold"
          >
            Update Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProduct;
