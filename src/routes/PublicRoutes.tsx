import { Navigate, RouteObject } from "react-router-dom";
import LoginPage from "@/pages/login";

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
