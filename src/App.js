import React from 'react';
import Login from './components/login/login';
import Dashboard from './components/dashboard/dashboard';
import PrivateRoute from './shared/components/PrivateRoutes';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <div>
          <Route path="/login" component={Login} />
          <PrivateRoute path="/dashboard" component={Dashboard} />
        </div>
      </Router>
    </div>
  );
}

export default App;
