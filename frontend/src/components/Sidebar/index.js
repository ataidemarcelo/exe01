import React from 'react';
import { NavLink } from 'react-router-dom';

import styles from './sidebar.module.css';

function Sidebar() {
  return (
    <section className={styles.sidebar}>
      <h4>Admin</h4>
      <nav>
        <NavLink to="/dashboard/" activeClassName={styles.selected} exact>Home</NavLink>
        <NavLink to="/dashboard/schedule" activeClassName={styles.selected}>Agenda</NavLink>
        <NavLink to="/dashboard/solutions" activeClassName={styles.selected}>Soluções</NavLink>
      </nav>
    </section>
  );
}

export default Sidebar;
