import React, {useState, createContext} from 'react';
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


const projectData = {
  title: 'Build Table',
  image: 'URL image string',
  steps: ['get wood', 'cut wood', 'put wood together'],
  materials: ['wood', 'saw','hammer','nails']
}


function App() {
  const [projects] = useState(projectData);

  return (
    <ProjectContext.Provider value={projects}>
    <Router>
    <div className="App">
      <Navbar />
      <h1>DIY Tracker</h1>
      <Route path="/login" component={Login}/>       
      <Route path="/signup" component={SignUp}/>
      <Route path="/editproject" component={EditForm}/>   

      <Route path='/users/:userId' component={UserProfile} />
      <Route path='/users/:userId/add' component={AddProject} />
    </div>
    </Router>
    </ProjectContext.Provider>
  );
}

export default App;
