import {
    CREATE_MESSAGE,
    GET_MESSAGES,
    CREATE_ROOM,
    GET_ROOM,
    SET_LOADING,
    GET_LOGS,
    LOGS_ERROR
} from './types';

export const getLogs = () => async dispatch => {
  try {
    setLoading()
    const res = await fetch("/logs")
    const data = await res.json()

    dispatch({
      type: GET_LOGS,
      payload: data,
    })
  } catch (err) {
      dispatch({
          type: LOGS_ERROR
          payload: err.response.data
      })
  }
}

export const setLoading = () => {
  return {
    type: SET_LOADING,
  }
}
