import { motion } from "framer-motion";
import { List, ListItem, Text } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import { SidebarChildAppProps } from "./interface";
import styles from "../styles/sidebar-child-app.module.css";

const framerSidebarPanel = {
  initial: { x: "-100%" },
  animate: { x: 0 },
  exit: { x: "-100%" },
  transition: { duration: 0.1 },
};

export default function SidebarChildApp({ childMenus, onCloseAllSidebar }: SidebarChildAppProps) {
  return (
    <motion.div {...framerSidebarPanel} className={styles.sidebar__app__child}>
      <List spacing={2} id="menu__child">
        {childMenus.map((menu) => (
          <ListItem key={menu.serial_number}>
            <NavLink to={menu.path_url} onClick={onCloseAllSidebar}>
              <div className="menu__child__group">
                <div className="menu__child__mark"></div>
                <i className={`${menu.menu_icon} icon-small menu__child__icon`}></i>
                <Text fontSize="1rem" paddingLeft="0.5rem" className="menu__child__text">
                  {menu.name}
                </Text>
              </div>
            </NavLink>
          </ListItem>
        ))}
      </List>
    </motion.div>
  );
}
