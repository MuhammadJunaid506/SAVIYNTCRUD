import React, { useState ,useEffect} from "react";
import styles from "./App.module.css";
// import ItemList from "./components/ItemList";
import { Drawer } from "./components/drawer";
import { Modal } from "./components/customModal";
import { ItemForm } from "./components/ItemForm/ItemForm";
import { useDispatch, useSelector } from 'react-redux';
import { createItem, deleteItem, fetchItems, updateItem } from './redux/itemSlice';
import { Card } from "./components/card";
import {getListLocalStorage} from "./redux/itemSlice"

const App = () => {
  const dispatch = useDispatch();
  const { items, status, error } = useSelector((state) => state.items);
  const [open, setOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState("home");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [button, setButton] = useState("Create")
  const [text,setText] = useState("")
  const [heading, setHeading] = useState("ADD NEW CUSTOMER")

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchItems());
    }
  }, [status, dispatch]);

  const handleItemAction = (actionType, item) => {
    switch (actionType) {
      case 'create':
        dispatch(createItem(item));
        break;
      case 'update':
        dispatch(updateItem(item));
        break;
      case 'delete':
        dispatch(deleteItem(item.id));
        break;
      default:
    }
  };

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const handleTabChange = (tabName) => {
    setSelectedTab(tabName);
  };

  const handleSubmit = (item) => {
    const actionType = button === 'Create' ? 'create' : 'update';
    handleItemAction(actionType, item);
  };
  const handleadd = ()=>{
    setHeading("ADD NEW CUSTOMER")
    setText("")
    setButton("ADD CUSTOMER")
    openModal()
  }
  const itemList = getListLocalStorage()
  console.log(itemList)
  return (
    <>
      <div className={styles.name}>
        <div className={styles.drawer1}>
          <Drawer
            open={open}
            selectedTab={selectedTab}
            handleTabChange={handleTabChange}
          />
        </div>
        <div className={styles.container1}>
          <nav className={styles.nav}>
          <div onClick={toggleDrawer} className={styles.horizantal}><hr className={styles.line}/><hr className={styles.line} />
            <hr className={styles.line} /></div>
            <h1>CUSTOMERS</h1>
          </nav>
          <main className={styles.main}>
            <div className={styles.mainContain} >
              <button className={styles.mainContainitem} onClick={handleadd}>ADD NEW CUSTOMER</button>
              <Modal isOpen={isModalOpen} closeModal={closeModal} text={text} heading={heading}>
              <ItemForm button={button} 
                onSubmit={handleSubmit} 
                /> 
                </Modal>
                <div></div>
                {items.map((item) => (
                  <Card item={item} openModal={openModal} setButton={setButton} setHeading={setHeading} setText={setText} key={item?.id} handleItemAction={handleItemAction}/>
                ))}
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default App;

// export const ItemForm = ({ onSubmit , button }) => {
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');

//    const handleSubmit = (e) => {
//     e.preventDefault();
//     const newItem = {
//       id: Date.now(),
//       name,
//       email,
//     };
//     onSubmit(newItem);
//     setName('');
//     setEmail('');
//   };

//   return (
//     <form onSubmit={(e)=>{
//       onSubmit(e)
//     }}>
//       <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
//       <input type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
//       <button type="submit">{button}</button>
//     </form>
//   );
// };

// export const Card = ({item, openModal, setButton})=>{
//   console.log(item)
//   return(
//     <div className={styles.card}>
//       <div className={styles.avatarContainer}>
//         <img src={item?.avatar} alt="Avatar" className={styles.avatar} />
//       </div>
//       <div className={styles.cardHeader}>
//         <h2>Name: {item?.name}</h2>
//         <p>Age: {item?.age}</p>
//         <p>Email: {item?.email}</p>
//       </div>
//       <div className={styles.cardActions}>
//         <button
//           onClick={() => {
//             openModal();
//             setButton('update');
//           }}
//           className={styles.updateButton}
//         >
//           Update Item
//         </button>
//         <button
//           onClick={() => {
//             openModal();
//             setButton('delete');
//           }}
//           className={styles.deleteButton}
//         >
//           Delete Item
//         </button>
//       </div>
//     </div>
//   )
// }