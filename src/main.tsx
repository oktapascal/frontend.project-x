import React from "react";
import ReactDOM from "react-dom/client";
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import { CookiesProvider } from "react-cookie";
import App from "./App.tsx";
import { ProtectedLayout } from "@/components/layouts";
import { LoginPage, MainPage } from "@/pages";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="login" element={<LoginPage />} />
      <Route element={<ProtectedLayout />}>
        <Route path="main" element={<MainPage />} />
        <Route path="settings">
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
