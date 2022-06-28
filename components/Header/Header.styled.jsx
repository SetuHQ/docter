import styled from "styled-components";
import { defaultColours } from "fictoan-react";

export const HeaderStyled = styled.header`
    position: sticky;
    top: 0;
    background-color: ${(props) => props.theme.StickyPageHeader.bg};
    padding: 8px 0;
    border-bottom: 1px solid
        ${(props) => props.theme.StickyPageHeader.borderBottom};
    backdrop-filter: blur(4px);
    z-index: 50000;

    .header {
        position: relative;
    }

    // Firefox
    @-moz-document url-prefix() {
        background-color: ${(props) => props.theme.StickyPageHeader.FirefoxBg};
    }

    @media (max-width: 900px) {
        position: unset;
        background-color: ${defaultColours.transparent};
        backdrop-filter: none;
        z-index: unset;
        padding: 16px 0;

        .header {
            margin-top: 40px;

            #search-wrapper {
                position: relative;
            }
        }
    }
`;
