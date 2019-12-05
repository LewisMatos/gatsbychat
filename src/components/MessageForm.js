import React, { useState } from "react"
import { StyledMessageForm } from "../styles/StyledMessageForm"

export const MessageForm = ({ disabled, sendMessage }) => {
  const [message, setMessage] = useState("")

  const handleChange = e => {
    setMessage(e.target.value)
  }

  const handleSubmit = e => {
    e.preventDefault()
    sendMessage(message)
    setMessage("")
  }

  return (
    <StyledMessageForm>
        <form onSubmit={handleSubmit} className="send-message-form">
          <input
            disabled={disabled}
            onChange={handleChange}
            value={message}
            placeholder={
              disabled ? "Join a room" : "Type your message and hit ENTER"
            }
            type="text"
          />
        </form>
    </StyledMessageForm>
  )
}

export default MessageForm
