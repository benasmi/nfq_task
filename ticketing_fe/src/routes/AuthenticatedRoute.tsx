import { Route, Redirect } from 'react-router-dom';
import React, { useContext } from 'react';
import { getCookie } from '../utils/cookieService';

interface ProtectedRouteI {
  path: string;
}

const AuthenticatedRoute: React.FC<ProtectedRouteI> = ({ path, children, ...rest }) => {
  const token = getCookie('jwt');
  console.log('token', token);
  // eslint-disable-next-line no-constant-condition
  return <Route {...rest} render={(routeProps: any) => (token !== '' ? children : <Redirect to={'/login'} />)} />;
};

export default AuthenticatedRoute;
