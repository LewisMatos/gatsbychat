import { SET_JOINED_ROOMS, SET_JOINABLE_ROOMS, SET_ROOM_ID } from "./types"

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

export const setRoomId = roomId => {
  return {
    type: SET_ROOM_ID,
    roomId,
  }
}
