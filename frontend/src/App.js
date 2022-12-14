import { useState, createContext } from 'react';
import { Route, Switch } from 'react-router-dom';

import MainHeader from './components/MainHeader';

import HomePage from './pages/Home';
import Dashboard from './pages/Dashboard';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';

import './global.css';

export const ThemeContext = createContext(null);

function App() {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => setTheme((curr) => (curr === 'light' ? 'dark' : 'light'));

  return (
    <ThemeContext.Provider value={ { theme, toggleTheme } }>
      <div className="wrapper" id={theme}>
        <MainHeader />
        <Switch>
          <Route path="/" exact component={ HomePage } />
          <Route path="/dashboard" component={ Dashboard } />
          <Route path="/signin" component={ SignIn } />
          <Route path="/signup" component={ SignUp } />
        </Switch>
      </div>
    </ThemeContext.Provider>
  );
}

export default App;
