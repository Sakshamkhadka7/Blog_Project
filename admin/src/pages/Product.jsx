import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import  {useNavigate} from "react-router-dom"

const Product = () => {
  const [form, setForm] = useState({
    title: "",
    price: "",
    descriptions: "",
  });
  const [image, setImage] = useState(null);
  const [product, setProduct] = useState([]);

   const navigate=useNavigate();

  const submitForm = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const getProduct = async () => {
    try {
      let res = await fetch(
        "http://localhost:9000/api/product/displayProduct",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        },
      );

      if (res.ok) {
        res = await res.json();
        setProduct(res.product);
      }
    } catch (error) {
      console.log("Error occured in uploading product frontend", error);
    }
  };

  const uploadProduct = async (e) => {
    e.preventDefault();
    console.log(form);

    let formData = new FormData();
    formData.append("product", form.title);
    formData.append("price", form.price);
    formData.append("descriptions", form.descriptions);
    formData.append("image", image);

    try {
      let res = await fetch("http://localhost:9000/api/product/createProduct", {
        method: "POST",
        body: formData,
        credentials: "include",
      });

      if (res.ok) {
        res = await res.json();
        alert("Product uploaded");
      }
    } catch (error) {
      console.log("Error occured in uploading product frontend", error);
    }
  };

  useEffect(() => {
    getProduct();
  }, []);

  return (
    <>
      <div className="p-5 m-auto shadow-2xl ">
        <form
          className="flex flex-col gap-4"
          onSubmit={(e) => uploadProduct(e)}
        >
          <div className="flex flex-col gap-2 font-bold">
            <label className="text-xl">Product Title</label>
            <input
              onChange={submitForm}
              className="outline-none w-full border p-3 rounded-2xl"
              type="text"
              name="title"
              placeholder="Enter product title"
            />
          </div>

          <div className="flex flex-col gap-2 font-bold">
            <label className="text-xl">Product Price</label>
            <input
              onChange={submitForm}
              className="outline-none w-full border p-3 rounded-2xl"
              type="text"
              name="price"
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
              placeholder="Enter product descriptions"
            />
          </div>

          <div className="flex flex-col gap-2 font-bold">
            <label className="text-xl">Image</label>
            <input
              onChange={(e) => {
                setImage(e.target.files[0]);
              }}
              className="outline-none w-full border p-3 rounded-2xl"
              type="file"
              name="image"
              placeholder="Enter product image"
            />
          </div>

          <div className="flex flex-col gap-2">
            <button
              type="submit"
              className="border p-4 rounded-xl bg-green-600 text-xl font-bold"
            >
              Submit Product
            </button>
          </div>
        </form>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-xl overflow-hidden">
          <thead className="bg-gray-100">
            <tr className="">
              <th className="py-3 px-6 text-left text-gray-700 font-semibold">
                Id
              </th>
              <th className="py-3 px-6 text-left text-gray-700 font-semibold">
                Product title
              </th>
              <th className="py-3 px-6 text-left text-gray-700 font-semibold">
                Product Price
              </th>
              <th className="py-3 px-6 text-left text-gray-700 font-semibold">
                Descriptions
              </th>
              <th className="py-3 px-6 text-left text-gray-700 font-semibold">
                Image
              </th>
              <th className="py-3 px-6 text-left text-gray-700 font-semibold">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {product.length > 0 ? (
              product.map((pro, idx) => {
                return (
                  <tr key={idx} className="bg-gray-50">
                    <td className="py-3 px-6">{pro._id}</td>
                    <td className="py-3 px-6">{pro.product}</td>
                    <td className="py-3 px-6">{pro.price}</td>
                    <td className="py-3 px-6">{pro.descriptions}</td>
                    <td className="py-3 px-6">
                      {pro.image && (
                        <img
                          src={`http://localhost:9000/image/${pro.image}`}
                          alt={pro.title}
                          className="w-16 h-16 object-cover rounded"
                        />
                      )}
                    </td>

                    <td className="py-3 px-6 flex gap-2">
                      <button className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition"
                      
                      onClick={()=>{
                        navigate("/editProduct",{
                          state:pro
                        })
                      }}

                      >
                        Edit
                      </button>

                      <button className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition">
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

export default Product;
