import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import DashboardPage from './pages/DashboardPage';
import IssueTicketPage from './pages/IssueTicketPage';
import LoginPage from './pages/LoginPage';
import AuthenticatedRoute from './routes/AuthenticatedRoute';

const App: React.FC = () => {
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
          <DashboardPage />
        </AuthenticatedRoute>
      </Switch>
    </Router>
  );
};
export default App;
