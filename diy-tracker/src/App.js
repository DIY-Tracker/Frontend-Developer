import React from 'react';
import Login from './Login';
import SignUp from './SignUp';
import { Navbar } from './Navbar';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import UserProfile from './components/UserProfile';
import AddProject from './components/AddProject';
import './App.css';

function App() {
  return (
    <Router>
    <div className="App">
    <Navbar />
      <h1>DIY Tracker</h1>
      <Route path="/login" component={Login}/>  
      <Route path="/signup" component={SignUp}/>   

      <Route path='/users/:userId' component={UserProfile} />
      <Route path='/users/:userId/add' component={AddProject} />
    </div>
    </Router>
  );
}

export default App;
