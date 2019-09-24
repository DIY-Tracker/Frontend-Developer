import React, { useState, useEffect, useContext } from 'react';
import { axiosWithAuth } from '../utils/axiosWithAuth';

//contexts
import { ProjectContext } from '../contexts/ProjectContext';

const initialProject = {
  title: '',
  image: '',
  materials: '',
  steps: '',
};

const EditForm = () => {
  const projects = useContext(ProjectContext);
  const [project, setProject] = useState(initialProject);

  // useEffect(() => {
  //   const id = projects.match.params.id;
  //   const projectToUpdate = projects.find(item => `${item.id}` === id); 
  //   if (projectToUpdate) {
  //     console.log(projectToUpdate);
  //     setProject(projectToUpdate);
  //   }
  // }, [projects.match, projects]); 

  const changeHandler = ev => {
    ev.persist();
    let value = ev.target.value;

    setProject({
      ...project,
      [ev.target.name]: value
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    axiosWithAuth()
    .put(``, project) //plug in the endpoint here.
      .then(res => {
        setProject(res.data); //this might have to change
        window.location =`/projects/${project.id}`; //endpoint will have to change
        setProject(initialProject);
      })
      .catch(err => console.log(err.response));
  };

  return (
    <div>
      <h2>Edit Project</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          onChange={changeHandler}
          placeholder="Title"
          value={project.title}
        />
        <div className="baseline" />

        <input
          type="text"
          name="image"
          onChange={changeHandler}
          placeholder="Image URL"
          value={project.image}
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
      </form>
    </div>
  );
};

export default EditForm;