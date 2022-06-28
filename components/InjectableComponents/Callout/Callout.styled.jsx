import styled from "styled-components";
import { transparentize } from "polished";
import { defaultColours } from "fictoan-react";

export const CalloutStyled = styled.div`
    display: block;
    border-width: 0 0 0 5px;
    word-break: break-word;
    border-style: solid;
    padding: 16px;
    border-radius: 4px;

    &.warning {
        background-color: ${transparentize(0.8, defaultColours.amber)};
        border-color: ${defaultColours.amber};
    }

    &.error {
        background-color: ${transparentize(0.8, defaultColours.red)};
        border-color: ${defaultColours.red};
    }

    &.tip {
        background-color: ${transparentize(0.8, defaultColours.blue)};
        border-color: ${defaultColours.blue};
    }

    &.highlight {
        background-color: ${transparentize(0.8, defaultColours.green)};
        border-color: ${defaultColours.green};
    }

    &.note {
        background-color: ${transparentize(0.8, defaultColours.slate)};
        border-color: ${defaultColours.slate};
    }
`;
