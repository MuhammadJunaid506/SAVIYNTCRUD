import React from "react";
import styles from "./modal.module.css";
import { Delete, Mask } from "../../assets/images";

export const Modal = React.memo(
  ({ isOpen, closeModal, text, heading, children }) => {
    return isOpen ? (
      <div className={styles.modal} onClick={closeModal}>
        <div
          className={styles.modalContent}
          onClick={(e) => e.stopPropagation()}
        >
          <div className={styles.header}>
            <span className={styles.close} onClick={closeModal}>
              &times;
            </span>
            {heading === "ARE YOU SURE?" ? (
              <div>
                <img src={Delete} alt="" height={50} width={50} />
              </div>
            ) : (
              <div className={styles.bgimg}></div>
            )}
            <h2>{heading ? heading : "ADD NEW CUSTOMERS"}</h2>
            <p>{text ? text : ""}</p>
          </div>
          {children}
        </div>
      </div>
    ) : null;
  }
);
