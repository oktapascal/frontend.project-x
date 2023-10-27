import { lazy } from "react";
import { RouteObject } from "react-router-dom";
import { Layout } from "@/layouts";

const MainPage = lazy(() => import("../pages/main/Page.tsx"));
const ModulesListPage = lazy(() => import("../pages/settings/modules/Page.tsx"));

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
    ],
  };
}
