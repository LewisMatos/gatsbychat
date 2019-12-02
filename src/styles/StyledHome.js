import styled from "styled-components"

export const StyledHome = styled.div`
    display: grid;
    height: 100%;
    grid-template-columns: repeat(6, 1fr);
    grid-template-rows: 1fr 1fr 1fr 1fr 1fr 60px;
    grid-template-areas:
        "r m m m m m"
        "r m m m m m"
        "r m m m m m"
        "r m m m m m"
        "r m m m m m"
        "n s s s s s";
}
`


