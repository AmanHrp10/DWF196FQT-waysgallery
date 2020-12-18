import { Route, Redirect } from 'react-router-dom';
import { useContext } from 'react';
import { AppContext } from '../../../context/AppContext';
import Skeleton from 'react-loading-skeleton';

export default function PrivateRoute({ component: Component, ...rest }) {
  let [state] = useContext(AppContext);
  const { isLogin, isLoading } = state;
  return (
    <Route
      {...rest}
      render={(props) => {
        return isLoading ? (
          <Skeleton height={800} />
        ) : isLogin ? (
          <Component {...props} />
        ) : (
          <Redirect to='/landing' />
        );
      }}
    />
  );
}
