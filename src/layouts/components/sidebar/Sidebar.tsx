import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { AnimatePresence } from "framer-motion";
import { useModuleStore } from "@/stores";
import { axiosInstance } from "@/utils";
import { SidebarParentApp, SidebarChildApp } from "./components";
import { SidebarProps } from "./types/types";
import { IMenu, IMenuParent } from "@/types";

export default function Sidebar({ onCloseAllSidebar, onCloseSidebar, onOpenChildSidebar, isOpenChildSidebar, isOpenParentSidebar }: SidebarProps) {
  const [parentMenu, setParentMenu] = useState<IMenuParent[]>([]);

  const module_id = useModuleStore((state) => state.module_id);

  const { data } = useQuery({
    queryKey: ["fetch.menus", module_id],
    queryFn: async () => {
      const result = await axiosInstance.get(`/modules-menu/${module_id}`, {
        headers: { Accept: "application/json", "Content-Type": "application/json" },
      });

      return result.data as IMenu[];
    },
  });

  useEffect(() => {
    if (data) {
      setParentMenu(data.map(({ serial_number, name, path_url, menu_icon }) => ({ serial_number, name, path_url, menu_icon })));
    }
  }, [data]);

  return (
    <>
      <AnimatePresence mode="wait" initial={false}>
        {isOpenParentSidebar && <SidebarParentApp menus={parentMenu} onCloseSidebar={onCloseSidebar} onOpenChildSidebar={onOpenChildSidebar} />}
      </AnimatePresence>

      <AnimatePresence mode="wait" initial={false}>
        {isOpenChildSidebar && <SidebarChildApp onCloseAllSidebar={onCloseAllSidebar} />}
      </AnimatePresence>
    </>
  );
}
