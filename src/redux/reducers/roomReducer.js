import { SET_JOINABLE_ROOMS, SET_JOINED_ROOMS, SET_ROOM_ID } from '../actions/types';

const initialState = {
joinableRooms: [],
joinedRooms: [],
roomId: null
}

export default (state = initialState, action) => {
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
      case SET_ROOM_ID:
        return {
          ...state,
          roomId: action.roomId,
        }
    default:
      return state
  }
}
