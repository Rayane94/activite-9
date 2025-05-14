import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

function PrivateRoute() {
  const go = useNavigate();

  useEffect(() => {
    const auth = JSON.parse(localStorage.getItem("auth"));
    const ok = auth && new Date(auth.expiresAt) > new Date();
    if (!ok) {
      localStorage.removeItem("auth");
      go("/login");
    }
  }, []);

  return <Outlet />;
}

export default PrivateRoute;
