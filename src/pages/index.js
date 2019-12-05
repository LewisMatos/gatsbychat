import React from "react"
import { Provider } from "react-redux"

import Home from "./Home"
import { Normalize } from "styled-normalize"
import store from "../redux/store"
import { GlobalStyle } from '../styles/GlobalStyle';

const IndexPage = () => (
  <>
    <Provider store={store}>
      <Home />
    </Provider>
    <Normalize />
    <GlobalStyle />
  </>
)

export default IndexPage
