import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import { CookiesProvider } from "react-cookie";
import App from "./App.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ChakraProvider>
      <CookiesProvider defaultSetOptions={{ path: "/" }}>
        <Router>
          <App />
        </Router>
      </CookiesProvider>
    </ChakraProvider>
  </React.StrictMode>
);
