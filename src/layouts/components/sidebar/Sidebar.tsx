import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { useModuleStore } from "@/stores";
import { useFetchModuleMenus } from "@/features/moduleMenus";
import { SidebarParentApp, SidebarChildApp } from "./components";
import { SidebarProps } from "./types/types";
import { IMenu, IMenuChild, IMenuParent } from "@/types/IMenu";

export default function Sidebar({ onCloseAllSidebar, onCloseSidebar, onOpenChildSidebar, isOpenChildSidebar, isOpenParentSidebar }: SidebarProps) {
  const [parentMenus, setParentMenus] = useState<IMenuParent[]>([]);
  const [childMenus, setChildMenus] = useState<IMenuChild[]>([]);

  const module_id = useModuleStore((state) => state.module_id);

  const { data } = useFetchModuleMenus(module_id);

  useEffect(() => {
    if (data) {
      setParentMenus(data.map(({ serial_number, name, path_url, menu_icon, children }) => ({ serial_number, name, path_url, menu_icon, children })));
    }
  }, [data]);

  const onSetChildMenu = (menus: IMenu[]) => {
    setChildMenus(menus.map(({ serial_number, name, path_url, menu_icon }) => ({ serial_number, name, path_url, menu_icon })));
    onOpenChildSidebar();
  };

  return (
    <>
      <AnimatePresence mode="wait" initial={false}>
        {isOpenParentSidebar && (
          <SidebarParentApp
            parentMenus={parentMenus}
            onCloseSidebar={onCloseSidebar}
            onOpenChildSidebar={onOpenChildSidebar}
            onSetChildMenus={onSetChildMenu}
          />
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait" initial={false}>
        {isOpenChildSidebar && <SidebarChildApp childMenus={childMenus} onCloseAllSidebar={onCloseAllSidebar} />}
      </AnimatePresence>
    </>
  );
}
