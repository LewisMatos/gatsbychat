import React, { useState, useEffect } from "react"
import {Chatkit, ChatManager, TokenProvider } from "@pusher/chatkit-client"

import { StyledHome } from "../styles/StyledHome"
import Header from "../components/header"
import RoomList from "../components/RoomList"
import MessageList from "../components/MessageList"
import MessageForm from "../components/MessageForm"
import NewRoomForm from "../components/NewRoomForm"

import { connect } from "react-redux"
import { useSiteMetadata } from "../hooks/useSiteMetaData"
import { setUSER } from "../redux/actions/userActions"
import {
  setJoinableRooms,
  setJoinedRooms,
  setRoomId,
} from "../redux/actions/roomActions"
import { setMessage, clearMessage } from "../redux/actions/messageActions"

const Home = ({
  user,
  roomId,
  setRoomId,
  message,
  joinedRooms,
  joinableRooms,
  setUSER,
  setMessage,
  clearMessage,
  setJoinableRooms,
  setJoinedRooms,
}) => {
  const { instance_locator, token_url } = useSiteMetadata()
  const getRooms = async currentUser => {
    if (currentUser) {
      user = currentUser
    }
    try {
      let rooms = await user.getJoinableRooms()
      setJoinableRooms(rooms)
      setJoinedRooms(user.rooms)
    } catch (err) {
      console.log(err)
    }
  }

  const subscribeToRoom = roomId => {
    clearMessage()
    user
      .subscribeToRoom({
        roomId,
        hooks: {
          onMessage: message => {
            setMessage(message)
          },
        },
      })
      .then(room => {
        setRoomId(room.id)
        getRooms()
      })
      .catch(err => console.log("error on subscribing to room: ", err))
  }

  const sendMessage = text => {
    user.sendMessage({
      text,
      roomId: roomId,
    })
  }

  const createRoom = name => {
    user
      .createRoom({
        name,
      })
      .then(room => subscribeToRoom(room.id))
      .catch(err => console.log("error with createRoom: ", err))
  }

  useEffect(() => {
    const chatManager = new ChatManager({
      instanceLocator: instance_locator,
      userId: "Lewis",
      tokenProvider: new TokenProvider({
        url: token_url,
      }),
    })

    chatManager.connect().then(currentUser => {
      setUSER(currentUser)
      getRooms(currentUser)
    })
  }, [instance_locator, token_url])

  return (
    <>
      <Header siteTitle={"GatsbyChat"} />
      <StyledHome>
        <RoomList
          rooms={[...joinableRooms, ...joinedRooms]}
          subscribeToRoom={subscribeToRoom}
          roomId={roomId}
        />
        <MessageList roomId={roomId} message={message} />
        <MessageForm disabled={!roomId} sendMessage={sendMessage} />
        <NewRoomForm createRoom={createRoom}/>
      </StyledHome>
    </>
  )
}

const mapStateToProps = state => ({
  user: state.user.user,
  joinableRooms: state.room.joinableRooms,
  joinedRooms: state.room.joinedRooms,
  message: state.message,
  roomId: state.room.roomId,
})

export default connect(mapStateToProps, {
  setUSER,
  setMessage,
  clearMessage,
  setRoomId,
  setJoinableRooms,
  setJoinedRooms,
})(Home)
