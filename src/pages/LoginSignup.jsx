import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import { onLogin, onSignup } from '../store/actions/userActions';
import { FormikForm } from '../cmps/FormikForm';

export const LoginSignup = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    const path = location.pathname.slice(1);
    setIsLogin(path !== 'register');
  }, [location]);

  const onFormSubmit = async (creds, { setSubmitting }) => {
    if (isLogin) {
      try {
        await dispatch(onLogin(creds));
        handleFormSubmissionSuccess(setSubmitting);
      } catch (err) {
        setError('Wrong username/password. Please try again.');
      }
    } else {
      try {
        await dispatch(onSignup(creds));
        handleFormSubmissionSuccess(setSubmitting);
      } catch (err) {
        // This is bad - should check if user exists or if it was a server problem
        setError('Failed to sign up. Please try again.');
      }
    }
  };

  const handleFormSubmissionSuccess = setSubmitting => {
    setSubmitting(false);
    setError('');
    navigate('/toy');
  };

  return (
    <section className='login-signup'>
      <div className='form-wrapper'>
        {isLogin ? (
          <Login
            navigate={navigate}
            onFormSubmit={onFormSubmit}
            error={error}
          />
        ) : (
          <Signup
            navigate={navigate}
            onFormSubmit={onFormSubmit}
            error={error}
          />
        )}
      </div>
    </section>
  );
};

/*  
memo is un-needed, since anyway LoginSignup only state is isLogin, so in any case LoginSignup re-renders,
we will want Login/Signup to render as well.
*/
const Login = ({ navigate, onFormSubmit, error }) => {
  const initialValues = {
    username: '',
    password: '',
  };

  const formFields = [
    {
      name: 'username',
      label: 'Username',
      required: true,
      type: 'text',
    },
    {
      name: 'password',
      label: 'Password',
      required: true,
      type: 'password',
    },
  ];

  return (
    <div className='login'>
      <h2>Log in to your account</h2>
      <FormikForm
        initialValues={initialValues}
        fields={formFields}
        buttonText='Login'
        error={error}
        onFormSubmit={onFormSubmit}
      />
      <p className='navigation'>
        Don't have an account yet?{' '}
        <span
          onClick={() => {
            navigate('/register', { replace: true });
          }}
        >
          Register now.
        </span>
      </p>
    </div>
  );
};

const Signup = ({ navigate, onFormSubmit, error }) => {
  const initialValues = {
    fullname: '',
    username: '',
    password: '',
  };

  const formFields = [
    {
      name: 'fullname',
      label: 'Full name',
      required: true,
      type: 'text',
    },
    {
      name: 'username',
      label: 'Username',
      required: true,
      type: 'text',
    },
    {
      name: 'password',
      label: 'Password',
      required: true,
      type: 'password',
    },
  ];

  return (
    <div className='signup'>
      <h2>Create an account</h2>
      <FormikForm
        initialValues={initialValues}
        fields={formFields}
        buttonText='Sign up'
        error={error}
        onFormSubmit={onFormSubmit}
      />
      <p className='navigation'>
        Already have an account?{' '}
        <span
          onClick={() => {
            navigate('/login', { replace: true });
          }}
        >
          Sign in.
        </span>
      </p>
    </div>
  );
};
