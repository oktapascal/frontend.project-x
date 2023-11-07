import { Button, List, ListItem, Text } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { SidebarParentAppProps } from "@/layouts/components/Sidebar/components/SidebarParent/interface";
import styles from "@/layouts/components/Sidebar/components/SidebarParent/styles/sidebar-parent-app.module.css";

const framerSidebarBackground = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0, transition: { delay: 0.2 } },
  transition: { duration: 0.3 },
};

const framerSidebarPanel = {
  initial: { x: "-100%" },
  animate: { x: 0 },
  exit: { x: "-100%" },
  transition: { duration: 0.3 },
};

export default function SidebarParentApp({ parentMenus, onCloseSidebar, onSetChildMenus }: SidebarParentAppProps) {
  return (
    <>
      <motion.div {...framerSidebarBackground} aria-hidden="true" className={styles.sidebar__app__backdrop} onClick={onCloseSidebar}></motion.div>
      <motion.div {...framerSidebarPanel} className={styles.sidebar__app__parent}>
        <List spacing={2} id="menu__parent">
          {parentMenus.map((menu) => (
            <ListItem key={menu.serial_number}>
              <Button
                paddingLeft={0}
                width="100%"
                justifyContent="start"
                borderRadius={0}
                className="active"
                onClick={() => onSetChildMenus(menu.children)}
              >
                <div className="menu__parent__mark"></div>
                <div className="menu__parent__group">
                  <i className={`${menu.menu_icon} icon-small menu__parent__icon`}></i>
                  <Text fontSize="1rem" paddingLeft="0.5rem" className="menu__parent__text">
                    {menu.name}
                  </Text>
                </div>
              </Button>
            </ListItem>
          ))}
        </List>
      </motion.div>
    </>
  );
}
