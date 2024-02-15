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
import Card from "./components/card/index.js";
import Model from "./components/customModal/indes.js";
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
                <Card
                  key={item.id}
                  item={item}
                  onEdit={() => {
                    setSelectedItem(item);
                    setOpenModal(true);
                  }}
                  onDelete={() => handleDeleteItem(item.id)}
                />
              ))}

              <Model
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
