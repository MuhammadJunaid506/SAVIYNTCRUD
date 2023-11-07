import React from 'react';
import ItemList from './components/ItemList';
import styles from './global.module.css'

function App() {

  return (
    <header className={styles.container}>
      <nav className={styles.nav}>
        <div className={styles.navItem}></div>
      </nav>
      <div className={styles.myComponent}></div>
      <h1>Items</h1>
      <ItemList />
    </header>
  );
}

export default App;
