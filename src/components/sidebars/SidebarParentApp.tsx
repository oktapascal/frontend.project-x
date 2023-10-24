import { FC, ReactNode } from "react";
import { NavLink } from "react-router-dom";
import { List, ListItem, Text } from "@chakra-ui/react";
import { motion } from "framer-motion";
import styles from "./styles/sidebar-parent-app.module.css";

interface Props {
  children?: ReactNode;
  onHideSidebar: () => void;
  onShowChildSidebar: () => void;
}

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

const SidebarParentApp: FC<Props> = ({ onHideSidebar, onShowChildSidebar }) => {
  return (
    <>
      <motion.div {...framerSidebarBackground} aria-hidden="true" className={styles.sidebar__app__backdrop} onClick={onHideSidebar}></motion.div>
      <motion.div {...framerSidebarPanel} className={styles.sidebar__app__parent}>
        <List spacing={2} id="menu__parent">
          <ListItem>
            <NavLink to="settings" onClick={onShowChildSidebar}>
              <div className="menu__parent__mark"></div>
              <div className="menu__parent__group">
                <i className="ri-settings-3-line icon-small menu__parent__icon"></i>
                <Text fontSize="1rem" paddingLeft="0.5rem" className="menu__parent__text">
                  Settings
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
    </>
  );
};

export default SidebarParentApp;
