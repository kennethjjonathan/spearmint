"use client";

import { User } from "@supabase/supabase-js";
import { AnimatePresence } from "framer-motion";
import { useState } from "react";
import styles from "./Header.module.css";
import NavigationLinks from "./NavigationLinks/NavigationLinks";

type HeaderProps = {
  user: User | null;
};

const Header = ({ user }: HeaderProps) => {
  const [isActive, setIsActive] = useState<boolean>(false);
  return (
    <>
      <div className={styles.header}>
        <div
          className={styles.button}
          onClick={() => setIsActive((prev) => !prev)}
        >
          <div
            className={`${styles.burger} ${
              isActive ? styles.burgerActive : ""
            }`}
          />
        </div>
      </div>
      <AnimatePresence mode="wait">
        {isActive && <NavigationLinks user={user}  />}
      </AnimatePresence>
    </>
  );
};

export default Header;
