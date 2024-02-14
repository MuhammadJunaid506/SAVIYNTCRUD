// import React, { useState ,useEffect} from "react";
// import styles from "./App.module.css";
// // import ItemList from "./components/ItemList";
// import { Drawer } from "./components/drawer";
// import { Modal } from "./components/customModal";
// import { ItemForm } from "./components/ItemForm/ItemForm";
// import { useDispatch, useSelector } from 'react-redux';
// import { createItem, deleteItem, fetchItems, updateItem } from './redux/itemSlice';
// import { Card } from "./components/card";
// import {getListLocalStorage} from "./redux/itemSlice"

// const App = () => {
//   const dispatch = useDispatch();
//   const { items, status, error } = useSelector((state) => state.items);
//   const [open, setOpen] = useState(false);
//   const [selectedTab, setSelectedTab] = useState("home");
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [button, setButton] = useState("Create")
//   const [text,setText] = useState("")
//   const [heading, setHeading] = useState("ADD NEW CUSTOMER")

//   useEffect(() => {
//     if (status === 'idle') {
//       dispatch(fetchItems());
//     }
//   }, [status, dispatch]);

//   const handleItemAction = (actionType, item) => {
//     switch (actionType) {
//       case 'create':
//         dispatch(createItem(item));
//         break;
//       case 'update':
//         dispatch(updateItem(item));
//         break;
//       case 'delete':
//         dispatch(deleteItem(item.id));
//         break;
//       default:
//     }
//   };

//   if (status === 'loading') {
//     return <div>Loading...</div>;
//   }

//   if (status === 'failed') {
//     return <div>Error: {error}</div>;
//   }
//   const openModal = () => {
//     setIsModalOpen(true);
//   };

//   const closeModal = () => {
//     setIsModalOpen(false);
//   };

//   const toggleDrawer = () => {
//     setOpen(!open);
//   };

//   const handleTabChange = (tabName) => {
//     setSelectedTab(tabName);
//   };

//   const handleSubmit = (item) => {
//     const actionType = button === 'Create' ? 'create' : 'update';
//     handleItemAction(actionType, item);
//   };
//   const handleadd = ()=>{
//     setHeading("ADD NEW CUSTOMER")
//     setText("")
//     setButton("ADD CUSTOMER")
//     openModal()
//   }
//   const itemList = getListLocalStorage()
//   console.log(itemList)
//   return (
//     <>
//       <div className={styles.name}>
//         <div className={styles.drawer1}>
//           <Drawer
//             open={open}
//             selectedTab={selectedTab}
//             handleTabChange={handleTabChange}
//           />
//         </div>
//         <div className={styles.container1}>
//           <nav className={styles.nav}>
//           <div onClick={toggleDrawer} className={styles.horizantal}><hr className={styles.line}/><hr className={styles.line} />
//             <hr className={styles.line} /></div>
//             <h1>CUSTOMERS</h1>
//           </nav>
//           <main className={styles.main}>
//             <div className={styles.mainContain} >
//               <button className={styles.mainContainitem} onClick={handleadd}>ADD NEW CUSTOMER</button>
//               <Modal isOpen={isModalOpen} closeModal={closeModal} text={text} heading={heading}>
//               <ItemForm button={button}
//                 onSubmit={handleSubmit}
//                 />
//                 </Modal>
//                 <div></div>
//                 {items.map((item) => (
//                   <Card item={item} openModal={openModal} setButton={setButton} setHeading={setHeading} setText={setText} key={item?.id} handleItemAction={handleItemAction}/>
//                 ))}
//             </div>
//           </main>
//         </div>
//       </div>
//     </>
//   );
// };

// export default App;

// import React, { useState, useEffect, useCallback , useMemo } from 'react';
// import styles from "./App.module.css";
// import { useDispatch, useSelector } from 'react-redux';
// import { createItem, updateItem, deleteItem } from './redux/itemSlice';
// import {fetchItemsAsync} from './redux/itemThunks'
// import { Drawer } from "./components/drawer";
// import { Modal } from "./components/customModal";
// import { ItemForm } from "./components/ItemForm/ItemForm";
// import { Card } from "./components/card";
// import { getListLocalStorage } from './redux/localStorageUtils';

// const App = () => {
//   const dispatch = useDispatch();
//   const { items, status, error } = useSelector((state) => state.items);
//   const [open, setOpen] = useState(false);
//   const [selectedTab, setSelectedTab] = useState('home');
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [button, setButton] = useState('Create');
//   const [text, setText] = useState('');
//   const [heading, setHeading] = useState('ADD NEW CUSTOMER');
//   const [selectedItem, setSelectedItem] = useState(null);
//   const [newCustomer, setNewCustomer] = useState({});

//   useEffect(() => {
//     dispatch(fetchItemsAsync());
//   }, [dispatch]);

//   const handleItemAction = useCallback(
//     (actionType, item) => {
//       switch (actionType) {
//         case 'create':
//           dispatch(createItem(item));
//           break;
//         case 'update':
//           dispatch(updateItem(item));
//           break;
//         case 'delete':
//           dispatch(deleteItem(item?.id));
//           break;
//         default:
//       }
//     },
//     [dispatch]
//   );

//   const openModal = useCallback(() => {
//     setIsModalOpen(true);
//   }, []);

//   const closeModal = useCallback(() => {
//     setIsModalOpen(false);
//     setSelectedItem(null);
//   }, []);

//   const toggleDrawer = useCallback(() => {
//     setOpen((prevOpen) => !prevOpen);
//   }, []);

