import React, { useState , useId } from 'react';
import styles from './form.module.css';

export const ItemForm = React.memo(({ button, onSubmit, newCustomer}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  // const id = useId();

  const handleSubmit = (e) => {
    e.preventDefault();
    const newItem = {
      id: newCustomer.id,
      name,
      email,
      selectedFile,
    };
    onSubmit(newItem);
    // setName('');
    // setEmail('');
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      {button === 'Delete' ? (
        <div className={styles.deleteButtons}>
          <button type="button" style={{ backgroundColor: "#A5A5AF" }} onClick={onSubmit}>
            CANCEL
          </button>
          <button type="submit" style={{ backgroundColor: "#D80000" }}>
            {button}
          </button>
        </div>
      ) : (
        <>
          <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
          <input type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <input type="file" accept=".jpg, .jpeg, .png" onChange={handleFileChange} />
          <div className={styles.formButtons}>
            <button type="submit">{button}</button>
          </div>
        </>
      )}
    </form>
  );
});
