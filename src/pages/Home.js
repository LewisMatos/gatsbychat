import React, { useEffect } from "react"
import PropTypes from "prop-types"
import { ChatManager, TokenProvider } from "@pusher/chatkit-client"

import { Auth, API } from "aws-amplify"
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
      await API.post("chatAPI", "/items", myInit)
      const chatManager = new ChatManager({
        instanceLocator: "v1:us1:cfc83cf8-b8a2-4954-ad81-f788c9315f3e",
        userId: user,
        tokenProvider: new TokenProvider({
          url:
            "https://us1.pusherplatform.io/services/chatkit_token_provider/v1/cfc83cf8-b8a2-4954-ad81-f788c9315f3e/token",
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
        createUser(user.username)
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
        hide={[Greetings]}
        signUpConfig={signUpConfig}
        onStateChange={handleStateChange}
      />
    </>
  )
}

Home.propTypes = {
  user: PropTypes.object,
  roomId: PropTypes.string,
  setRoomId: PropTypes.func,
  message: PropTypes.objectOf(PropTypes.array),
  joinedRooms: PropTypes.arrayOf(PropTypes.object),
  joinableRooms: PropTypes.arrayOf(PropTypes.object),
  setUSER: PropTypes.func,
  setSignedIn: PropTypes.func,
  signedIn: PropTypes.bool,
  setMessage: PropTypes.func,
  clearMessage: PropTypes.func,
  setJoinableRooms: PropTypes.func,
  setJoinedRooms: PropTypes.func,
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
