import React from "react"
import { Provider } from "react-redux"

import Home from "./Home"
import { Normalize } from "styled-normalize"
import store from "../redux/store"

const IndexPage = () => (
  <>
    <Normalize />
    <Provider store={store}>
      <Home />
    </Provider>
  </>
)

export default IndexPage
