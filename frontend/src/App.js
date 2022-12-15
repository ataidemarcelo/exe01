import { Route, Switch } from 'react-router-dom';

import { ThemeProvider } from './context/theme.context';
import MainHeader from './components/MainHeader';
import HomePage from './pages/Home';
import Dashboard from './pages/Dashboard';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';

import './global.css';

function App() {
  return (
    <ThemeProvider>
      <MainHeader />
      <Switch>
        <Route path="/" exact component={ HomePage } />
        <Route path="/dashboard" component={ Dashboard } />
        <Route path="/signin" component={ SignIn } />
        <Route path="/signup" component={ SignUp } />
      </Switch>
    </ThemeProvider>
  );
}

export default App;
