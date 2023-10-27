import { createBrowserRouter } from "react-router-dom";
import { PublicRoutes, ProtectedRoutes } from "@/routes";

const router = createBrowserRouter([...PublicRoutes(), ProtectedRoutes()]);

export default router;
