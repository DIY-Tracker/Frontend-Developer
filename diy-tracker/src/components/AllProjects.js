import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import ProjectCard from './ProjectCard';

const useStyles = makeStyles(theme => ({
  root: {
    margin: '20px auto',
    padding: '40px',
    width: '80%',
  },
  button: {
    margin: theme.spacing(1),
  }
}));

const AllProjects = () => {
  const classes = useStyles();
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
      <Grid className={classes.root}> 
        <Grid container spacing={3}>
          {allProjects.map(project => {
            return (
              <Grid item xs={6}>
                <ProjectCard key={project.id} project={project} />
              </Grid>
            )
          })}
        </Grid>
      </Grid>
    </div>
    
  )
}

export default AllProjects;