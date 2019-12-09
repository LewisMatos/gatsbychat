import React, { useState, useEffect } from "react"
import { ChatManager, TokenProvider } from "@pusher/chatkit-client"

import { Amplify, Auth, API } from "aws-amplify"
import { Authenticator, Greetings } from "aws-amplify-react" // or 'aws-amplify-react-native';
import { StyledHome } from "../styles/StyledHome"
import Header from "../components/header"
import RoomList from "../components/RoomList"
import MessageList from "../components/MessageList"
import MessageForm from "../components/MessageForm"
import NewRoomForm from "../components/NewRoomForm"

import { connect } from "react-redux"
import { useSiteMetadata } from "../hooks/useSiteMetaData"
import { setUSER, setSignedIn } from "../redux/actions/userActions"
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
  setSignedIn,
  signedIn,
  setMessage,
  clearMessage,
  setJoinableRooms,
  setJoinedRooms,
}) => {
  const { instance_locator, token_url } = useSiteMetadata()
  const signUpConfig = {
    hideAllDefaults: true,
    defaultCountryCode: "1",
    signUpFields: [
      {
        label: "Username",
        key: "username",
        required: true,
        displayOrder: 1,
        type: "string",
      },
      {
        label: "Email",
        key: "email",
        required: true,
        displayOrder: 2,
        type: "string",
      },
      {
        label: "Password",
        key: "password",
        required: true,
        displayOrder: 3,
        type: "password",
      },
    ],
  }

  const handleStateChange = (authState, data) => {
    if (authState === "signedIn") {
      setSignedIn(true)
    } else if (authState === "signedOut") {
      setSignedIn(false)
    }
  }

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
            console.log(message)
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
  const createUser = async user => {
    let myInit = {
      body: { username: user }, // replace this with attributes you need
      headers: {}, // OPTIONAL
    }
    try {
      const res = await API.post("chatAPI", "/items", myInit)
      // console.log(res);
      const chatManager = new ChatManager({
        instanceLocator: instance_locator,
        userId: user,
        tokenProvider: new TokenProvider({
          url: token_url,
        }),
      })
      chatManager.connect().then(currentUser => {
        setUSER(currentUser)
        getRooms(currentUser)
      })
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    Auth.currentAuthenticatedUser({
      bypassCache: false, // Optional, By default is false. If set to true, this call will send a request to Cognito to get the latest user data
    })
      .then(user => {
        console.log(user)
        createUser(user.username);
      })
      .catch(err => console.log(err))


  }, [signedIn])


  return (
    <>
      <Header siteTitle={"GatsbyChat"} />
      {signedIn && (
        <>
          {/* <Header siteTitle={"GatsbyChat"} /> */}
          <StyledHome>
            <RoomList
              rooms={[...joinableRooms, ...joinedRooms]}
              subscribeToRoom={subscribeToRoom}
              roomId={roomId}
            />
            <MessageList roomId={roomId} message={message} />
            <MessageForm disabled={!roomId} sendMessage={sendMessage} />
            <NewRoomForm createRoom={createRoom} />
          </StyledHome>
        </>
      )}
      <Authenticator
        signUpConfig={signUpConfig}
        onStateChange={handleStateChange}
      />
    </>
  )
}

const mapStateToProps = state => ({
  user: state.user.user,
  joinableRooms: state.room.joinableRooms,
  joinedRooms: state.room.joinedRooms,
  message: state.message,
  roomId: state.room.roomId,
  signedIn: state.user.signedIn,
})

export default connect(mapStateToProps, {
  setUSER,
  setSignedIn,
  setMessage,
  clearMessage,
  setRoomId,
  setJoinableRooms,
  setJoinedRooms,
})(Home)
