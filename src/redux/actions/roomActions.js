import {
    CREATE_MESSAGE,
    GET_MESSAGES,
    CREATE_ROOM,
    GET_ROOMS,
    SET_LOADING,
    LOGS_ERROR
} from './types';

export const getRooms = () => async dispatch => {
    setLoading()
    const res = await fetch("/logs")
    const data = await res.json()

    dispatch({
      type: GET_ROOMS,
      payload: data,
    })


}

export const setLoading = () => {
  return {
    type: SET_LOADING,
  }
}
