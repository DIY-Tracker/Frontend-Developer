import React, { useState, useEffect, useContext } from 'react';
import { axiosWithAuth } from '../utils/axiosWithAuth';

//contexts
import { ProjectContext } from '../contexts/ProjectContext';

const initialProject = {
projectName : "",
description : "",
photoUrl : "",
materials : [],
steps : []
};

const EditForm = props => {
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
        window.location =`/projects/project/${project.projectId}`;
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
        window.location = "/allprojects";
      })
      .catch(err => console.log(err.response));
  }
  return (
    <div>
      <h2>Edit Project</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="projectName"
          onChange={changeHandler}
          placeholder="Title"
          value={project.projectName}
        />
        <div className="baseline" />

        <input
          type="text"
          name="description"
          onChange={changeHandler}
          placeholder="Description"
          value={project.description}
        />
        <div className="baseline" />

        <input
          type="text"
          name="photoUrl"
          onChange={changeHandler}
          placeholder="Photo URL"
          value={project.photoUrl}
        />
        <div className="baseline" />

        <input
          type="text"
          name="materials"
          onChange={changeHandler}
          placeholder="Materials"
          value={project.materials}
        />
        <div className="baseline" />

        <input
          type="text"
          name="steps"
          onChange={changeHandler}
          placeholder="Steps"
          value={project.steps}
        />
        <div className="baseline" />

        <button type="submit">Edit</button>
        <button onClick= { () => deleteProject(project)}>Delete</button>
      </form>
    </div>
  );

};
export default EditForm;