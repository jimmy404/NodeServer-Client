import { SUCCESSFULL_REGISTRATION } from '../../types';

export default (state, action) => {
  switch(action.type) {
    case SUCCESSFULL_REGISTRATION:
      return {
        ...state,
        message: action.payload
      }
    default:
      return state;
  }
}
