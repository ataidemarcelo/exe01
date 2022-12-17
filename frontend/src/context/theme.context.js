import { createContext, useContext, useState } from 'react';

const ThemeContext = createContext(null);

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    const theme = localStorage.getItem('@BlogAPI:theme:');

    if (theme) {
      return theme;
    }

    return 'light';
  });

  const toggleTheme = () => {
    setTheme((curr) => curr === 'light' ? 'dark' : 'light');

    // Ver como usar de forma assincrona o setTheme 
    const newTheme = theme === 'light' ? 'dark' : 'light';
    localStorage.setItem('@BlogAPI:theme:', newTheme)
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className="wrapper" id={theme}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

const useTheme = () => {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }

  return context;
};

export { ThemeProvider, useTheme };
