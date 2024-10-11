'use client';

import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { login } from '@/store/auth-slice/auth.slice';
import { AppDispatch } from '@/store/store';
import { IApiPayload } from '@/interfaces/redux-slice.interfaces';
import { ILogin } from '@/interfaces/auth.interfaces';

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<ILogin>();

  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const onSubmit: SubmitHandler<ILogin> = async data => {
    const payload: IApiPayload<ILogin> = {
      payload: data,
      successCallback: data => {
        console.log('Login success:', data);
        router.push('/dashboard');
      }
    };
    try {
      await dispatch(login(payload));
    } catch (error) {
      console.error('Login failed:', error);
      alert('Invalid email or password');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-700">Login</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Email Field */}
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
              Username address
            </label>
            <input
              id="username"
              type="username"
              {...register('username', {
                required: 'Email is required',
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: 'Invalid email address'
                }
              })}
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="you@example.com"
            />
            {errors.username && <p className="text-sm text-red-600">{errors.username.message}</p>}
          </div>
          {/* Password Field */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              id="password"
              type="password"
              {...register('password', {
                required: 'Password is required',
                minLength: {
                  value: 6,
                  message: 'Password must be at least 6 characters long'
                }
              })}
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="••••••••"
            />
            {errors.password && <p className="text-sm text-red-600">{errors.password.message}</p>}
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Sign In
          </button>
        </form>
        <p className="text-sm text-center text-gray-500">
          Dont have an account?{' '}
          <a href="/signup" className="text-blue-600 hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}
