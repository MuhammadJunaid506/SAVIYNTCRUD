import React, { useState } from 'react';
import styles from './form.module.css';


export const ItemForm = ({ button, onSubmit }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);


  const handleSubmit = (e) => {
    e.preventDefault();
    const newItem = {
      id: Date.now(),
      name,
      email,
      selectedFile,
    };
    onSubmit(newItem);
    setName('');
    setEmail('');
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  return (
    <form onSubmit={(e) => onSubmit(e)}>
      {button === "Delete" ? (
      <div className={styles.form}>        
        <div style={{ display:"flex", textAlign: 'center', justifyContent:"space-between" }}>
          <button type="submit" style={{backgroundColor:"#A5A5AF"}}>CANCEL</button>
          <button type="submit" style={{backgroundColor:"#D80000"}}>{button}</button>
        </div>
      </div>
    ) : (
      <div className={styles.form}>
        <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
        <input type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="file" accept=".jpg, .jpeg, .png" onChange={handleFileChange} />
        <div style={{ textAlign: 'center' }}>
          <button type="submit">{button}</button>
        </div>
        </div>
    )}

    </form>
  );
};

