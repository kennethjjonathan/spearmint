"use client";

import { useState } from "react";
import styles from "./Header.module.css";

const Header = () => {
  const [isActive, setIsActive] = useState<boolean>(false);
  return (
    <>
      <div className={styles.header}>
        <div className={styles.button} onClick={() => setIsActive((prev) => !prev)}>
          <div className={`${styles.burger} ${isActive ? styles.burgerActive : ""}`} />
        </div>
      </div>
    </>
  );
};

export default Header;
