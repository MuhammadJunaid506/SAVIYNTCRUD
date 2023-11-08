import React from 'react';
import styles from './card.module.css';

export const Card = ({ item, openModal, setButton ,setText, setHeading,handleItemAction, name, selectedFile ,email }) => {
  const handleUpdateItem = () => {
    openModal();
    setButton('EDIT CUSTOMER');
    handleItemAction('update', { ...item, name , email, selectedFile});
    setHeading("EDIT CUSTOMER")
    setText('')
  };
  const handleDeleteItem = () => {
    openModal();
    setButton('Delete');
    handleItemAction('delete', item.id);
    setText('Do you want to delete this customer?\nThis process can not be undone.')
    setHeading("ARE YOU SURE?")
  };
  return (
    <div className={styles.card}>
      <div className={styles.avatarContainer}>
        <img src={item?.avatar} alt="Avatar" className={styles.avatar} />
      </div>
      <div className={styles.cardHeader}>
      <p>ID: {item?.id}</p>
      <h2>Name: {item?.first_name} {" "} {item?.last_name}</h2>
        <p>Email: {item?.email}</p>
      </div>
      <div className={styles.cardActions}>
        <button
          onClick={handleUpdateItem}
          className={styles.updateButton}
        >
          Update Item
        </button>
        <button
          onClick={handleDeleteItem}
          className={styles.deleteButton}
        >
          Delete Item
        </button>
      </div>
    </div>
  );
};
