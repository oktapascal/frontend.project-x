import { FC, useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import { useLocalStorage } from "@/hooks";

const ProtectedRoutes: FC = () => {
  const navigate = useNavigate();

  const [user] = useLocalStorage("session");

  useEffect(() => {
    if (user === null) navigate("/login");
  }, [navigate, user]);

  return <Outlet />;
};

export default ProtectedRoutes;
