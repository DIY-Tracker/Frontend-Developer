import React, { useState, useEffect, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from "@material-ui/core/Card";
import InputAdornment from '@material-ui/core/InputAdornment';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';

import { axiosWithAuth } from '../utils/axiosWithAuth';

//contexts
import { ProjectContext } from '../contexts/ProjectContext';

const useStyles = makeStyles(theme => ({
  container: {
    width: '1000px',
    margin: '20px auto',
    padding: '1000',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: '500px',
    fontSize: '1rem',
  },
  button: {
    margin: theme.spacing(1),
  },
  mainbutton: {
    margin: theme.spacing(1),
    width: '500px',
  },
  dense: {
    marginTop: theme.spacing(2),
  },
}));


const initialProject = {
projectName : "",
description : "",
photoUrl : "",
materials : [],
steps : []
};

const EditForm = props => {
  const classes = useStyles();
  const projects = useContext(ProjectContext);
  console.log(projects);
  const [project, setProject] = useState(initialProject);
  console.log(props);
  
  const { match } = props;
  useEffect(() => {
    const id = match.params.projectId;
    const projectToUpdate = projects[0].find(item => {
      if (`${item.projectId}` === id) {
        return item
      }
    })

    if (projectToUpdate) {
      setProject(projectToUpdate);
    }
  }, [match, projects]);

  const changeHandler = ev => {
    ev.persist();
    let value = ev.target.value;

    setProject({
      // ...project,
      projectId: project.projectId,
      projectName : project.projectName,
      description : project.description,
      photoUrl : project.photoUrl,
      materials : project.materials,
      steps : project.steps,
      [ev.target.name]: value
    });
  };
  


  const handleSubmit = e => {
    console.log('inside handle submit', project)
    e.preventDefault();
    axiosWithAuth()
    .put(`/projects/project/${project.projectId}`, project)
      .then(res => {
        setProject(res.data);
        axiosWithAuth()
        .get('/users/getusername') 
          .then(response => {
            window.location =(`/users/${response.data.userid}`);
          })
        console.log('ewerew', window.location);
        setProject(initialProject);
      })
      .catch(err => console.log(err.response));
  };

  const deleteProject = project => {
    axiosWithAuth()
      .delete(`/projects/project/${project.projectId}`)
      .then(res => {
        setProject(project);
        axiosWithAuth()
        .get('/users/getusername') 
          .then(response => {
            window.location =(`/users/${response.data.userid}`);
          })
        //  window.location = `/`;
      })
      .catch(err => console.log(err.response));
  }
  return (
    <div>
      <h2>Edit Project</h2>
      <Card className={classes.container}>
        <form onSubmit={handleSubmit} className={classes.form}>
          <input
            type="text"
            name="projectName"
            onChange={changeHandler}
            placeholder="Title"
            value={project.projectName}
            margin='normal'
            variant='outlined'
            className={classes.textField}
            label='Project Name'
          />
          <div className="baseline" />

          <input
            type="text"
            name="description"
            onChange={changeHandler}
            placeholder="Description"
            value={project.description}
            margin='normal'
            variant='outlined'
            className={classes.textField}
          />
          <div className="baseline" />

          <input
            type="text"
            name="photoUrl"
            onChange={changeHandler}
            placeholder="Photo URL"
            value={project.photoUrl}
            margin='normal'
            variant='outlined'
            className={classes.textField}
          />
          <div className="baseline" />

          <input
            type="text"
            name="materials"
            onChange={changeHandler}
            placeholder="Materials"
            value={project.materials}
            margin='normal'
            variant='outlined'
            className={classes.textField}
          />
          <div className="baseline" />

          <input
            type="text"
            name="steps"
            onChange={changeHandler}
            placeholder="Steps"
            value={project.steps}
            margin='normal'
            variant='outlined'
            className={classes.textField}
          />
          <div className="baseline" />

          <Button type="submit" variant='contained' size='small' color='primary'
            className={classes.button}>
              Edit
          </Button>
          <Button onClick= { () => deleteProject(project)} variant='contained' size='small' color='primary'
            className={classes.button}>
              Delete
          </Button>
        </form>
      </Card>
    </div>
  );

};
export default EditForm;