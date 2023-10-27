import { RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useMediaQuery } from "@chakra-ui/react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { router } from "@/router";
import { AxiosNavigation, OnlyDekstopAccess } from "@/components/others";

import "@/assets/styles/app.min.css";

export default function App() {
  const queryClient = new QueryClient();

  const [isLargerThan600] = useMediaQuery("(min-width: 600px)");

  if (!isLargerThan600) {
    return <OnlyDekstopAccess />;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <AxiosNavigation />
      <RouterProvider router={router} />
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}
