import React from 'react';
import { Route } from 'react-router-dom';

import UserProfile from './components/UserProfile';
import AddProject from './components/AddProject';
import './App.css';

function App() {
  return (
    <div className="App">
      <h1>DIY Tracker</h1>
      <Route path='/users/:userId' component={UserProfile} />
      <Route path='/users/:userId/add' component={AddProject} />
    </div>
  );
}

export default App;
