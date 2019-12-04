import { SET_JOINED_ROOMS, SET_JOINABLE_ROOMS } from "./types"

export const setJoinedRooms = joinedRooms => {
  return {
    type: SET_JOINED_ROOMS,
    joinedRooms,
  }
}

export const setJoinableRooms = joinableRooms => {
  return {
    type: SET_JOINABLE_ROOMS,
    joinableRooms,
  }
}
