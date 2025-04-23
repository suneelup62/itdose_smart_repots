// src/hooks/useUserDetailsFromStorage.js
import { useEffect, useState } from "react";

const useUserDetailsFromStorage = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const data = localStorage.getItem("userDetails");
    if (data) {
      setUserData(JSON.parse(data));
    }

    const handleStorageChange = () => {
      const updatedData = localStorage.getItem("userDetails");
      if (updatedData) {
        setUserData(JSON.parse(updatedData));
      }
    };

    window.addEventListener("userDetailsUpdated", handleStorageChange);

    return () => {
      window.removeEventListener("userDetailsUpdated", handleStorageChange);
    };
  }, []);

  return userData;
};

export default useUserDetailsFromStorage;
