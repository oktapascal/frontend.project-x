import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { AxiosNavigation, OnlyDekstopAccess } from "@/components/others";
import { ProtectedLayout } from "@/components/layouts";
import { LoginPage, MainPage } from "./pages";

function App() {
  const queryClient = new QueryClient();

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
    <QueryClientProvider client={queryClient}>
      <Router>
        <AxiosNavigation />
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route element={<ProtectedLayout />}>
            <Route path="/main" element={<MainPage />} />
            <Route
              path="/settings/modules"
              element={<div>ini halaman modules</div>}
            />
          </Route>
        </Routes>
      </Router>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export default App;
