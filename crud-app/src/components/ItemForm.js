import React, { useState } from 'react';

const ItemForm = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const newItem = {
      id: Date.now(), // You can generate a unique ID using a library like uuid
      name,
      email,
    };
    onSubmit(newItem);
    setName('');
    setEmail('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
      <input type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <button type="submit">Add Item</button>
    </form>
  );
};

export default ItemForm;
