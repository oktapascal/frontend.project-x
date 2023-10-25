import { useEffect, useRef } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useMediaQuery } from "@chakra-ui/react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { AxiosNavigation, OnlyDekstopAccess } from "@/components/others";
import { useUserStore } from "@/stores";

export default function App() {
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
      <ReactQueryDevtools />
      <Outlet />
    </QueryClientProvider>
  );
}
