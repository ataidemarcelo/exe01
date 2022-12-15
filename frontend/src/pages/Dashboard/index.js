import React from 'react';

import Sidebar from '../../components/Sidebar';
import Content from '../../components/Content';

import styles from  './dashboard.module.css';

function Dashboard() { 
  return (
    <main className={styles.main}>
      <Sidebar />
      <Content />
    </main>
  );
};

export default Dashboard;
