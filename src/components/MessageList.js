import React, { useEffect, useRef } from "react"
import ReactDOM from "react-dom"
import { StyledMessageList } from "../styles/StyledMessageList"
import Message from "./Message"

const MessageList = ({ message, roomId }) => {
  const useScroll = () => {
    const htmlElRef = useRef(null)

    const executeScroll = () => {
      let current = htmlElRef.current
      current.scrollTop = current.scrollHeight
    }

    return [executeScroll, htmlElRef]
  }
  const [executeScroll, htmlElRef] = useScroll()

  useEffect(executeScroll, [roomId,message]) // Runs after component mounts

  if (!roomId) {
    return (
      <StyledMessageList ref={htmlElRef}>
        <div className="join-room">&larr; Join a room!</div>
      </StyledMessageList>
    )
  }
  return (
    <StyledMessageList ref={htmlElRef}>
      {message.message.map((message, index) => {
        let date = new Date(message.createdAt)
        let time = date.toLocaleString([], {
          hour: "2-digit",
          minute: "2-digit",
        })
        return (
          <Message
            key={message.id}
            username={message.senderId}
            time={time}
            text={message.text}
          />
        )
      })}
    </StyledMessageList>
  )
}

export default MessageList
