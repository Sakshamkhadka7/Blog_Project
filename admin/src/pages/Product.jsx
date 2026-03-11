import React from "react";
import { useState } from "react";

const Product = () => {
  const [form, setForm] = useState({
    title: "",
    price: "",
    descriptions: "",
  });
  const [image,setImage]=useState(null);

  const submitForm = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const uploadProduct = async (e) => {
    e.preventDefault();
    console.log(form);
   
    let formData=new FormData();
    formData.append("product",form.title);
    formData.append("price",form.price);
    formData.append("descriptions",form.descriptions);
    formData.append("image",image);


    try {
      let res=await fetch("http://localhost:9000/api/product/createProduct",{
        method:"POST",
        body:formData,
        credentials:"include"
      })
  
      if(res.ok){
        res=await res.json();
        alert("Product uploaded");
      }
      
    } catch (error) {
      console.log("Error occured in uploading product frontend",error);
    }

  };

  return (
    <>
    <div className="p-5 m-auto shadow-2xl ">
      <form className="flex flex-col gap-4" onSubmit={(e) => uploadProduct(e)}>
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
            onChange={(e)=> {setImage(e.target.files[0])}}
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

    <div>
      <table>
        <tr>
          <th>Id</th>
        </tr>
      </table>
    </div>
    
    </>
  );
};

export default Product;
