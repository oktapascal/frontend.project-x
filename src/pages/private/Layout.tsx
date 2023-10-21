import { FC } from "react";
import { Outlet } from "react-router-dom";
import { Navbar } from "./components";

import "./styles/styles.min.css";

const Layout: FC = () => {
  return (
    <>
      <div className="bg-private">
        <Navbar />
        <Outlet />
      </div>
    </>
  );
};

export default Layout;
