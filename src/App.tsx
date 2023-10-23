import { useState, useEffect, useRef } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { AxiosNavigation, OnlyDekstopAccess } from "@/components/others";
import { ProtectedLayout } from "@/components/layouts";
import { useUserStore } from "@/stores";
import { LoginPage, MainPage } from "@/pages";

function App() {
  const navRef = useRef(useNavigate());

  const { pathname } = useLocation();

  const user_id = useUserStore((state) => state.user_id);

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

    if (pathname === "/") {
      if (user_id === null) navRef.current("/login");
      if (user_id !== null) navRef.current("/main");
    }

    return () => {
      window.removeEventListener("resize", onWindowResize);
    };
  }, [user_id, pathname]);

  if (windowSize[0] < 600) {
    return <OnlyDekstopAccess />;
  }

  return (
    <QueryClientProvider client={queryClient}>
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
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export default App;
