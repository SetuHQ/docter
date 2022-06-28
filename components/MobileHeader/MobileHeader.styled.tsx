import styled from "styled-components";

export const MobileHeaderStyled = styled.div`
    position: fixed;
    z-index: 5000;
    width: 100%;
    left: 0;
    right: 0;
    display: none;
    height: 48px;
    background-color: ${(props) => props.theme.MobileHeader.bg};

    svg {
        width: 100px;
    }

    .menu-toggle {
        display: none;
        cursor: pointer;
    }

    @media (max-width: 900px) {
        & {
            display: flex;
            flex-direction: row;
            align-items: center;
            border-bottom: 1px solid ${(props) => props.theme.MobileHeader.borderBottom};
        }

        .menu-toggle {
            display: block;
            position: fixed;
            padding: 0 0 0 6vw;
        }

        .menu-toggle * {
            line-height: 8px;
            font-weight: 600;
        }

        svg {
            margin: 0 auto;
        }
    }
`;
