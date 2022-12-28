import React, { createContext, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { useError } from './error.context';

const AuthContext = createContext(null);


const AuthProvider = ({ children }) => {
  const history = useHistory();
  const { setErrorMessage } = useError();

  const [isLoading, setIsLoading] = useState(false);

  const signIn = async ({ email, password }) => {
    setIsLoading(true);
    // Fazer a chamada para API
    const response = await fetch('http://localhost:3001/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'Application/json'
      },
      body: JSON.stringify({
        email,
        password,
      })
    });

    const result = await response.json();
    // Em caso de Erro
    if (response.status === 400) {
      const newError = new Error('Campo inválido!!!');
      setIsLoading(false);
      throw newError;
    }

    const { token } = result;

    localStorage.setItem('@BlogAPI:token:', token);
    history.push('/posts');

    setIsLoading(false);
  };

  const getUser = async (token) => {
    try {
      const response = await fetch('http://localhost:3001/users/me', {
        method: 'GET',
        headers: {
          'Content-Type': 'Application/json',
          Authorization: token
        },
      });
  
      if (!response.ok) {
        const newError = new Error('Token inválido!');
        history.push('/signin');
        throw newError;
      }
  
      const result = await response.json();
      console.log(result);
  
      return result;
    } catch (err) {
      setErrorMessage(err.message);
      return;
    }
  }

  return (
    <AuthContext.Provider value={{ isLoading, signIn, getUser }}>
      {children}
    </AuthContext.Provider>
  );
}

const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within a AuthProvider');
  }

  return context;
};

export { AuthProvider, useAuth };
