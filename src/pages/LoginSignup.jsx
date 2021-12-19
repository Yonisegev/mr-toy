import React, { useState, useEffect, memo } from 'react';
import { Button, TextField } from '@mui/material';
import { useLocation, useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import { useForm } from '../hooks/useForm';
import { onLogin, onSignup } from '../store/actions/userActions';

export const LoginSignup = () => {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    const path = location.pathname.slice(1);
    setIsLogin(path !== 'register');
  }, [location]);

  const onFormSubmit = (ev, creds) => {
    ev.preventDefault();
    if (isLogin) {
      dispatch(onLogin(creds));
    } else {
      dispatch(onSignup(creds));
    }
  };

  return (
    <section className='login-signup'>
      <div className='form-wrapper'>
        {isLogin ? (
          <Login navigate={navigate} onFormSubmit={onFormSubmit} />
        ) : (
          <Signup navigate={navigate} onFormSubmit={onFormSubmit} />
        )}
      </div>
    </section>
  );
};

/*  
memo is un-needed, since anyway LoginSignup only state is isLogin, so in any case LoginSignup re-renders,
we will want Login/Signup to render as well.
*/
const Login = ({ navigate, onFormSubmit }) => {
  const initialValues = {
    username: '',
    password: '',
  };
  const { formState, register, resetForm } = useForm(initialValues);

  const onLogin = async (ev) => {
    try {
      await onFormSubmit(ev, formState);
      resetForm();
    } catch (err) {
      // TODO: Handle error
    }
  };

  return (
    <div className='login'>
      <h2>Log in to your account</h2>
      <form onSubmit={onLogin} className='login-form flex column'>
        <TextField
          {...register('username')}
          type='text'
          label='Username'
          variant='standard'
          autoComplete='off'
        />
        <TextField
          {...register('password')}
          type='password'
          label='Password'
          variant='standard'
        />
        <Button type='submit' variant='outlined' color='success'>
          Login
        </Button>
      </form>
      <p className='navigation'>
        Don't have an account yet?{' '}
        <span
          onClick={() => {
            navigate('/register', { replace: true });
          }}>
          Register now.
        </span>
      </p>
    </div>
  );
};

const Signup = ({ navigate, onFormSubmit }) => {
  const initialValues = {
    fullname: '',
    username: '',
    password: '',
  };
  const { formState, register, resetForm } = useForm(initialValues);

  const onSignup = async (ev) => {
    try {
      await onFormSubmit(ev, formState);
      resetForm();
    } catch (err) {
      // TODO: Handle signup error
    }
  };

  return (
    <div className='signup'>
      <h2>Create an account</h2>
      <form onSubmit={onSignup}>
        <TextField
          {...register('fullname')}
          type={'text'}
          label='Full name'
          variant='standard'
        />
        <TextField
          {...register('username')}
          type={'text'}
          label='Username'
          variant='standard'
          autoComplete='off'
        />
        <TextField
          {...register('password')}
          type={'password'}
          label='Password'
          variant='standard'
        />
        <Button type='submit' variant='outlined' color='success'>
          Sign up
        </Button>
      </form>
      <p className='navigation'>
        Already have an account?{' '}
        <span
          onClick={() => {
            navigate('/login', { replace: true });
          }}>
          Sign in
        </span>
      </p>
    </div>
  );
};
