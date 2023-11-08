import { lazy } from "react";
import { RouteObject, Navigate } from "react-router-dom";
import { Layout } from "@/layouts";

const MainPage = lazy(() => import("../pages/main"));
const ModulesListPage = lazy(() => import("../pages/settings/modules/Read"));
const ModulesCreatePage = lazy(() => import("../pages/settings/modules/Create"));

export default function ProtectedRoutes(): RouteObject {
  return {
    element: <Layout />,
    children: [
      {
        path: "/main",
        element: <MainPage />,
      },
      {
        path: "/settings/modules",
        element: <ModulesListPage />,
      },
      {
        path: "/settings/modules/create",
        element: <ModulesCreatePage />,
      },
      {
        path: "/settings/*",
        element: <Navigate to="/settings/modules" replace />,
      },
    ],
  };
}
