import React from 'react';
import { Route } from 'react-router-dom';
import Login from './components/Login';
import { Navbar } from './components/Navbar';
import SignUp from './components/SignUp'

import UserProfile from './components/UserProfile';
import AddProject from './components/AddProject';
import './App.css';

function App() {
  return (
    <div className="App">
      <Navbar />
      <h1>DIY Tracker</h1>
      <Route path="/login" component={Login}/>       
      <Route path="/signup" component={SignUp}/>   

      <Route exact path='/users/:userId' component={UserProfile} />
      <Route path='/users/:userId/add' component={AddProject} />
    </div>
  );
}

export default App;
