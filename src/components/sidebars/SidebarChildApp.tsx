import { FC } from "react";
import { motion } from "framer-motion";
import { List, ListItem } from "@chakra-ui/react";
import styles from "./styles/sidebar-child-app.module.css";

const framerSidebarPanel = {
  initial: { x: "-100%" },
  animate: { x: 0 },
  exit: { x: "-100%" },
  transition: { duration: 0.3 },
};

const SidebarChildApp: FC = () => {
  return (
    <motion.div {...framerSidebarPanel} className={styles.sidebar__app__child}>
      <List spacing={2}>
        <ListItem>Menu 1</ListItem>
        <ListItem>Menu 2</ListItem>
        <ListItem>Menu 3</ListItem>
        <ListItem>Menu 4</ListItem>
        <ListItem>Menu 5</ListItem>
      </List>
    </motion.div>
  );
};

export default SidebarChildApp;
