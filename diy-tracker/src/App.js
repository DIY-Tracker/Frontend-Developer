import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Login from './components/Login';
import { Navbar } from './components/Navbar';
import SignUp from './components/SignUp'
import EditForm from './components/EditForm';

import UserProfile from './components/UserProfile';
import AddProject from './components/AddProject';
import './App.css';

//contexts
import { ProjectContext } from './contexts/ProjectContext';

function App() {
  const [projects, setProjects] = useState([]);
  useEffect(() => {
    axios
      .get(`https://diy-tracker.herokuapp.com/projects/projects`, {
        params: {}
      })
      .then(response => {
        console.log("Projects:", response);
        setProjects(response.data);
      });
  }, []);
  return (
    <ProjectContext.Provider value={[projects]}>
    <Router>
    <div className="App">
      <Navbar />
      <h1>DIY Tracker</h1>
      <Route path="/login" component={Login}/>       
      <Route path="/signup" component={SignUp}/>
      <Route path="/projects/project" 
      render={props=>{
      return <EditForm {...props} />
        }}
        />  
      <Route path='/users/:userId' component={UserProfile} />
      <Route path='/users/:userId/add' component={AddProject} />
    </div>
    </Router>
    </ProjectContext.Provider>
  );
}

export default App;
