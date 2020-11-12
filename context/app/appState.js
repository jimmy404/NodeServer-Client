import React, { useReducer } from 'react';
import appContext from './appContext';
import appReducer from './appReducer';
import {
  SHOW_ALERT,
  CLEAN_ALERT,
  UPLOAD_FILE,
  UPLOAD_FILE_SUCCESS,
  UPLOAD_FILE_ERROR,
  CREATE_LINK_SUCCESS,
  CREATE_LINK_ERROR,
  CLEAR_STATE
} from '../../types';

import clienteAxios from '../../config/axios';

const AppState = ({children}) => {

  const initialState = {
    message_file: null,
    name: '',
    original_name: '',
    loading: null,
    downloads: 1,
    password: '',
    author: null,
    url: ''
  }

  const [ state, dispatch ] = useReducer( appReducer, initialState );

  const showAlert = msg => {
    dispatch({
      type: SHOW_ALERT,
      payload: msg
    });

    setTimeout(() => {
      dispatch({
        type: CLEAN_ALERT
      })
    }, 5000);
  }

  const uploadFile = async (formData, fileName ) => {

    dispatch({
      type: UPLOAD_FILE
    })

    try {
      const result = await clienteAxios.post('/api/files', formData);
      dispatch({
        type: UPLOAD_FILE_SUCCESS,
        payload: {
          name: result.data.file,
          original_name: fileName
        }
      })
      console.log(result)
    } catch (error) {
      dispatch({
        type: UPLOAD_FILE_ERROR,
        payload: error.response.data.msg
      })
      console.log(error)
    }
  }

  const createLink = async () => {
    const data = {
      name: state.name,
      original_name: state.original_name,
      downloads: state.downloads,
      password: state.password,
      author: state.password
    }

    try {
      const result = await clienteAxios.post('/api/links', data);
      dispatch({
        type: CREATE_LINK_SUCCESS,
        payload: result.data.msg
      })
    } catch (error) {
      console.log(error)
    }
  }

  const clearState = () => {
    dispatch({
      type: CLEAR_STATE
    })
  }

  return(
    <appContext.Provider
      value={{
        message_file: state.message_file,
        name: state.name,
        original_name: state.original_name,
        loading: state.loading,
        downloads: state.downloads,
        password: state.password,
        author: state.author,
        url: state.url,
        createLink,
        showAlert,
        uploadFile,
        clearState
      }}
    >
      {children}
    </appContext.Provider>
  );
}

export default AppState;
