import {
    GET_USER,
    SET_USER,
    SIGNED_IN,
} from './types';

export const getUSER = () => async dispatch => {
    const res = await fetch("/logs")
    const data = await res.json()

    dispatch({
      type: GET_USER,
      payload: data,
    })
  }

  export const setUSER = (user) => {
    return {
      type: SET_USER,
      user
    }
  }


  export const setSignedIn = (signedIn) => {
    return {
      type: SIGNED_IN,
      signedIn
    }
  }
