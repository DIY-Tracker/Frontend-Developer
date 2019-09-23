import React from 'react';
import Login from './Login';
import SignUp from './SignUp';
import { Navbar } from './Navbar';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import './App.css';

function App() {
  return (
    <Router>
    <div className="App">
    <Navbar />
      <h1>DIY Tracker</h1>
      <Route path="/login" component={Login}/>  
      <Route path="/signup" component={SignUp}/>   

    </div>
    </Router>
  );
}

export default App;
