import React, { useCallback } from "react";
import styles from "./card.module.css";

export const Card = React.memo(
  ({ item, openModal, setButton, setText, setHeading, handleItemAction, name, selectedFile, email ,}) => {
    const handleUpdateItem = useCallback(() => {
      console.log('Item ID:', item.id);
      openModal();
      setButton('EDIT CUSTOMER');
      handleItemAction('update', { ...item, name, email, selectedFile });
      setHeading('EDIT CUSTOMER');
      setText('');
    }, [openModal, setButton, handleItemAction, item, name, email, selectedFile, setHeading, setText]);

    const handleDeleteItem = useCallback(() => {
      console.log('Item ID:', item.id);
      openModal();
      setButton('Delete');
      handleItemAction('delete', item.id);
      setText('Do you want to delete this customer?\nThis process cannot be undone.');
      setHeading('ARE YOU SURE?');
    }, [openModal, setButton, handleItemAction, item, setText, setHeading]);

    return (
      <div className={styles.card}>
        <div className={styles.avatarContainer}>
          <img src={item?.avatar} alt="Avatar" className={styles.avatar} />
        </div>
        <div className={styles.cardHeader}>
          <p>ID: {item?.id}</p>
          <h2>
            Name: {item?.first_name} {item?.last_name}
          </h2>
          <p>Email: {item?.email}</p>
        </div>
        <div className={styles.cardActions}>
          <button onClick={handleUpdateItem} className={styles.updateButton}>
            Update Item
          </button>
          <button onClick={handleDeleteItem} className={styles.deleteButton}>
            Delete Item
          </button>
        </div>
      </div>
    );
  }
);
