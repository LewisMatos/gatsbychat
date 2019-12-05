import styled from "styled-components"

export const StyledNewRoomForm = styled.div`
  grid-area: n;
  color:white;
  background-color: #400e40;
  padding: 0.5rem;
  font-size: 1rem;

  form {
    height: 100%;
    display: flex;
    color: white;
  }

  input {
    width: 100%;
    background-color: #5d325c;
    color: white;
    ::placeholder {
      font-weight: 200;
      color:#c3c3b5;
    }
    border-radius: 5px;
    border: 2px solid transparent;
  }

  button {
    background-color: white;
  }
`
