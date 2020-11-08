import React, { useReducer } from 'react';
import authContext from './authContext';
import authReducer from './authReducer';

import { AUTHENTICATED_USER } from '../../types';

import clienteAxios from '../../config/axios';

const AuthState = ({children}) => {

  const initialState = {
    token: '',
    authenticated: null,
    user: null,
    message: null
  }

  const [ state, dispath ] = useReducer(authReducer, initialState);

  const registerUser = async data => {
    try {
      const response = await clienteAxios.post('/api/users', data);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }

  const authenticatedUser = name => {
    dispath({
      type: AUTHENTICATED_USER,
      payload: name
    })
  }

  return(
    <authContext.Provider
      value={{
        token: state.token,
        authenticated: state.authenticated,
        user: state.user,
        message: state.message,
        registerUser,
        authenticatedUser
      }}
    >
      {children}
    </authContext.Provider>
  )
}

export default AuthState;
