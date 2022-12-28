import React from 'react';
import { Link, NavLink } from 'react-router-dom';

import { useTheme } from '../../context/theme.context';
import { FiMenu } from 'react-icons/fi';
import { MdDarkMode, MdLightMode } from 'react-icons/md';

import { useAuth } from '../../context/auth.context';

import styles from './main.header.module.css';

function MainHeader() {
  const { theme, toggleTheme } = useTheme();
  const { user, isAuthenticated, signOut } = useAuth();

  return (
    <header className={styles.header}>

      <div className={styles.headerContent}>
        <div className={styles.toggleMenu} >
          <FiMenu size={22} />
        </div>

        <h1>
          <Link to="/">
            Blog Api
          </Link>
        </h1>

        <div className={styles.linkContainer}>
          {
              isAuthenticated ? 
              (
                <div style={{
                  display: 'flex',
                  gap: '8px',
                  border: '1px solid gray',
                  borderRadius: '16px',
                  padding: '8px 16px',
                }}>
                  { user.email } 
                  <button
                    onClick={ signOut }
                    title="Logout"
                    style={{
                      backgroundColor: 'black',
                      color: 'white',
                      padding: '1px',
                      border: '1px solid white',
                      width: '18px',
                      height: '18px',
                      borderRadius: '50%',
                      cursor: 'pointer',
                    }}
                  >X</button>
                </div>
              ):
            (
              <>
                <NavLink to="/signin" className={styles.btn}>Login</NavLink>
                <NavLink to="/signup" className={styles.btn}>Cadastrar</NavLink>
              </>

            )
          }
          <div
            onClick={ toggleTheme }
            className={styles.themeMode}
            title={theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
          >
            {theme === 'dark' ? <MdLightMode size={16} color='yellow' /> : <MdDarkMode size={16}/> }
          </div>
        </div>
      </div>
      
    </header>
  );
};

export default MainHeader;
