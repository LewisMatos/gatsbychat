import styled from "styled-components"

export const StyledHome = styled.div`
    display: grid;
    width: 100%;
    height: calc(100vh - 5rem);
    grid-template-columns: repeat(6, 1fr);
    grid-template-rows: 3rem 1fr 1fr 1fr 1fr .5fr;
    grid-template-areas:
        "n m m m m m"
        "r m m m m m"
        "r m m m m m"
        "r m m m m m"
        "r m m m m m"
        "r s s s s s";
}
`


