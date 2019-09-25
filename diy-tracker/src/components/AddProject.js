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
        <Field type='name' name='name' placeholder='Enter Project Name' component={TextField} label='Project Name'
          className={classes.textField} margin='normal' variant='outlined' />
        {touched.name && errors.name && (<p>{errors.name}</p>)}
        <Field type='description' name='description' placeholder='Enter Project Description' component={TextField} label='Project Description'
          className={classes.textField} margin='normal' variant='outlined' />
        {touched.description && errors.description && (<p>{errors.description}</p>)}  
        {touched.name && errors.name && (<p>{errors.name}</p>)}
        {values.fileUrl && (<img src={values.fileUrl} alt='Project Image'/>)}
        <Field type='fileUrl' name='fileUrl' placeholder='Enter File URL' component={TextField} label='File URL'
          className={classes.textField} margin='normal' variant='outlined' />
        {touched.fileUrl && errors.fileUrl && (<p>{errors.fileUrl}</p>)}
        
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
  mapPropsToValues({ name, materials, steps, fileUrl }) {
    return {
      name: name || '',
      materials: materials || [''],
      steps: steps || [''],
      fileUrl: fileUrl || ''
    }
  },
  // validationSchema: Yup.object().shape({
  // name: Yup.string()
  // .required('Project Name is required'),
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
  // fileUrl: Yup.string()
  // .required('Please add URL of the image you want to upload')
  // }),
  handleSubmit(values, { setStatus, resetForm }) {
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
