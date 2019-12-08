import {SET_USER, SIGNED_IN } from "../actions/types"

const initialState = {
  user: null,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        user: action.user,
      }
      case SIGNED_IN:
        return {
          ...state,
          signedIn: action.signedIn,
        }
    default:
      return state
  }
}
