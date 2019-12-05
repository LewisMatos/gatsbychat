import React from "react"
import { StyledMessage } from "../styles/StyledMessage"

const Message = ({ username, text, time }) => {
  return (
    <StyledMessage>
        <div className="message-username">{username} {time}</div>
        <div className="message-text">{text}</div>
    </StyledMessage>
  )
}

export default Message
