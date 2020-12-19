import 'bootstrap/dist/css/bootstrap.min.css';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { useEffect, useContext } from 'react';
import { API, setToken } from './config/api';
import './App.css';
import Landing from './components/molecules/landing/index';
import UploadPage from './pages/uploadPost/index';
import HirePage from './pages/hire/index';
import EditProfile from './pages/editProfile';
import Home from './pages/home/index';
import PrivateRoute from './components/routes/privateRoute/index';
import { AppContext } from './context/AppContext';
import Profile from './pages/profile/index';
import DetailPostPage from './pages/detailPost/index';
import DetailUserPage from './pages/detailUser/index';
import InputFile from './components/atoms/inputFile/index';
import Test from './pages/test';

//? Cek Token on headers
if (localStorage.token) {
  setToken(localStorage.token);
}

function App() {
  const [state, dispatch] = useContext(AppContext);

  //? Auth token
  //* If token existed, web page not redirect to login page
  const loadUser = async () => {
    try {
      const response = await API('/check-auth');

      if (response.status === 401) {
        return dispatch({
          type: 'AUTH_ERROR',
        });
      }

      dispatch({
        type: 'USER_LOADED',
        payload: response.data.data.user,
      });
    } catch (err) {
      return dispatch({
        type: 'AUTH_ERROR',
      });
    }
  };

  //? Check in token after render
  useEffect(() => {
    loadUser();
  }, []);

  return (
    <Router>
      <Switch>
        <Route path='/landing' component={Landing} />
        <PrivateRoute path='/upload' component={UploadPage} />
        <PrivateRoute path='/hire' component={HirePage} />
        <PrivateRoute path='/edit-profile' component={EditProfile} />
        <PrivateRoute path='/profile' component={Profile} />
        <PrivateRoute path='/detail-post' component={DetailPostPage} />
        <Route path='/detail-user' component={DetailUserPage} />
        <Route path='/test' component={Test} />

        <PrivateRoute path='/' component={Home} />
      </Switch>
    </Router>
  );
}

export default App;
