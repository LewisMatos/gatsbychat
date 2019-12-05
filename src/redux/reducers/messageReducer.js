import { SET_MESSAGE, CLEAR_MESSAGES } from "../actions/types"

const initialState = {
  message: [],
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_MESSAGE:
      return {
        ...state,
        message: [...state.message, action.message],
      }
    case CLEAR_MESSAGES:
      return {
        ...state,
        message: [],
      }
    default:
      return state
  }
}
