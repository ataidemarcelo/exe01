import React, { useEffect } from 'react';

import Sidebar from '../../components/Sidebar';
import Content from '../../components/Content';

import { useAuth } from '../../context/auth.context';

import styles from  './dashboard.module.css';

function Dashboard() { 
  const { getUser, setUser } = useAuth();
  const token = localStorage.getItem('@BlogAPI:token:');

  useEffect(() => {
    const fetchData = async () => {
      const userData = await getUser(token);
      if (!userData) {
        localStorage.removeItem('@BlogAPI:user:');
        localStorage.removeItem('@BlogAPI:token:');
        setUser(null);
        return;
      }
      localStorage.setItem('@BlogAPI:user:', JSON.stringify(userData));
      return;
    };

    fetchData();

  }, [getUser, token, setUser]);

  return (
    <main className={styles.main}>
      <Sidebar />
      <Content />
    </main>
  );
};

export default Dashboard;
