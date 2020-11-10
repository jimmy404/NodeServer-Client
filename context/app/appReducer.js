import {
  SHOW_ALERT,
  CLEAN_ALERT,
  UPLOAD_FILE_SUCCESS,
  UPLOAD_FILE_ERROR,
  CREATE_LINK_SUCCESS,
  CREATE_LINK_ERROR
} from '../../types';

export default (state, action) => {
  switch (action.type) {
    case SHOW_ALERT:
      return {
        ...state,
        message_file: action.payload
      }
    case CLEAN_ALERT:
      return {
        ...state,
        message_file: null
      }

    default:
      return state;
  }
}
