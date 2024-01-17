import { useState, useEffect } from "react";

export default function useAuth(jwt) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    setIsAuthenticated(!!token);
  }, [jwt]);

  return isAuthenticated;
}
