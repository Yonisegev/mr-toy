import { Formik, Form, Field, ErrorMessage } from 'formik';
import { TextField, Button } from '@mui/material';

import React from 'react';
/*
    This is a reuseable formik form component.
    Props:
    initialValues - initial values for the fields, f.e: {username: '', email: ''}
    fields[] - the attributes for the fields, as an array f.e: [{name: 'username', label: 'Username', required: true, type: 'text'}]
    buttonText: string - The text to display on the submit button
    error: string - an error to display
    onFormSubmit: fn - a submit function handler
*/
export const FormikForm = ({
  initialValues,
  fields,
  buttonText,
  error,
  onFormSubmit,
}) => {
  const textFieldOutlined = props => (
    <TextField {...props} variant='outlined' color='primary' />
  );

  const validateForm = values => {
    const errors = {};
    for (let field of fields) {
      if (field.required && !values[field.name]) {
        errors[field.name] = `${field.label} is required.`;
      }
    }
    return errors;
  };
  
  return (
    <Formik
      initialValues={initialValues}
      validate={validateForm}
      onSubmit={onFormSubmit}
    >
      {({ isSubmitting, handleChange }) => (
        <Form>
          {fields.map((field, idx) => {
            return (
              <React.Fragment key={idx}>
                <Field
                  type={field.type}
                  name={field.name}
                  label={field.label}
                  autoComplete='off'
                  onChange={handleChange}
                  as={textFieldOutlined}
                  key={idx + field.label}
                />
                <ErrorMessage key={field.label + idx} className='error' name={field.name} component='div' />
              </React.Fragment>
            );
          })}
          <Button
            type='submit'
            variant='outlined'
            color='success'
            disabled={isSubmitting}
          >
            {buttonText}
          </Button>
          {error && <div className='error'>{error}</div>}
        </Form>
      )}
    </Formik>
  );
};
