import styled from "styled-components";

export const PageHeadingsStyled = styled.aside`
    height        : 100%;
    padding-right : 12vw;
    height        : fit-content;
    position      : sticky;
    top           : 85px;
    margin-top    : calc(0.83em + 2.36em + 8vmax); // h2 margin + h2 size

    @media (max-width: 1600px) {
        & { padding-right: 8vw; }
    }

    @media (max-width : 1200px) {
        & { display : none; }
    }

    .headings-container {
        a.heading-hash {
            display       : block;
            font-weight   : 400;
            color         : ${props => props.theme?.InPageScrollLinks?.Link?.default?.text};
            margin-bottom : 12px;

            &:hover {
                color : ${props => props.theme?.InPageScrollLinks?.Link?.onHover?.text};
            }

            &.visible {
                color       : ${props => props.theme?.InPageScrollLinks?.Link?.active?.text};
                font-weight : 600;
            }
        }
    }
`;
