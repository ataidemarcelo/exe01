import React, { useEffect } from 'react';

import { useAuth } from '../../context/auth.context';

function Posts() {
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

  }, [getUser, token, setUser])

  return (
    <h1>Posts</h1>
  );
}

export default Posts;
