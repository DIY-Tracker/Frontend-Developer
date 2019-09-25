import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import ProjectCard from './ProjectCard';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

const UserProfile = props => {
  // console.log(props);
  const classes = useStyles();
  const [ projects, setProjects ] = useState([])
  const userId = props.match.params.userId;
  useEffect(() => {
    const getProjects = () => {
      axios
        .get(`https://diy-tracker.herokuapp.com/users/user/${userId}`)
        .then(response => {
          // console.log(response);
          setProjects(response.data.projects);
        })
        .catch(error => {
          console.log('Server Error', error);
        })
      
    }
    getProjects();
  }, []);

  

  return (
    <div>
      <h1>My Projects</h1>
      <div className={classes.root}>
        <Grid container spacing={3}>
          <Grid item sm={6}>
            <Paper className={classes.paper}>
            {projects.map(project => {
              return (
                <ProjectCard key={project.id} project={project} />
              )
            })}
            </Paper>
          </Grid>  
        </Grid> 
      </div>
      <Link to={`${props.match.url}/add`}>
        <button>Create New Project</button>
      </Link>
    </div>
  )
}

export default UserProfile;