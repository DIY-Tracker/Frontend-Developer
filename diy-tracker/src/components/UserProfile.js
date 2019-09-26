import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import ProjectCard from './ProjectCard';
import { axiosWithAuth} from '../utils/axiosWithAuth.js';

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

const UserProfile = props => {
  // console.log(props);
  const classes = useStyles();
  const [ projects, setProjects ] = useState([])
  const userId = props.match.params.userId;
  // console.log(localStorage.getItem('token'));
  useEffect(() => {
    const getProjects = () => {
      // axiosWithAuth()
      //   .get(`/users/user/${userId}`)
      axios
        .get(`https://diy-tracker.herokuapp.com/users/user/${userId}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        })
        .then(response => {
          // console.log(response);
          response.data.projects.sort((a, b) => b.projectId - a.projectId);
          setProjects(response.data.projects);
        })
        .catch(error => {
          console.log('Server Error', error);
          if (error.response.status === 401) {
            props.history.push('/login');
          }
          
        })
      
    }
    getProjects();
  }, []);

  

  return (
    <div>
      <h1>My Projects</h1>
      {/* <Link to={`${props.match.url}/add`}> */}
        <Button className={classes.button} variant='contained' color='primary' size='medium'
          onClick={()=> props.history.push(`/users/${props.match.params.userID}/add`)}>
          Create New Project
        </Button>
      {/* </Link> */}
      <div className={classes.root}>
        <Grid container spacing={3}>
            {projects.map(project => {
                return (
                  <Grid item xs={6}>
                    <ProjectCard key={project.projectId} project={project} />
                  </Grid>  
                )              
              })}
        </Grid> 
      </div>
    </div>
  )
}

export default UserProfile;