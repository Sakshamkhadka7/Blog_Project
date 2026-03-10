import { createContext, useEffect, useState } from "react";

export const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const getMe = async () => {
    try {
      setLoading(true);
      let res = await fetch("http://localhost:9000/api/user/getMe", {
        method: "GET",
        credentials: "include",
      });

      if (!res.ok) {
        throw new Error("Not authenticated");
      }

      const data = await res.json();
      setAdmin(data.user);
      setError(false);
    } catch (error) {
      console.log("Error occured in a Admin Provider", error);
      setAdmin(false);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getMe();
  }, []);

  return (
    <AdminContext.Provider value={{ admin, loading, error,setAdmin }}>
      {children}
    </AdminContext.Provider>
  );
};
