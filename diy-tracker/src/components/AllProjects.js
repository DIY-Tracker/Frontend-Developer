import React, { useState, useEffect } from 'react';
import axios from 'axios';

import ProjectCard from './ProjectCard';

const AllProjects = () => {
  const [allProjects, setAllProjects] = useState([])

  useEffect(() => {
    const getAllProjects = () => {
      axios
        .get('https://diy-tracker.herokuapp.com/projects/projects')
          .then(response => {
            // console.log(response);
            response.data.sort((a, b) => b.projectId - a.projectId);
            setAllProjects(response.data);
          })
          .catch(error => {
            console.log(error);
          })
    }
    getAllProjects();
  }, [])


  return (
    <div>
      <h1>All Projects</h1>  
      {allProjects.map(project => {
        return (
          <div>
          <ProjectCard key={project.id} project={project} />

          </div>
        )
      })}
    </div>
    
  )
}

export default AllProjects;