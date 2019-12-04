import React from "react"
import { StyledRoomList } from "../styles/StyledRoomList"

const RoomList = rooms => {
    const orderedRooms = [...rooms.rooms].sort((a, b) => a.id > b.id)
  return (
    <StyledRoomList>
      <div className="rooms-list">
        <ul>
          <h3>Your rooms:</h3>
          {orderedRooms.map(room => {
            return (
              <li key={room.id} className={"room " }>
                <a href="#">
                  # {room.name}
                </a>
              </li>
            )
          })}
        </ul>
      </div>
    </StyledRoomList>
  )
}

export default RoomList
