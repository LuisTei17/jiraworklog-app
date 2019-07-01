import React from 'react';
import PrivateRoute from './shared/components/PrivateRoutes';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from './components/login/Login';
import Dashboard from './components/dashboard/Dashboard';

function App() {
  return (
    <div className="App">
      <Router>
          <PrivateRoute path="/dashboard" component={Dashboard} />
          <Route path="/" component={Login} />
      </Router>
    </div>
  );
}

export default App;
