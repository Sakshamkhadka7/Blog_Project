import React, { useEffect, useState } from "react";

const Product = () => {
  const [product, setProduct] = useState([]);

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
      console.log("Error occured in a frontend getProduct", error);
    }
  };

  useEffect(() => {
    getProduct();
  }, []);

  return (
    <div>
      {product.length > 0 ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 p-2 gap-3">
          {console.log(product)}
          {product.map((pro, idx) => {
            return (
              <div key={idx} className="p-8 shadow-2xl rounded-2xl">
                <h1 className="text-xl font-mono p-2">Title : {pro.product}</h1>
                <img
                  src={`http://localhost:9000/image/${pro.image}`}
                  className="w-80"
                />
                <h1 className="text-xl font-bold p-2">Price : {pro.price}</h1>
                <h1 className="font-light text-l p-2">
                  Descriptions : {pro.descriptions}
                </h1>

                <button className="border p-4 rounded px-20 bg-blue-300 hover:bg-blue-600 text-white">Buy Now</button>
              </div>
            );
          })}
        </div>
      ) : (
        <div>Product Not Found</div>
      )}
    </div>
  );
};

export default Product;
