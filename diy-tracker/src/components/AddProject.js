import React, { useState, useEffect } from 'react';
import { withFormik, Field, Form, FieldArray } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
// import { Button, Checkbox, Form } from 'semantic-ui-react';



const AddProjectForm = ({ values, touched, errors, status, setFieldValue }) => {
  const [ projects, setProjects ] = useState({});

  useEffect(() => {
    if (status) {
      setProjects({...projects, status})
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
              </div>
            )}
          />
        <FieldArray
          name="steps"
          render={arrayHelpers => (
            <div>
              {values.steps && values.steps.length > 0 ? (
                values.steps.map((step, index) => (
                  <div key={index}>
                    <Field component='textarea' name={`steps.${index}`} 
                      validate={value =>
                      value && value.length < 1 ? "Minimum 1 step required" : undefined
                      }
                    />
                    <button
                      type="button"
                      onClick={() => arrayHelpers.remove(index)} // remove a step from the list
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
                  {/* show this when user has removed all steps from the list */}
                  Add Steps
                </button>
              )}
            </div>
          )}
        />
        <Field type='fileUrl' name='fileUrl' placeholder='File URL' />
        {touched.fileUrl && touched.fileUrl && (<p>{errors.fileUrl}</p>)}
        <button type='submit'>Submit</button> 
      </Form>
    </div>
  )
}

const FormikAddProjectForm = withFormik({
  mapPropsToValues({ name, materials, steps, fileUrl }) {
    return {
      name: name || '',
      materials: materials || '',
      steps: steps || '',
      fileUrl : fileUrl || ''
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
    // materials: Yup.string()
    // .required('The materials needed for the project are required'),
    // steps: Yup.string()
    // .required('Steps are required. If the project is not yet complete just list the steps that you have completed till now'),
    fileUrl: Yup.string()
    .required('Please add URL of the image you want to upload')
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
