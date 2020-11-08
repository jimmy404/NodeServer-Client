import {
  SUCCESSFULL_REGISTRATION,
  ERROR_REGISTRATION,
  CLEAN_ALERT
} from '../../types';

export default (state, action) => {
  switch(action.type) {
    case SUCCESSFULL_REGISTRATION:
    case ERROR_REGISTRATION:
      return {
        ...state,
        message: action.payload
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
