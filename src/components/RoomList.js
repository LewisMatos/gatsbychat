import React from "react"
import { StyledRoomList } from "../styles/StyledRoomList"

const RoomList = ({rooms, roomId, subscribeToRoom}) => {
    const orderedRooms = [...rooms].sort((a, b) => a.id > b.id)
  return (
    <StyledRoomList>
      <div className="rooms-list">
        <ul>
          <h3>Channels:</h3>
          {orderedRooms.map(room => {
                        const active = room.id === roomId ? 'active' : '';
                        return (
                            <li key={room.id} className={"room " + active}>
                                <a
                                    onClick={() => subscribeToRoom(room.id)}
                                    href="#">
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
