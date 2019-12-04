import { SET_JOINABLE_ROOMS, SET_JOINED_ROOMS } from "../actions/types"

const initialState = {
joinableRooms: [],
joinedRooms: []
}

export default (state = initialState, action) => {
  console.log(action)
  switch (action.type) {
    case SET_JOINABLE_ROOMS:
      return {
        ...state,
        joinableRooms: action.joinableRooms,
      }
    case SET_JOINED_ROOMS:
      return {
        ...state,
        joinedRooms: action.joinedRooms,
      }
    default:
      return state
  }
}
