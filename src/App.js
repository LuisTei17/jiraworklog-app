import React from 'react';
import Login from './components/login/Login';
import Dashboard from './components/dashboard/Dashboard';
import { BrowserRouter as Router, Redirect, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/login" component={Login} />
      </Router>
    </div>
  );
}

export default App;
