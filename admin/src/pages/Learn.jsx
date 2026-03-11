import React from 'react'

const Learn = () => {
  return (
    <div className="p-5 m-auto shadow-2xl ">
      <form className="flex flex-col gap-4">
        <div className="flex flex-col gap-2 font-bold">
          <label className="text-xl">Learn Title</label>
          <input
           
            className="outline-none w-full border p-3 rounded-2xl"
            type="text"
            placeholder="Enter product title"
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
          <label className="text-xl">Link : </label>
          <input
           
            className="outline-none w-full border p-3 rounded-2xl"
            type="text"
            placeholder="Enter resources link"
          />
        </div>

        <div className="flex flex-col gap-2">
          <button
            type="submit"
           
            className="border p-4 rounded-xl bg-green-600 text-xl font-bold"
          >
            Submit Resources
          </button>
        </div>
      </form>
    </div>
  )
}

export default Learn