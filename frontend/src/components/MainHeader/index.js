import React from 'react';
import { NavLink } from 'react-router-dom';

import { useTheme } from '../../context/theme.context';
import { FiMenu } from 'react-icons/fi';
import { MdDarkMode, MdLightMode } from 'react-icons/md';

import styles from './main.header.module.css';

function MainHeader() {
  const { theme, toggleTheme } = useTheme();

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
          <div
            onClick={ toggleTheme }
            className={styles.themeMode}
            title={theme === 'dark' ? 'Dark Mode' : 'Light Mode'}
          >
            {theme === 'dark' ? <MdLightMode size={16} color='yellow' /> : <MdDarkMode size={16}/> }
          </div>
        </div>
      </div>
      
    </header>
  );
};

export default MainHeader;