//   const handleTabChange = useCallback((tabName) => {
//     setSelectedTab(tabName);
//   }, []);

//   const handleAdd = useCallback(() => {
//     setHeading('ADD NEW CUSTOMER');
//     setText('');
//     setButton('Create');
//     openModal();
//     setNewCustomer({});
//   }, [openModal, setButton, setHeading, setText, setNewCustomer]);

//   const handleSubmit = useCallback(
//     (item) => {
//       setNewCustomer(item);
//       const actionType = button === 'Create' ? 'create' : button === 'Delete' ? 'delete' : 'update';

//       if (button === 'Create') {
//         const newItem = { ...item, id: items.length + 1 };
//         handleItemAction(actionType, newItem);
//       } else {
//         handleItemAction(actionType, item);
//       }
//       closeModal();
//     },
//     [button, handleItemAction, items, closeModal]
//   );

//   const itemList = useMemo(() => getListLocalStorage(), []);

//   return (
//     <>
//       <div className={styles.name}>
//         <div className={styles.drawer1}>
//           <Drawer open={open} selectedTab={selectedTab} handleTabChange={handleTabChange} />
//         </div>
//         <div className={styles.container1}>
//           <nav className={styles.nav}>
//             <h1 onClick={toggleDrawer}>CUSTOMERS</h1>
//           </nav>
//           <main className={styles.main}>
//             <div className={styles.mainContain}>
//               <button className={styles.mainContainitem} onClick={handleAdd}>
//                 ADD NEW CUSTOMER
//               </button>
//               <Modal isOpen={isModalOpen} closeModal={closeModal} text={text} heading={heading} >
//               <ItemForm button={button} onSubmit={handleSubmit} newCustomer={newCustomer} />
//               </Modal>
//               <div></div>
//               {items.map((item) => (
//                 <Card
//                   key={item.id}
//                   item={item}
//                   openModal={openModal}
//                   setButton={setButton}
//                   setHeading={setHeading}
//                   setText={setText}
//                   handleItemAction={handleItemAction}
//                 />
//               ))}
//             </div>
//           </main>
//         </div>
//       </div>
//     </>
//   );
// };

// export default App;

// App.js
import React, { useEffect, useCallback, useState } from "react";
import styles from "./App.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  createItem,
  updateItem,
  deleteItem,
  sortItems,
} from "./redux/itemSlice";
import { fetchItemsAsync } from "./redux/itemThunks";
import NewCard from "./components/card/NewCard";
import NewModal from "./components/customModal/NewModal";
import { Drawer } from "./components/drawer";
import { FaSort , FaPlus } from "react-icons/fa";
import { RxDragHandleHorizontal } from "react-icons/rx";


const App = () => {
  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.items);
  const [openModal, setOpenModal] = React.useState(false);
  const [selectedItem, setSelectedItem] = React.useState(null);
  const [open, setOpen] = useState(true);
  const [selectedTab, setSelectedTab] = useState("home");
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchItemsAsync());
  }, [dispatch]);

  const handleCreateItem = useCallback(
    (newItem) => {
      dispatch(createItem(newItem));
      setOpenModal(false);
    },
    [dispatch]
  );

  const handleUpdateItem = useCallback(
    (updatedItem) => {
      dispatch(updateItem(updatedItem));
      setOpenModal(false);
    },
    [dispatch]
  );

  const handleDeleteItem = useCallback(
    (itemId) => {
      dispatch(deleteItem(itemId));
      setOpenModal(false);
    },
    [dispatch]
  );

  const handleSort = useCallback(
    (field) => {
      dispatch(sortItems(field));
    },
    [dispatch]
  );

  //   const openModal = useCallback(() => {
  //   setIsModalOpen(true);
  // }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    setSelectedItem(null);
  }, []);

  const toggleDrawer = useCallback(() => {
    setOpen((prevOpen) => !prevOpen);
  }, []);

  const handleTabChange = useCallback((tabName) => {
    setSelectedTab(tabName);
  }, []);

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
            <button className={styles.button} style={{width:"40px", marginLeft:"10px"}} onClick={toggleDrawer}><RxDragHandleHorizontal/></button>
            <h1>CUSTOMERS</h1>
          </nav>
          <main className={styles.main}>
            <div className={styles.mainContain}>
              <button
                className={styles.mainContainitem}
                onClick={() => setOpenModal(true)}
              >                
                <FaPlus/>{"  "}ADD NEW CUSTOMER
              </button>
              <div className={styles.sortbuttons}>
              <p onClick={() => handleSort("id")}>Sort by ID{"  "}<FaSort/></p>
              <p onClick={() => handleSort("first_name")}>
                Sort by First Name{"  "}<FaSort/>
              </p>
              <p onClick={() => handleSort("last_name")}>
                Sort by Last Name{"  "}<FaSort/>
              </p>
              <p onClick={() => handleSort("email")}>Sort by Email{"  "}<FaSort/></p>
              </div>
              {items.map((item) => (
                <NewCard
                  key={item.id}
                  item={item}
                  onEdit={() => {
                    setSelectedItem(item);
                    setOpenModal(true);
                  }}
                  onDelete={() => handleDeleteItem(item.id)}
                />
              ))}

              <NewModal
                isOpen={openModal}
                closeModal={() => {
                  setOpenModal(false);
                  setSelectedItem(null);
                }}
                onSave={selectedItem ? handleUpdateItem : handleCreateItem}
                selectedItem={selectedItem}
              />
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default App;
