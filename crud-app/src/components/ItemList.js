import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createItem, deleteItem, fetchItems, updateItem } from '../redux/itemSlice';
import ItemForm from './ItemForm';

const ItemList = () => {
  const dispatch = useDispatch();
  const { items, status, error } = useSelector((state) => state.items);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchItems());
    }
  }, [status, dispatch]);

  const handleCreateItem = (newItem) => {
    dispatch(createItem(newItem));
  };

  const handleUpdateItem = (updatedItem) => {
    dispatch(updateItem(updatedItem));
  };

  const handleDeleteItem = (itemId) => {
    dispatch(deleteItem(itemId));
  };

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      {/* Render the list of items */}
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            {item.name}, {item.email}
            <button onClick={() => handleUpdateItem({ ...item, name: 'Updated Name' })}>Update</button>
            <button onClick={() => handleDeleteItem(item.id)}>Delete</button>
          </li>
        ))}
      </ul>

      {/* Form for creating new items */}
      <ItemForm onSubmit={handleCreateItem} />
    </div>
  );
};

export default ItemList;
