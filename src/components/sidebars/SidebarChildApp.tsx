import { motion } from "framer-motion";
import { List, ListItem, Text } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import { SidebarProps } from "./types";
import styles from "./styles/sidebar-child-app.module.css";

const framerSidebarPanel = {
  initial: { x: "-100%" },
  animate: { x: 0 },
  exit: { x: "-100%" },
  transition: { duration: 0.1 },
};

export default function SidebarChildApp({ onHideSidebar }: SidebarProps) {
  return (
    <motion.div {...framerSidebarPanel} className={styles.sidebar__app__child}>
      <List spacing={2} id="menu__child">
        <ListItem>
          <NavLink to="settings/modules" onClick={onHideSidebar}>
            <div className="menu__child__group">
              <div className="menu__child__mark"></div>
              <i className="ri-settings-3-line icon-small menu__child__icon"></i>
              <Text fontSize="1rem" paddingLeft="0.5rem" className="menu__child__text">
                Modules
              </Text>
            </div>
          </NavLink>
        </ListItem>
        <ListItem>Menu 2</ListItem>
        <ListItem>Menu 3</ListItem>
        <ListItem>Menu 4</ListItem>
        <ListItem>Menu 5</ListItem>
      </List>
    </motion.div>
  );
}
