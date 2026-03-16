import { createContext, useEffect, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  const getMe = async () => {
    try {
      let res = await fetch(`${import.meta.env.VITE_API_URL}/api/user/getMe`, {
        method: "GET",
        credentials: "include",
      });
      if (res.ok) {
        res = await res.json();
        console.log(res);
        setUser(res.user);
        setIsLoading(false);
        setError(false);
      }
    } catch (error) {
      console.log("Error occured in a user context", error);
      setError(true);
      setIsLoading(false);
    }finally{
      setIsLoading(false)
    }
  };

  useEffect(() => {
    getMe();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, isLoading, error }}>
      {children}
    </UserContext.Provider>
  );
};
