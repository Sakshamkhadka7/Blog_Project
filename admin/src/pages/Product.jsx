import React from 'react'

const Product = () => {
  return (
   <div className="p-5 m-auto shadow-2xl ">
      <form className="flex flex-col gap-4">
        <div className="flex flex-col gap-2 font-bold">
          <label className="text-xl">Blog Title</label>
          <input
           
            className="outline-none w-full border p-3 rounded-2xl"
            type="text"
            placeholder="Enter product title"
          />
        </div>

        <div className="flex flex-col gap-2 font-bold">
          <label className="text-xl">Author</label>
          <input
           
            className="outline-none w-full border p-3 rounded-2xl"
            type="text"
            placeholder="Enter product price"
          />
        </div>

        <div className="flex flex-col gap-2 font-bold">
          <label className="text-xl">Descriptions</label>
          <input
          
            className="outline-none w-full border p-3 rounded-2xl"
            type="text"
            placeholder="Enter product descriptions"
          />
        </div>

        <div className="flex flex-col gap-2 font-bold">
          <label className="text-xl">Image</label>
          <input
           
            className="outline-none w-full border p-3 rounded-2xl"
            type="file"
            placeholder="Enter product image"
          />
        </div>

        <div className="flex flex-col gap-2">
          <button
            type="submit"
           
            className="border p-4 rounded-xl bg-green-600 text-xl font-bold"
          >
            Submit Blog
          </button>
        </div>
      </form>
    </div>
  )
}

export default Product