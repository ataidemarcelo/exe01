import React, { createContext, useState, useContext } from 'react';
import { Route, Redirect, useHistory } from 'react-router-dom';
import { useError } from './error.context';

const AuthContext = createContext({});

const AuthProvider = ({ children }) => {
  const history = useHistory();
  const { setErrorMessage } = useError();

  const [user, setUser] = useState(() => {
    const userData = JSON.parse(localStorage.getItem('@BlogAPI:user:'));
  
    if (userData) {
      return userData;
    }

    return null;
  });
  const [isLoading, setIsLoading] = useState(false);
  const isAuthenticated = !!user;

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

    const { token, user: userData } = result;

    localStorage.setItem('@BlogAPI:token:', token);
    localStorage.setItem('@BlogAPI:email:', userData.email);
    localStorage.setItem('@BlogAPI:user:', JSON.stringify(userData));
    setUser(userData);
    history.push('/posts');

    setIsLoading(false);
  };

  const signOut = () => {
    setUser(null);
    localStorage.removeItem('@BlogAPI:token:');
    localStorage.removeItem('@BlogAPI:user:');
    localStorage.removeItem('@BlogAPI:email:');
    history.push('/');
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
        const newError = new Error('Token expirou, faça Login novamente!');
        history.push('/signin');
        throw newError;
      }
  
      const userData = await response.json();
  
      return userData;
    } catch (err) {
      // console.log(err);
      setErrorMessage(err.message);
      return;
    }
  }

  return (
    <AuthContext.Provider value={{ isLoading, signIn, signOut, getUser, isAuthenticated, user, setUser }}>
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

function PrivateRoute({ children, ...rest }) {
  let { isAuthenticated } = useAuth();
  return (
    <Route
      {...rest}
      render={({ location }) =>
        isAuthenticated ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/signin",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
}

export { AuthProvider, useAuth, PrivateRoute };
