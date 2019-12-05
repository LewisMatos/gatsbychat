import { SET_MESSAGE, CLEAR_MESSAGES } from './types';

export const setMessage = message => {
  return {
    type: SET_MESSAGE,
    message,
  }
}

export const clearMessage = message => {
  return {
    type: CLEAR_MESSAGES,
    message,
  }
}
