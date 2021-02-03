import { Route, Redirect } from 'react-router-dom';
import React from 'react';

interface ProtectedRouteI {
  path: string;
}

const AuthenticatedRoute: React.FC<ProtectedRouteI> = ({ path, children, ...rest }) => {
  // eslint-disable-next-line no-constant-condition
  return <Route {...rest} render={(routeProps: any) => (false ? children : <Redirect to={'/login'} />)} />;
};

export default AuthenticatedRoute;
