import React, { useEffect, useState } from "react";

const Learn = () => {
  const [learn, setLearn] = useState([]);

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
      console.log("Error occured in a frontend getProduct", error);
    }
  };

  useEffect(() => {
    getLearn();
  }, []);

  return (
    <div>
      {learn.length > 0 ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 p-2 gap-3">
          {console.log(learn)}
          {learn.map((pro, idx) => {
            return (
              <div key={idx} className="p-8 shadow-2xl rounded-2xl">
                <h1 className="text-xl font-mono p-2">Title : {pro.learn}</h1>
                <h1 className="font-light text-l p-2">
                  Descriptions : {pro.descriptions}
                </h1>
                <h1 className="text-xl font-bold p-2">Price : {pro.link}</h1>
              </div>
            );
          })}
        </div>
      ) : (
        <div>Learn Not Found</div>
      )}
    </div>
  );
};

export default Learn;
