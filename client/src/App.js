import 'bootstrap/dist/css/bootstrap.min.css';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Landing from './components/molecules/landing/index';
import { AppContextProvider } from './context/AppContext';
import UploadPage from './pages/uploadPost/index';
import HirePage from './pages/hire/index';

function App() {
  return (
    <AppContextProvider>
      <Router>
        <Switch>
          <Route path='/landing' component={Landing} />
          <Route path='/upload' component={UploadPage} />
          <Route path='/hire' component={HirePage} />
        </Switch>
      </Router>
    </AppContextProvider>
  );
}

export default App;
