import {
  SUCCESSFULL_REGISTRATION,
  ERROR_REGISTRATION,
  CLEAN_ALERT,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  AUTHENTICATED_USER,
  LOG_OUT
} from '../../types';

export default (state, action) => {
  switch(action.type) {
    case SUCCESSFULL_REGISTRATION:
    case ERROR_REGISTRATION:
    case LOGIN_ERROR:
      return {
        ...state,
        message: action.payload
      }
    case LOGIN_SUCCESS:
      localStorage.setItem('token', action.payload);
      return {
        ...state,
        token: action.payload,
        authenticated: true
      }
    case CLEAN_ALERT:
      return {
        ...state,
        message: null
      }
    case AUTHENTICATED_USER:
      return {
        ...state,
        user: action.payload
      }
    case LOG_OUT:
      localStorage.removeItem('token');
      return {
        ...state,
        user: null,
        token: null,
        authenticated: null
      }
    default:
      return state;
  }
}
