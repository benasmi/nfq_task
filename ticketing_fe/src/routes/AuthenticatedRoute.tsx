import { Route, Redirect } from 'react-router-dom';
import React, { useContext } from 'react';
import { getCookie, isAuthenticated } from '../utils/cookieService';

interface ProtectedRouteI {
  path: string;
}

const AuthenticatedRoute: React.FC<ProtectedRouteI> = ({ path, children, ...rest }) => {
  const token = getCookie('jwt');
  console.log('token', token);
  return <Route {...rest} render={(routeProps: any) => (isAuthenticated() ? children : <Redirect to={'/login'} />)} />;
};

export default AuthenticatedRoute;
