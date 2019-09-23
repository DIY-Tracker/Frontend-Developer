import React, { useState, useEffect } from 'react';
import { withFormik, Field, Form, FieldArray } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

const AddProjectForm = ({ values, touched, errors, status }) => {
  const [ projects, setProjects ] = useState([]);

  useEffect(() => {
    if (status) {
      setProjects([ ...projects, status])
    }
  }, [status])

  return (
    <div>
      <Form>
        <Field type='name' name='name' placeholder='Project Name' />
        {touched.name && errors.name && (<p>{errors.name}</p>)}
        <FieldArray
            name="materials"
            validateOnChange
            render={arrayHelpers => (
              <div>
                {values.materials && values.materials.length > 0 ? (
                  values.materials.map((material, index) => (
                    <div key={index}>
                      <Field name={`materials.${index}`} 
                        validate={value =>
                        value && value.length < 1 ? "Minimum 1 material required" : undefined
                        }
                      />
                      {/* {meta.error && meta.touched && (<p>{'materials required'}</p>)} */}
                      <button
                        type="button"
                        onClick={() => arrayHelpers.remove(index)} // remove a material from the list
                      >
                        Remove
                      </button>
                      <button
                        type="button"
                        onClick={() => arrayHelpers.insert(index, "")} // insert an empty string at a position
                      >
                        Add
                      </button>
                    </div>
                  ))
                ) : (
                  <button type="button" onClick={() => arrayHelpers.push("")}>
                    {/* show this when user has removed all materials from the list */}
                    Add materials
                  </button>
                )}
                {/* <div>
                  <button type="submit">Submit</button>
                </div> */}
              </div>
            )}
          />
        {/* <Field type='materials' name='materials' placeholder='Materials Needed' /> */}
        {/* {touched.materials && errors.materials && (<p>{errors.materials}</p>)} */}
        <Field type='steps' name='steps' placeholder='Steps' />
        {touched.steps && errors.steps && (<p>{errors.steps}</p>)}
        <button type='submit'>Submit</button>
      </Form>
    </div>
  )
}

const FormikAddProjectForm = withFormik({
  mapPropsToValues({ name, materials, steps }) {
    return {
      name: name || '',
      materials: materials || '',
      steps: steps || ''
    }
  },
  validationSchema: Yup.object().shape({
    name: Yup.string()
    .required('Project Name is required'),
    // materials: Yup.array()
    // .of(
    //   Yup.object().shape({
    //     material: Yup.string()
    //       .required('Required'), // these constraints take precedence
    //   })
    // )
    // .required('Must have materials') // these constraints are shown if and only if inner constraints are satisfied
    // .min(3, 'Minimum of 3 materials'),
    materials: Yup.string()
    .required('The materials needed for the project are required'),
    steps: Yup.string()
    .required('Steps are required. If the project is not yet complete just list the steps that you have completed till now')
  }),
  handleSubmit( values, { setStatus, resetForm }) {
    console.log(values);
    axios.post('https://reqres.in/api/users', values) 
      .then(response => {
        console.log(response);
        setStatus(response.data);
        resetForm();
      })
      .catch(error => {
        console.log(error);
      })
  }

})(AddProjectForm);

export default FormikAddProjectForm;
