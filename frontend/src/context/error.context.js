import { createContext, useState, useContext } from 'react';

const ErrorContext = createContext();

function ErrorProvider({ children }) {
  const [errorMessage, setErrorMessage] = useState('');

  return (
    <ErrorContext.Provider value={ { errorMessage, setErrorMessage } }>
      {children}
    </ErrorContext.Provider>
  );
}

function useError() {
  const context = useContext(ErrorContext);

  if (!context) {
    throw new Error('useError must be used within a ErrorProvider');
  }

  return context;
}

export { ErrorProvider, useError };
