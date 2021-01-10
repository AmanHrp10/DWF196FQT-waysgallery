import { Route, Redirect } from 'react-router-dom';
import { useContext } from 'react';
import { AppContext } from '../../../context/AppContext';
import Loading from '../../atoms/loading';

export default function PrivateRoute({ component: Component, ...rest }) {
  let [state] = useContext(AppContext);
  const { isLogin, isLoading } = state;
  return (
    <Route
      {...rest}
      render={(props) => {
        return isLoading ? (
          <Loading />
        ) : isLogin ? (
          <Component {...props} />
        ) : (
          <Redirect to='/landing' />
        );
      }}
    />
  );
}
