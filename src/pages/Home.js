import React from "react"
import { StyledHome } from "../styles/StyledHome"
import Header from "../components/header"
import RoomList from "../components/RoomList"
import MessageList from "../components/MessageList"
import MessageForm from "../components/MessageForm"
import NewRoomForm from "../components/NewRoomForm"
import { GlobalStyle } from "../styles/GlobalStyle"

import{ Provider} from 'react-redux'
import store from '../redux/store';

const Home = () => (
  <Provider store={store}>
    <Header siteTitle={"GatsbyChat"} />
    <StyledHome>
      <RoomList />
      <MessageList />
      <MessageForm />
      <NewRoomForm />
    </StyledHome>
    <GlobalStyle />
  </Provider>
)

export default Home
