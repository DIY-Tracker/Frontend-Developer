import React from 'react';
import Login from './Login';
import SignUp from './SignUp';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import styled from 'styled-components';

import './App.css';

const StyledLink = styled(Link)`
    text-decoration: none;
    margin-right:50px;
    padding:5px;
    color: magenta;
    }
`;
function App() {
  return (
    <Router>
    <div className="App">
      <h1>DIY Tracker</h1>
      <div className="navBar">
      <StyledLink to="/login">Login</StyledLink>
      <StyledLink to="/signup">Sign Up</StyledLink>

      </div>
      <Route path="/login" component={Login}/>  
      <Route path="/signup" component={SignUp}/>   

    </div>
    </Router>
  );
}

export default App;
