import { createGlobalStyle } from "styled-components"

export const GlobalStyle = createGlobalStyle`
 html {
      box-sizing: border-box;
      height:100%;
    }
    *, *:before, *:after {
      box-sizing: inherit;
    }

    body{
        margin: 0;
        padding: 0;
        height:100%;
        box-sizing: border-box;
        background-color: #151C26;
        font-family: 'Roboto', 'Droid Serif', Sans-Serif;
        font-size: calc(14px + (26 - 14) * ((100vw - 300px) / (1600 - 300)));
    }
`
