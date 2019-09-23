import React from 'react';
import Login from './Login';
import SignUp from './SignUp';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import './App.css';

function App() {
  return (
    <Router>
    <div className="App">
    <div className="navBar">
      <Link className="styledLink" to="/login">Login</Link>
      <Link className="styledLink" to="/signup">Sign Up</Link>
      </div>
      <h1>DIY Tracker</h1>
      <Route path="/login" component={Login}/>  
      <Route path="/signup" component={SignUp}/>   

    </div>
    </Router>
  );
}

export default App;
