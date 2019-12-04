import styled from "styled-components"

export const StyledRoomList = styled.div`
    grid-area: r;
    padding: 10px;
    background-color: red;
    overflow: scroll;
    height: 100%;

    ul{
        list-style-type: none;
        padding: 0;
        overflow: scoll;
    }

    li{
        margin: 10px 0;
    }

    h3{
        margin: 5px 0;
        color: black;
    }

    a{
        margin: 5px 0;
    color: grey;
    }

    .active a{
        color: green;
    }
}
`
