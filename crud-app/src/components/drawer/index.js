import styles from "./drawer.module.css"
import { Logo , Customer} from "../../assets/images";
export const Drawer = ({ open, selectedTab, handleTabChange }) => {
    return (
      <div className={`${styles.drawer} ${open ? styles.open : ""}`}>
        <div className={styles.tabs}>
        
          <div
            onClick={() => handleTabChange("home")}
            className={selectedTab === "home" ? styles.active : ""}
          >
            {" "}
            {open ? <img src={Logo} alt="" height={"100px"} width={"200px"} style={{padding:30}}/> : <img src={Logo} alt="" height={"100px"} width={"200px"} style={{padding:30 , visibility: 'hidden', transition: "ease-in-out 0.2s"}}/>}
        
            
          </div>
          <button
            onClick={() => handleTabChange("customers")}
            className={selectedTab === "customers" ? styles.active : ""}
          
          >
            <img src={Customer} alt="" height={20} width={20} style={{marginRight:10}}/>
            {open ? "CUSTOMERS" : ""}
          </button>
        </div>
      </div>
    );
  };
  