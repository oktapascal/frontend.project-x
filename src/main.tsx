/* eslint-disable react-refresh/only-export-components */
import React from "react";
import ReactDOM from "react-dom/client";
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import { CookiesProvider } from "react-cookie";
import App from "./App.tsx";
import { ProtectedLayout } from "@/components/layouts";
import { LoadingPage } from "@/components/others";

const LoginPage = React.lazy(() => import("./pages/login/Page.tsx"));
const MainPage = React.lazy(() => import("./pages/main/Page.tsx"));

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route
        path="login"
        element={
          <React.Suspense fallback={<LoadingPage />}>
            <LoginPage />
          </React.Suspense>
        }
      />
      <Route element={<ProtectedLayout />}>
        <Route
          path="main"
          element={
            <React.Suspense fallback={<LoadingPage />}>
              <MainPage />
            </React.Suspense>
          }
        />
        <Route path="settings">
          <Route index element={<div>ini halaman modules</div>} />
          <Route path="modules" element={<div>ini halaman modules</div>} />
        </Route>
      </Route>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ChakraProvider>
      <CookiesProvider defaultSetOptions={{ path: "/" }}>
        <RouterProvider router={router} />
      </CookiesProvider>
    </ChakraProvider>
  </React.StrictMode>
);
