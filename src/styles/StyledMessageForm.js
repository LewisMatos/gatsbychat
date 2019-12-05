import styled from "styled-components"

export const StyledMessageForm = styled.div`
  grid-area: s;
  width: 100%;
  background-color:white;
  padding:50px;
  form{
    border:1px solid black;
    border-radius:10px;
  }
  input {
    width: 100%;
    padding: 15px 10px;
    margin: 0;
    border-style: none;
    color: black;
    background-color: inherit;
    font-weight: 200;
    :focus {
      outline-width: 0;
    }
    ::placeholder {
      color: black;
    }
  }
`
