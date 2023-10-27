import { Navigate, RouteObject } from "react-router-dom";
import LoginPage from "@/pages/login/Page";

export default function PublicRoutes(): RouteObject[] {
  return [
    {
      path: "/login",
      element: <LoginPage />,
    },
    {
      path: "*",
      element: <Navigate to="/login" replace />,
    },
  ];
}
