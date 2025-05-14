import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Logout() {
  const go = useNavigate();

  useEffect(() => {
    localStorage.removeItem("auth");
    go("/login");
  }, []);

  return null;
}

export default Logout;
