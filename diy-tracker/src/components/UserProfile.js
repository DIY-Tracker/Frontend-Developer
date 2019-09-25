import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import ProjectCard from './ProjectCard';

const data = [
  {
    id: 1,
    name: 'quilling',
    description: 'quilling flower',
    materials: ['quilling tool', 'quilling strips', 'crimper'],
    steps: ['Roll the strips', 'Press down on the strips to make a shape', 'Glue it together'],
    fileUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-217KDkYzCJK_F317aWAWs_asjS2JlYlDZBbHXlFYz1-lvGeHLw'
  },
  {
    id: 2,
    name: 'quilling',
    materials: ['quilling tool', 'quilling strips', 'crimper'],
    steps: ['Roll the strips', 'Press down on the strips to make a shape', 'Glue it together'],
    fileUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-217KDkYzCJK_F317aWAWs_asjS2JlYlDZBbHXlFYz1-lvGeHLw'
  },
  {
    id: 3,
    name: 'quilling',
    materials: ['quilling tool', 'quilling strips', 'crimper'],
    steps: ['Roll the strips', 'Press down on the strips to make a shape', 'Glue it together'],
    fileUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-217KDkYzCJK_F317aWAWs_asjS2JlYlDZBbHXlFYz1-lvGeHLw'
  },
  {
    id: 4,
    name: 'quilling',
    materials: ['quilling tool', 'quilling strips', 'crimper'],
    steps: ['Roll the strips', 'Press down on the strips to make a shape', 'Glue it together'],
    fileUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-217KDkYzCJK_F317aWAWs_asjS2JlYlDZBbHXlFYz1-lvGeHLw'
  },

]

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
  useEffect(() => {
    const getProjects = () => {
      // axios
      //   .get('https://my.api.mockaroo.com/diydummydata.json?key=8c104da0')
      //   .then(response => {
      //     console.log(response);
      //     setProjects(response.data)
      //   })
      //   .catch(error => {
      //     console.log('Server Error', error);
      //   })
      setProjects(data);
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