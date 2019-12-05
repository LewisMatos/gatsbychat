import styled from "styled-components"

export const StyledRoomList = styled.div`
    grid-area: r;
    padding: 10px;
    overflow: auto;
    height: 100%;
    background-color:#400E40;

    ul{
        list-style-type: none;
        padding: 0;
        overflow: auto;
    }

    li{
        margin: 10px 0;
    }

    h3{
        margin: 5px 0;
        color: white;
    }

    a{
        margin: 5px 0;
    color: white;
    }

    .active a{
        color: green;
    }
}
`
