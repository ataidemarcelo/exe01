import { Route, Switch } from 'react-router-dom';

import { ThemeProvider } from './context/theme.context';
import { ErrorProvider } from './context/error.context';
import { AuthProvider } from './context/auth.context';

import MainHeader from './components/MainHeader';
import HomePage from './pages/Home';
import Dashboard from './pages/Dashboard';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Posts from './pages/Posts';

import './global.css';

function App() {
  return (
    <ThemeProvider>
      <ErrorProvider>
        <AuthProvider>
          <MainHeader />
          <Switch>
            <Route path="/" exact component={ HomePage } />
            <Route path="/dashboard" component={ Dashboard } />
            <Route path="/signin" component={ SignIn } />
            <Route path="/signup" component={ SignUp } />

            <Route path="/posts" component={ Posts } />
          </Switch>
        </AuthProvider>
      </ErrorProvider>
    </ThemeProvider>
  );
}

export default App;
