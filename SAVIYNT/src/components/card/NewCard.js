
import React from 'react';
import styles from "./card.module.css";

const NewCard = React.memo(({ item, onEdit, onDelete }) => {
  return (
    <div className={styles.card}>
        <div className={styles.avatarContainer}>
            <img src={item.avatar} alt={`Avatar for ${item.first_name} ${item.last_name}`} className={styles.avatar} />
        </div>
      <div className={styles.cardHeader}>
      <p>{item.id}</p>
      <h2>{item.first_name} {item.last_name}</h2>
      <p>{item.email}</p>
      
      <button onClick={onEdit} className={styles.updateButton}>Edit</button>
      <button onClick={onDelete} className={styles.deleteButton}>Delete</button>
      </div>
    </div>
  );
});

export default NewCard;
