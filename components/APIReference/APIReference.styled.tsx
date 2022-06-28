import styled from "styled-components";
import { setuColours } from "../../styles/SetuColours";

export const APIReferenceStyled = styled.article`
    /* .menu-content { background-color : ${(props) => props.theme.APIReference.LeftMenu.bg}; } */

    code {
        font-family: "IBM Plex Mono", monospace;
    }

    .token.property.string,
    .collapser {
        color: rgb(100, 9, 227);
    }

    .token.string {
        color: rgb(243, 82, 82);
    }

    ul > li.react-tabs__tab--selected {
        background: rgba(183, 205, 225, 0.05);
    }

    .react-tabs__tab-panel {
        button {
            color: grey;
        }
    }

    .menu-content img {
        width: 60%;
        margin: 1.25em auto;
    }

    &.dark {
        background-color: #0a1116;

        h2 {
            color: ${setuColours.flashTurk};
        }
        h5 {
            color: ${setuColours.flashTurk};

            span {
                color: ${setuColours.fadedMing};
            }
        }

        // GET, POST tags in the sidebar
        .menu-content ul ul ul li label span:nth-child(1) {
            color: black;
        }

        .api-content {
            // URL dropdowns in the right panel
            button ~ div {
                background-color: #0f1b24;
            }
            button ~ div div div {
                background-color: #0a1116;
                border-color: grey;
            }

            // Nested paramters inside tables
            ${(() => {
                const getStyleTemplate = (color) => {
                    return `
                        table td {
                            background-color: ${color} !important;

                            tr > td:first-child > div {
                                background-color: ${color} !important;
                            }
                        
                        `;
                };
                const recursiveTableStyling = (styleString, currentIndex, maxIndex) => {
                    if (currentIndex % 2 == 0) {
                        styleString += getStyleTemplate("#0A1116");
                    } else {
                        styleString += getStyleTemplate("#0f1b24");
                    }

                    if (currentIndex < maxIndex) {
                        styleString = recursiveTableStyling(styleString, currentIndex + 1, maxIndex);
                    }

                    styleString += "}";
                    return styleString;
                };

                const LEVEL_OF_NESTING = 10;
                return recursiveTableStyling("", 0, LEVEL_OF_NESTING);
            })()}
        }

        // Code blocks
        .redoc-json .token.property.string,
        .collapser {
            color: rgb(193, 149, 254);
        }

        .token.string {
            color: rgb(242, 105, 105);
        }
    }
`;
