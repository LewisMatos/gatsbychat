import React from "react"
import { Provider } from "react-redux"

import Amplify from "aws-amplify"
import awsmobile from '../../aws-exports';

import Home from "./Home"
import { Normalize } from "styled-normalize"
import store from "../redux/store"
import { GlobalStyle } from "../styles/GlobalStyle"

Amplify.configure(awsmobile);

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
