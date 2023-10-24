import { useEffect, useRef } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useMediaQuery } from "@chakra-ui/react";
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

  const [isLargerThan600] = useMediaQuery("(min-width: 600px)");

  useEffect(() => {
    if (pathname === "/") {
      if (user_id === null) navRef.current("/login");
      if (user_id !== null) navRef.current("/main");
    }
  }, [user_id, pathname]);

  if (!isLargerThan600) {
    return <OnlyDekstopAccess />;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <AxiosNavigation />
      <Routes>
        <Route path="login" element={<LoginPage />} />
        <Route element={<ProtectedLayout />}>
          <Route path="main" element={<MainPage />} />
          <Route path="settings">
            <Route path="modules" element={<div>ini halaman modules</div>} />
          </Route>
        </Route>
      </Routes>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export default App;
