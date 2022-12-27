import React, { useEffect } from 'react';

import { useAuth } from '../../context/auth.context';

function Posts() {
  const { getUser } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      const user = await getUser();

      console.log(user);
    };

    fetchData();

  }, [getUser])

  return (
    <h1>Posts</h1>
  );
}

export default Posts;
