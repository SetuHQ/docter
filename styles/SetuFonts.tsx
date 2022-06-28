import { css } from "styled-components";

import IBMPlexSansRegular from "../assets/fonts/ibm-plex-sans/ibm-plex-sans-regular.woff";
import IBMPlexSansBold from "../assets/fonts/ibm-plex-sans/ibm-plex-sans-600.woff";

import IBMPlexMonoRegular from "../assets/fonts/ibm-plex-mono/ibm-plex-mono-regular.woff";
import IBMPlexMonoBold from "../assets/fonts/ibm-plex-mono/ibm-plex-mono-600.woff";

import IBMPlexSerifRegular from "../assets/fonts/ibm-plex-serif/ibm-plex-serif-regular.woff";
import IBMPlexSerifRegularItalic from "../assets/fonts/ibm-plex-serif/ibm-plex-serif-italic.woff";
import IBMPlexSerifBold from "../assets/fonts/ibm-plex-serif/ibm-plex-serif-600.woff";
import IBMPlexSerifBoldItalic from "../assets/fonts/ibm-plex-serif/ibm-plex-serif-600italic.woff";

export const SetuFontsStyled = css`
    @font-face {
        font-family: "IBM Plex Sans";
        src: url(${IBMPlexSansRegular}) format("woff");
        font-weight: 400;
        font-style: normal;
    }

    @font-face {
        font-family: "IBM Plex Sans";
        src: url(${IBMPlexSansBold}) format("woff");
        font-weight: 600;
        font-style: normal;
    }

    @font-face {
        font-family: "IBM Plex Mono";
        src: url(${IBMPlexMonoRegular}) format("woff");
        font-weight: 400;
        font-style: normal;
    }

    @font-face {
        font-family: "IBM Plex Mono";
        src: url(${IBMPlexMonoBold}) format("woff");
        font-weight: 600;
        font-style: normal;
    }

    @font-face {
        font-family: "IBM Plex Serif";
        src: url(${IBMPlexSerifRegular}) format("woff");
        font-weight: 400;
        font-style: normal;
    }

    @font-face {
        font-family: "IBM Plex Serif";
        src: url(${IBMPlexSerifBold}) format("woff");
        font-weight: 600;
        font-style: normal;
    }

    @font-face {
        font-family: "IBM Plex Serif";
        src: url(${IBMPlexSerifRegularItalic}) format("woff");
        font-weight: 400;
        font-style: italic;
    }

    @font-face {
        font-family: "IBM Plex Serif";
        src: url(${IBMPlexSerifBoldItalic}) format("woff");
        font-weight: 600;
        font-style: italic;
    }
`;
