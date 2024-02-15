import React, { useState, useEffect, useCallback, useId } from 'react';
import styles from "./modal.module.css"
import { Delete, Mask } from '../../assets/images';


const Modal = ({ isOpen, closeModal, onSave, selectedItem ,text, heading, }) => {
  const [first_name, setFirst_name] = useState('');
  const [last_name, setLast_name] = useState('');
  const [email, setEmail] = useState('');
  const [avatar, setAvatar] = useState(null);
  const id = useId()

  useEffect(() => {
    if (selectedItem) {
      setFirst_name(selectedItem.first_name);
      setLast_name(selectedItem.last_name);
      setEmail(selectedItem.email);
    }
  }, [selectedItem]);

  const handleSave = () => {
    const newItem = {
      id: selectedItem ? selectedItem.id : id,
      first_name,
      last_name,
      email,
      avatar, 
    };

    onSave(newItem);
    setFirst_name('');
    setLast_name('');
    setEmail('');
    setAvatar(null);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setAvatar(file);
  };

  const backgroundImageUrl = `url(${Mask})`;

  const containerStyle = {
    backgroundImage: backgroundImageUrl,
    backgroundSize: 'cover',  
    backgroundRepeat: 'no-repeat',
    width:"100%",
    height:"100px",
  };

  return (
      <React.Fragment>
      {isOpen && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
          <div  style={containerStyle}>
          <div className={styles.header}>
          <span onClick={closeModal} className={styles.close}>&times;</span>
          {heading === "ARE YOU SURE?" ? (
              <div>
                <img src={Delete} alt="" height={50} width={50} />
              </div>
            ) : (
              <div className={styles.bgimg}></div>
            )}
            <h2>{heading ? heading : ""}</h2>
            <p>{text ? text : ""}</p>
          <h2 style={{color:"white"}}>{selectedItem ? 'Edit Customer' : 'Add New Customer'}</h2>
          </div>
          </div>
          <div className={styles.form}>
            <input type="text" placeholder='First_name' value={first_name} onChange={(e) => setFirst_name(e.target.value)} />
            <input type="text" placeholder='Last_name' value={last_name} onChange={(e) => setLast_name(e.target.value)} />
            <input type="text" placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type="file" accept=".jpg, .jpeg, .png" onChange={handleFileChange} />
          <button onClick={handleSave} className={styles.button}>{selectedItem ? 'Edit Customer' : 'Add Customer'}</button>          
          </div>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default React.memo(Modal);

export const DeleteModal = React.memo(({ isOpen, closeModal, confirmDelete }) => {
  return isOpen ? (
    <div className={styles.modal} onClick={closeModal}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <div className={styles.deleteheader}>
          <span className={styles.close} onClick={closeModal}>
            &times;
          </span>
          <div>
            <img src={Delete} alt="" height={50} width={50} />
          </div>
          <h2>ARE YOU SURE?</h2>
          <p>Do you want to delete this item? This action cannot be undone.</p>
          <div className={styles.buttonContainer}>
            <button onClick={closeModal} className={styles.calModalButton}>Cancel</button>
            <button onClick={confirmDelete} className={styles.delModalButton}>Delete</button>            
          </div>
        </div>
      </div>
    </div>
  ) : null;
});
