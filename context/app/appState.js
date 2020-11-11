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
  CREATE_LINK_ERROR
} from '../../types';

import clienteAxios from '../../config/axios';

const AppState = ({children}) => {

  const initialState = {
    message_file: null,
    name: '',
    original_name: '',
    loading: null
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

  return(
    <appContext.Provider
      value={{
        message_file: state.message_file,
        name: state.name,
        original_name: state.original_name,
        loading: state.loading,
        showAlert,
        uploadFile
      }}
    >
      {children}
    </appContext.Provider>
  );
}

export default AppState;
