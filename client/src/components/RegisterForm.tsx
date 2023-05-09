import React, { useState, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Link } from 'react-router-dom';

interface EmailLoginProps {
  login: (email: string, password: string) => void;
  alerts: string;
  setAlerts: (alerts: string) => void;
}

interface Inputs {
  email: string;
  password: string;
  confirmPassword: string;
}

const EmailLogin: React.FC<EmailLoginProps> = ({
  login,
  alerts,
  setAlerts,
}) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: { email: '', password: '', confirmPassword: '' },
  });
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  return (
    <>
      <div className='flex flex-col '>
        <form
          className='flex flex-col'
          onSubmit={handleSubmit(onSubmit)}
        >
          <label
            className='hidden'
            htmlFor='email'
          >
            Email
          </label>
          <input
            className='mb-2 rounded-lg border-grey border-2 px-3 py-2'
            placeholder='Email'
            id='email'
            {...register('email', {
              required: 'required',
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: 'Entered value does not match email format',
              },
            })}
            type='email'
          />
          {errors.email && (
            <span
              className='fieldError'
              role='alert'
            >
              {errors.email.message}
            </span>
          )}
          <label
            className='hidden'
            htmlFor='password'
          >
            password
          </label>
          <input
            placeholder='Password'
            id='password'
            className='mb-2 rounded-lg border-grey border-2 px-3 py-2'
            {...register('password', {
              required: 'required',
            })}
            type='password'
          />
          {errors.password && (
            <span
              className='fieldError'
              role='alert'
            >
              {errors.password.message}
            </span>
          )}
          <label
            className='hidden'
            htmlFor='password'
          >
            confirm password
          </label>
          <input
            placeholder='Confirm password'
            id='confirmPassword'
            className='mb-2 rounded-lg border-grey border-2 px-3 py-2'
            {...register('password', {
              required: 'required',
            })}
            type='password'
          />
          {errors.confirmPassword && (
            <span
              className='fieldError'
              role='alert'
            >
              {errors.confirmPassword.message}
            </span>
          )}
          <button type='submit'>Log In</button>
        </form>
        <Link
          to='/reset'
          className='link'
        >
          Forgot Password?
        </Link>
        <span>
          New User?
          <Link
            to='/signup'
            className='link'
          >
            Sign Up
          </Link>{' '}
        </span>
      </div>
    </>
  );
};

export default EmailLogin;
