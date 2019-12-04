import React, { useEffect } from "react"
import { ChatManager, TokenProvider } from "@pusher/chatkit-client"

import { StyledHome } from "../styles/StyledHome"
import Header from "../components/header"
import RoomList from "../components/RoomList"
import MessageList from "../components/MessageList"
import MessageForm from "../components/MessageForm"
import NewRoomForm from "../components/NewRoomForm"
import { GlobalStyle } from "../styles/GlobalStyle"

import { connect} from "react-redux"
import { useSiteMetadata } from "../hooks/useSiteMetaData"
import { setUSER } from "../redux/actions/userActions"
import { setJoinableRooms, setJoinedRooms } from "../redux/actions/roomActions"

const Home = ({joinedRooms,joinableRooms, setUSER, setJoinableRooms, setJoinedRooms }) => {
  console.log(joinedRooms,joinableRooms);
  const { instance_locator, token_url } = useSiteMetadata()

  const getRooms = async user => {
    try {
      let rooms = await user.getJoinableRooms()
      setJoinableRooms(rooms)
      setJoinedRooms(user.rooms)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    const chatManager = new ChatManager({
      instanceLocator: instance_locator,
      userId: "testSecond",
      tokenProvider: new TokenProvider({
        url: token_url,
      }),
    })

    chatManager.connect().then(currentUser => {
      getRooms(currentUser)
      setUSER(currentUser)
      currentUser.subscribeToRoom({
        roomId: "8a162470-d049-4c80-916f-a6eb046102d4",
        hooks: {
          onMessage: message => {
            console.log("message.text: ", message.text)
          },
        },
      })
    })
  }, [instance_locator, token_url])

  return (
    <>
      <Header siteTitle={"GatsbyChat"} />
      <StyledHome>
        <RoomList rooms={[...joinableRooms, ...joinedRooms]}/>
        <MessageList />
        <MessageForm />
        <NewRoomForm />
      </StyledHome>
      <GlobalStyle />
    </>
  )
}

const mapStateToProps = state => ({ user: state.user, joinableRooms: state.room.joinableRooms, joinedRooms: state.room.joinedRooms })

export default connect(mapStateToProps, {
  setUSER,
  setJoinableRooms,
  setJoinedRooms,
})(Home)
