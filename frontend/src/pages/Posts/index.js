import React, { useEffect } from 'react';

import { useAuth } from '../../context/auth.context';

function Posts() {
  const { getUser } = useAuth();
  const token = localStorage.getItem('@BlogAPI:token:');

  useEffect(() => {
    const fetchData = async () => {
      const dataUser = await getUser(token);

      console.log(dataUser);
    };

    fetchData();

  }, [getUser, token])

  return (
    <h1>Posts</h1>
  );
}

export default Posts;
