import React, { useState ,useEffect} from "react";
import styles from "./App.module.css";
import { Delete , Mask, Profile} from '../src/assets/images';
import { Drawer } from "./components/drawer";
import { Modal } from "./components/customModal";
import { ItemForm } from "./components/ItemForm/ItemForm";
import PostCard from "./components/PostCard"
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
  const item = ''
  return (
    <>
      <div className={styles.name}>
        <div className={styles.container1}>
          <nav className={styles.nav}>
            <h1>CUSTOMERS</h1>
          </nav>
          <main className={styles.main}>
            <div className={styles.mainContain} >
              <div className={styles.mainFirst}>
                <img src={Mask} width={"100%"}/>
                <div className={styles.innerdiv}>
                <img src={Profile} height={"100%"} />
                <div>
                <h3>Ahmad Nur Fawaid</h3>
                <p>@fawait</p>
                </div>
                <div className={styles.EditButton}>
                <img src={Delete} height={"20px"}/>
                <button>Edit</button>
                </div>
                </div>
              </div>
              <div className={styles.divmain}>
              <div className={styles.divside}>
                <div className={styles.leftdiv1}>
                <h3>About</h3>
                <p>{item ? item?.desc :"hi this is muhammad junaid hbdjsjxjdcjn"}</p>
                <div className={styles.icons}>
                  <div>
                  <h4>Posts</h4>
                  <h3>{item ? item?.like :"1.3K"}</h3>
                  </div>
                  <div>
                  <h4>Posts</h4>
                  <h3>{item ? item?.like :"1.3K"}</h3>
                  </div>
                  <div>
                  <h4>Posts</h4>
                  <h3>{item ? item?.like :"1.3K"}</h3>
                  </div>
                </div>
                <div className={styles.div1img}>
                  <img src={Delete} height={"40px"} />
                  <p>{item ? item?.location :"hbdjsjxjdcjn"}</p>
                </div>
                <div className={styles.div1img}>
                  <img src={Delete} height={"40px"} />
                  <p>{item ? item?.location :" hbdjsjxjdcjn"}</p>
                </div>
                <div className={styles.div1img}>
                  <img src={Delete} height={"40px"} />
                  <p>{item ? item?.location :" hbdjsjxjdcjn"}</p>
                </div>
                <div className={styles.div1img}>
                  <img src={Delete} height={"40px"} />
                  <p>{item ? item?.location :" hbdjsjxjdcjn"}</p>
                </div>
                <div className={styles.div1img}>
                  <img src={Delete} height={"40px"} />
                  <p>{item ? item?.location :" hbdjsjxjdcjn"}</p>
                </div>
              </div>
              <div className={styles.leftdiv2}>
              <p>photos</p>
                <div className={styles.imgdivright}>
                  <img src={Mask} height={"80px"} width={"40%"} />
                  <img src={Mask} height={"80px"} width={"40%"}/>
                  <img src={Mask} height={"80px"} width={"40%"}/>
                  <img src={Mask} height={"80px"} width={"40%"}/>
                </div>
              </div>
              </div>
              <div className={styles.rightdiv}>
              <div className={styles.rightdiv1}>
                <img src={Delete} height={"50px"} className={styles.rightdiv1img}/>
                <input type="name" placeholder="Post something..."/>
                <img src={Delete} height={"50px"} />
              </div>
              <PostCard/>
              </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default App;

