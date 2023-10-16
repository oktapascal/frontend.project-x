import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { OnlyDekstopAccess, ProtectedRoutes } from "@/components/others";
import { LoginPage, MainPage } from "./pages";

function App() {
  const [windowSize, setWindowSize] = useState([
    window.innerWidth,
    window.innerHeight,
  ]);

  useEffect(() => {
    const onWindowResize = () => {
      setWindowSize([window.innerWidth, window.innerHeight]);
    };

    window.addEventListener("resize", onWindowResize);

    return () => {
      window.removeEventListener("resize", onWindowResize);
    };
  }, []);

  if (windowSize[0] < 600) {
    return <OnlyDekstopAccess />;
  }

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route element={<ProtectedRoutes />}>
          <Route path="/main" element={<MainPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
