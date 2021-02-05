import React, { useContext } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import DashboardPage from './pages/dashboard/DashboardPage';
import IssueTicketPage from './pages/tickets/IssueTicketPage';
import LoginPage from './pages/LoginPage';
import AuthenticatedRoute from './routes/AuthenticatedRoute';
import { AuthContext } from './contexts/AuthContext';
import SpecialistPage from './pages/SpecialistPage';

const App: React.FC = () => {
  const authContext = useContext(AuthContext);

  function RouteSelector() {
    if (!authContext?.profile) {
      return <div>Loading...</div>;
    }
    console.log(authContext.profile);
    return authContext.profile.admin ? <DashboardPage /> : <SpecialistPage />;
  }

  return (
    <Router>
      <Switch>
        <Route path='/tickets'>
          <IssueTicketPage />
        </Route>
        <Route path='/login'>
          <LoginPage />
        </Route>
        <AuthenticatedRoute path='/system'>
          <RouteSelector />
        </AuthenticatedRoute>
      </Switch>
    </Router>
  );
};
export default App;
