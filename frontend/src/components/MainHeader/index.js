import React from 'react';
import { NavLink } from 'react-router-dom';

import { FiMenu } from 'react-icons/fi';

import styles from './main.header.module.css';

const MainHeader = () => {
  return (
    <header className={styles.header}>

      <div className={styles.headerContent}>
        <div className={styles.toggleMenu} >
          <FiMenu size={22} />
        </div>
        <h1>Blog Api</h1>
        <div className={styles.linkContainer}>
          <NavLink to="/signin" className={styles.btn}>Login</NavLink>
          <NavLink to="/signup" className={styles.btn}>Cadastrar</NavLink>
        </div>
      </div>
      
    </header>
  );
};

export default MainHeader;
