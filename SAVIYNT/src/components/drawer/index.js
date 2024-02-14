// // import { Logo, Customer } from "../../assets/images";
// import styles from "./drawer.module.css"

// export const Drawer = ({ open, selectedTab, handleTabChange }) => {
//   return (
//     <div className={`transition-width ${open ? "w-300" : "w-100"} ${styles.drawer} ${open ? styles.open : ""}`}>
//       <div className="flex flex-col items-center">
//         <div
//           onClick={() => handleTabChange("home")}
//           className={`cursor-pointer ${selectedTab === "home" ? "bg-blue-500" : ""} ${open ? "p-8" : "invisible"}`}
//         >
//           <img src={""} alt="" className={`h-100 w-200 ${open ? "" : "transition ease-in-out duration-200"}`} />
//         </div>
//         <button
//           onClick={() => handleTabChange("customers")}
//           className={`cursor-pointer flex items-center ${selectedTab === "customers" ? "bg-blue-500" : ""}`}
//         >
//           <img src={""} alt="" className="h-20 w-20 mr-2" />
//           {open ? "CUSTOMERS" : ""}
//         </button>
//       </div>
//     </div>
//   );
// };
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
