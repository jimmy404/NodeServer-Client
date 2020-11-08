import {
  SUCCESSFULL_REGISTRATION,
  ERROR_REGISTRATION,
  CLEAN_ALERT,
  LOGIN_SUCCESS,
  LOGIN_ERROR
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
      return{
        ...state,
        message: null
      }
    default:
      return state;
  }
}
