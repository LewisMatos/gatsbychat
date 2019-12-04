import React, { useState, useEffect } from "react"
import { ChatManager, TokenProvider } from "@pusher/chatkit-client"

import { StyledHome } from "../styles/StyledHome"
import Header from "../components/header"
import RoomList from "../components/RoomList"
import MessageList from "../components/MessageList"
import MessageForm from "../components/MessageForm"
import NewRoomForm from "../components/NewRoomForm"
import { GlobalStyle } from "../styles/GlobalStyle"

import { Provider } from "react-redux"
import store from "../redux/store"
import { useSiteMetadata } from "../hooks/useSiteMetaData"

const Home = () => {
  const { instance_locator, token_url } = useSiteMetadata()

  useEffect(() => {
    const chatManager = new ChatManager({
      instanceLocator: instance_locator,
      userId: "testuser",
      tokenProvider: new TokenProvider({
        url: token_url,
      }),
    })

    chatManager.connect().then(currentUser => {
      currentUser.subscribeToRoom({
        roomId: "8a162470-d049-4c80-916f-a6eb046102d4",
        hooks: {
          onMessage: message => {
            console.log("message.text: ", message.text)
          },
        },
      })
    })

  }, [])

  return (
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
}

export default Home
