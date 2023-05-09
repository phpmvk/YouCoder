import React, { useState, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Link } from 'react-router-dom';

interface EmailLoginProps {
  login: (email: string, password: string) => void;
  alerts: string;
  setAlerts: (alerts: string) => void;
  authing: boolean;
}

interface Inputs {
  email: string;
  password: string;
}

const EmailLogin: React.FC<EmailLoginProps> = ({
  login,
  alerts,
  setAlerts,
  authing,
}) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>({ defaultValues: { email: '', password: '' } });
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  return (
    <>
      <form
        className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className='mb-6'>
          <label
            className='hidden text-gray-700 text-sm font-bold mb-2'
            htmlFor='email'
          >
            Email
          </label>
          <input
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
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
              className='text-red-500 text-xs italic'
              role='alert'
            >
              {errors.email.message}
            </span>
          )}
        </div>
        <div className='mb-6'>
          <label
            className='hidden text-gray-700 text-sm font-bold mb-2'
            htmlFor='password'
          >
            password
          </label>
          <input
            placeholder='Password'
            id='password'
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline'
            {...register('password', {
              required: 'required',
            })}
            type='password'
          />
          {errors.password && (
            <span
              className='text-red-500 text-xs italic'
              role='alert'
            >
              {errors.password.message}
            </span>
          )}
        </div>
        <div className='flex items-center justify-between mb-6'>
          <button
            type='submit'
            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
            disabled={authing}
          >
            Log In
          </button>
          <Link
            to='/reset'
            className='inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800'
          >
            Forgot Password?
          </Link>
        </div>
        <span className='text-center text-sm text-gray-600'>
          New User?
          <Link
            to='/signup'
            className='text-sm text-blue-500 hover:text-blue-800'
          >
            Sign Up
          </Link>{' '}
        </span>
      </form>
    </>
  );
};

export default EmailLogin;
