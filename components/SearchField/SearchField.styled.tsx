import styled from "styled-components";
import { defaultColours } from "fictoan-react";

export const SearchFieldStyled = styled.div`
    .search-container {
        position: relative;
        width: 100%;

        mark {
            background-color: ${(props) => props.theme.Search.ResultCard.highlight.bg};
            border-radius: 2px;
        }

        .search-icon {
            cursor: pointer;
            position: relative;
            display: flex;
            padding-left: 8px;

            svg {
                width: 24px;
                height: 24px; // em-effing Safari fix
                fill: none;
                stroke: ${(props) => props.theme.Search.Icon.default.stroke};
                stroke-width: 2;
                stroke-linecap: round;
            }
        }

        #search-field {
            width: 100%;
            font-size: 0.9em;
            padding: 8px;
            transform: scaleX(0);
            transition: all 0.24s;
            transform-origin: right;

            &:focus {
                transform: scaleX(1);
                padding: 8px;
            }
        }

        .search-tooltip {
            position: absolute;
            right: 36px;
            font-size: 80%;
            z-index: -1;
            pointer-events: none;

            kbd {
                font-size: 70%;
            }
        }

        #search-dropdown {
            position: absolute;
            top: 100%;
            left: 0;
            width: 100%;
            height: fit-content;
            max-height: 300px;
            overflow-y: auto;
            z-index: 2;
            background-color: ${(props) => props.theme.Search.ResultsWrapper.bg};

            .result-card {
                padding: 12px;
                background-color: ${(props) => props.theme.Search.ResultCard.default.bg};
                transition: all 0.2s ease-in-out;
            }

            .result-card:last-child {
                margin-bottom: 0;
            }

            .result-card:hover,
            .result-card.selected {
                background: ${(props) => props.theme.Search.ResultCard.isSelected.bg};
                border: 1px solid ${(props) => props.theme.Search.ResultCard.isSelected.border};
            }

            .result-name {
                color: ${(props) => props.theme.Search.ResultName.default.text};
                margin-bottom: 4px;
            }

            .result-card.selected .result-name {
                color: ${(props) => props.theme.Search.ResultName.isSelected.text};
                font-weight: 600;
            }

            .result-path {
                color: ${(props) => props.theme.Search.ResultPath.default.text};
                margin-top: 0;
            }

            .result-card.selected .result-path {
                color: ${(props) => props.theme.Search.ResultPath.isSelected.text};
            }
        }
    }

    @media (max-width: 900px) {
        .search-container {
            margin-top: 12px;

            #search-field {
                transform: scaleX(1);
            }
            .search-tooltip {
                display: none;
            }
        }
    }
`;
