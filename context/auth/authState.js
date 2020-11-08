import React, { useReducer } from 'react';
import authContext from './authContext';
import authReducer from './authReducer';

import {
  SUCCESSFULL_REGISTRATION,
  ERROR_REGISTRATION,
  CLEAN_ALERT,
  LOGIN_SUCCESS,
  LOGIN_ERROR
} from '../../types';

import clienteAxios from '../../config/axios';

const AuthState = ({children}) => {

  const initialState = {
    token: typeof window !== 'undefined' ? localStorage.getItem('token') : '',
    authenticated: null,
    user: null,
    message: null,
    loading: null
  }

  const [ state, dispath ] = useReducer(authReducer, initialState);

  const registerUser = async data => {
    try {
      const response = await clienteAxios.post('/api/users', data);
      dispath({
        type: SUCCESSFULL_REGISTRATION,
        payload: response.data.msg
      });

    } catch (error) {
      dispath({
        type: ERROR_REGISTRATION,
        payload: error.response.data.msg
      });
    }
    setTimeout(() => {
      dispath({
        type: CLEAN_ALERT
      })
    }, 3000);
  }

  const authenticatedUser = name => {
    dispath({
      type: AUTHENTICATED_USER,
      payload: name
    })
  }

  const logIn = async data => {
    try {
      const response = await clienteAxios.post('/api/auth', data);
      dispath({
        type: LOGIN_SUCCESS,
        payload: response.data.token
      })
    } catch (error) {
      dispath({
        type: LOGIN_ERROR,
        payload: error.response.data.msg
      })
    }
    setTimeout(() => {
      dispath({
        type: CLEAN_ALERT
      })
    }, 3000);
  }

  return(
    <authContext.Provider
      value={{
        token: state.token,
        authenticated: state.authenticated,
        user: state.user,
        message: state.message,
        loading: state.loading,
        registerUser,
        authenticatedUser,
        logIn
      }}
    >
      {children}
    </authContext.Provider>
  )
}

export default AuthState;
