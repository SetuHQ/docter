import styled from "styled-components";

export const HomeStyled = styled.article`
    min-height : unset;

    #intro-hero {
        padding : 2vw 50% 6vw 2vw;

        @media all and (max-width : 1200px) {
            padding-bottom  : 24vh;
            background-size : 80%;
        }

        @media all and (max-width : 900px) {
            padding         : 4vw 24vw 16vw 4vw;
            background-size : 60%;
        }
    }
`;
