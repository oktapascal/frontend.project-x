import { AnimatePresence } from "framer-motion";
import { SidebarParentApp, SidebarChildApp } from "./components";
import { SidebarProps } from "./types/types";

export default function Sidebar({ onCloseAllSidebar, onCloseSidebar, onOpenChildSidebar, isOpenChildSidebar, isOpenParentSidebar }: SidebarProps) {
  return (
    <>
      <AnimatePresence mode="wait" initial={false}>
        {isOpenParentSidebar && <SidebarParentApp onCloseSidebar={onCloseSidebar} onOpenChildSidebar={onOpenChildSidebar} />}
      </AnimatePresence>

      <AnimatePresence mode="wait" initial={false}>
        {isOpenChildSidebar && <SidebarChildApp onCloseAllSidebar={onCloseAllSidebar} />}
      </AnimatePresence>
    </>
  );
}
