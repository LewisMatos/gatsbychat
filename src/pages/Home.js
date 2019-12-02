import React from "react"
import { StyledHome } from "../styles/StyledHome"
import Header from "../components/header"
import RoomList from "../components/RoomList"
import MessageList from "../components/MessageList"
import MessageForm from "../components/MessageForm"
import NewRoomForm from "../components/NewRoomForm"

const Home = () => (
  <>
    <Header siteTitle={"GatsbyChat"} />
    <StyledHome>
      <RoomList />
      <MessageList />
      <MessageForm />
      <NewRoomForm />
    </StyledHome>
  </>
)

export default Home
