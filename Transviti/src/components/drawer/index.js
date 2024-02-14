// import { Logo, Customer } from "../../assets/images";
import styles from "./drawer.module.css"

export const Drawer = ({ open, selectedTab, handleTabChange }) => {
  return (
    <div className={`transition-width ${open ? "w-300" : "w-100"} ${styles.drawer} ${open ? styles.open : ""}`}>
      <div className="flex flex-col items-center">
        <div
          onClick={() => handleTabChange("home")}
          className={`cursor-pointer ${selectedTab === "home" ? "bg-blue-500" : ""} ${open ? "p-8" : "invisible"}`}
        >
          <img src={""} alt="" className={`h-100 w-200 ${open ? "" : "transition ease-in-out duration-200"}`} />
        </div>
        <button
          onClick={() => handleTabChange("customers")}
          className={`cursor-pointer flex items-center ${selectedTab === "customers" ? "bg-blue-500" : ""}`}
        >
          <img src={""} alt="" className="h-20 w-20 mr-2" />
          {open ? "CUSTOMERS" : ""}
        </button>
      </div>
    </div>
  );
};
