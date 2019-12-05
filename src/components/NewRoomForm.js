import React, { useState } from "react"
import { StyledNewRoomForm } from "../styles/StyledNewRoomForm"

const NewRoomForm = ({ createRoom }) => {
  const [roomName, setRoomName] = useState("")

  const handleChange = e => {
    setRoomName(e.target.value)
  }

  const handleSubmit = e => {
    e.preventDefault()
    createRoom(roomName)
    setRoomName("")
  }
  return (
    <StyledNewRoomForm>
        <form onSubmit={handleSubmit}>
          <input
            value={roomName}
            onChange={handleChange}
            type="text"
            placeholder="Create a Channel"
            required
          />
          <button id="create-room-btn" type="submit">
            +
          </button>
        </form>
    </StyledNewRoomForm>
  )
}

export default NewRoomForm
