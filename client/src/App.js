import 'bootstrap/dist/css/bootstrap.min.css';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { useEffect, useContext } from 'react';
import { API, setToken } from './config/api';
import './App.css';
import Landing from './components/molecules/landing/index';
import UploadPage from './pages/uploadPost/index';
import HirePage from './pages/hire/index';
import EditProfile from './pages/editProfile';
import HomePage from './pages/home/index';
import PrivateRoute from './components/routes/privateRoute/index';
import { AppContext } from './context/AppContext';
import ProfilePage from './pages/profile/index';
import DetailPostPage from './pages/detailPost/index';
import DetailUserPage from './pages/detailUser/index';
import Test from './pages/test';
import Transaction from './pages/transaction/index';
import UploadProjectPage from './pages/uploadProject/index';
import DetailProjectPage from './pages/detailProject/index';

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
        <PrivateRoute path='/hire/:id' component={HirePage} />
        <PrivateRoute path='/edit-profile' component={EditProfile} />
        <PrivateRoute path='/profile' component={ProfilePage} />
        <PrivateRoute path='/detail-post/:id' component={DetailPostPage} />
        <PrivateRoute path='/detail-user/:id' component={DetailUserPage} />
        <PrivateRoute
          path='/detail-project/:id'
          component={DetailProjectPage}
        />
        <PrivateRoute path='/transaction' component={Transaction} />
        <PrivateRoute
          path='/upload-project/:id'
          component={UploadProjectPage}
        />

        <Route path='/test' component={Test} />

        <PrivateRoute path='/' component={HomePage} />
      </Switch>
    </Router>
  );
}

export default App;
