import React, { useCallback } from "react";
import styles from "./drawer.module.css";
import { Logo , Customer } from "../../assets/images";

export const Drawer = React.memo(({ open, selectedTab, handleTabChange }) => {
  const handleHomeClick = useCallback(() => handleTabChange("home"), [handleTabChange]);
  const handleCustomersClick = useCallback(() => handleTabChange("customers"), [handleTabChange]);

  return (
    <div className={`${styles.drawer} ${open ? styles.open : ""}`}>
      <div className={`flex flex-col items-center ${styles.transitionWidth} ${open ? styles.width300 : styles.width100}`}>
        <div
          onClick={handleHomeClick}
          className={`cursor-pointer ${styles.tab} ${selectedTab === "home" ? styles.bgBlue : ""} ${open ? styles.p8 : styles.invisible}`}
        >
          {open && (<img
            src={Logo}
            alt=""
            className={`${styles.tabImage} ${open ? "" : styles.transition}`}
          />)}
        </div>
        <button width={open ? "250px" :"30px"}
          onClick={handleCustomersClick}
          className={` ${styles.button} ${selectedTab === "customers" ? styles.bgBlue : ""}`}
        >
          <img src={Customer} alt="" style={{width:"30px", marginRight:"10px"}}  />
          {open ? "CUSTOMERS" : ""}
        </button>
      </div>
    </div>
  );
});
