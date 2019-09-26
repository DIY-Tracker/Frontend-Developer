import React, { useState, useEffect } from 'react';
import { withFormik, Field, Form, FieldArray } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import { TextField } from 'formik-material-ui';
import Card from "@material-ui/core/Card";
import InputAdornment from '@material-ui/core/InputAdornment';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';

import { axiosWithAuth } from '../utils/axiosWithAuth'; 

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

const AddProjectForm = ({ values, touched, errors, status, setFieldValue }) => {
  const classes = useStyles();
  const [projects, setProjects] = useState({});

  useEffect(() => {
    if (status) {
      setProjects({ ...projects, status })
    }
  }, [status])
  
  return (
    <Card className={classes.container}>
      <Form className={classes.form}>
        <Field type='projectName' name='projectName' placeholder='Enter Project Name' component={TextField} label='Project Name'
          className={classes.textField} margin='normal' variant='outlined' />
        {touched.projectName && errors.projectName && (<p>{errors.projectName}</p>)}
        <Field type='description' name='description' placeholder='Enter Project Description' component={TextField} label='Project Description'
          className={classes.textField} margin='normal' variant='outlined' />
        {touched.description && errors.description && (<p>{errors.description}</p>)}  
        {values.photoUrl && (<img src={values.photoUrl} alt='Project Image'/>)}
        <Field type='photoUrl' name='photoUrl' placeholder='Enter Photo URL' component={TextField} label='Photo URL'
          className={classes.textField} margin='normal' variant='outlined' />
        {touched.photoUrl && errors.photoUrl && (<p>{errors.photoUrl}</p>)}
        
        <FieldArray
          name='materials'
          render={arrayHelpers => (
            <div>
              <div>
                <label>Materials Required</label>
              </div>
              {
                values.materials.map((material, index) => (
                  <div key={index}>
                    <Field name={`materials.${index}`} placeholder={`Material ${index + 1}`} label={`Material ${index + 1}`} component={TextField}
                      className={classes.textField} margin='normal' variant='outlined'
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              edge="end"
                              onClick={() => {
                                values.materials.length > 1 ?
                                arrayHelpers.remove(index) :
                                setFieldValue('materials', [''])
                              }}
                            >
                              <CloseIcon />
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  </div>
                ))
              }
              <Button type="button" className={classes.button} variant='contained' size='small' onClick={() => arrayHelpers.push("")}>
                Add materials
              </Button>
            </div>
          )}
        />
        
        <FieldArray
          name='steps'
          render={arrayHelpers => (
            <div>
              <div>
                <label>Steps</label>
              </div>
              {
                values.steps.map((step, index) => (
                  <div key={index}>
                    <Field name={`steps.${index}`} placeholder={`Step ${index + 1}`} label={`Step ${index + 1}`} component={TextField}
                      className={classes.textField} margin='normal' variant='outlined'
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              edge="end"
                              onClick={() => {
                                values.steps.length > 1 ?
                                arrayHelpers.remove(index) :
                                setFieldValue('steps', [''])
                              }}
                            >
                              <CloseIcon />
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  </div>
                ))
              }
              <Button type="button" className={classes.button} variant='contained' size='small' onClick={() => arrayHelpers.push("")}>
                Add Steps
              </Button>
            </div>
          )}
        />
        <Button type='submit' className={classes.mainbutton} variant='contained' color='primary' size='large' >Submit</Button>
      </Form>
    </Card>
  )
}

const FormikAddProjectForm = withFormik({
  mapPropsToValues({ projectName, materials, steps, photoUrl, description, match }) {
    // console.log('history props are', match)
    return {
      projectName: projectName || '',
      materials: materials || [''],
      steps: steps || [''],
      photoUrl: photoUrl || '',
      description: description || ''
    }
  },

  validationSchema: Yup.object().shape({
  projectName: Yup.string().required('Project Name is required'),
  photoUrl: Yup.string().required('Please add URL of the image you want to upload'),
  description: Yup.string().required('Please add a brief description of the project'),
  materials: Yup.array().of(Yup.string().required('Material required')),
  steps: Yup.array().of(Yup.string().required('Step required'))  
  }),

  handleSubmit(values, { setStatus, resetForm, props }) {
    console.log(props);
    console.log(values);
    const userId = props.match.params.userId;
;    // axios.post('https://diy-tracker.herokuapp.com/projects/projects/13', values)
    axiosWithAuth()
      .post(`/projects/projects/${userId}`, values)
        .then(response => {
          console.log(response);
          setStatus(response.data);
          resetForm();
          props.history.push(`/users/${props.match.params.userId}`)
        })
        .catch(error => { 
          console.log(error);
        })
    // console.log('Form submitted');
  }

})(AddProjectForm);

export default FormikAddProjectForm;
