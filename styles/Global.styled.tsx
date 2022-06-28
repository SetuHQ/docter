//  External deps  ============================================================
import { createGlobalStyle } from "styled-components";
import { lighten } from "polished";

//  Internal deps  ============================================================
//  Types  ====================================================================
//  Local components  =========================================================
import { setuColours, SetuColoursCSS } from "./SetuColours";
import { defaultColours } from "fictoan-react";

export const GlobalStyle = createGlobalStyle`
    ${SetuColoursCSS}

    html { scroll-behavior : smooth; }

    a,
    th,
    td,
    ul li,
    ol li,
    body { font-family : "IBM Plex Sans", sans-serif; }

    p { margin : 0; }

    div[class*="border"] { border-width : 1px !important; }

    article {
        display        : flex;
        min-height     : 100vh;
        flex-direction : column;
    }

    a:focus,
    button:focus { box-shadow : 0 0 0 0.2rem rgba(0, 123, 255, 0.25); }
    
    button { white-space : pre; }

    li:not(:last-child) { margin-bottom : 16px; }

    .light-theme li { color : ${lighten(0.16, setuColours.murkyNight)}; }

    .dark-theme li { color : ${lighten(0.56, setuColours.murkyNight)}; }
    .dark-theme td { color : ${lighten(0.56, setuColours.murkyNight)}; }

    .light-theme table { background-color : ${defaultColours.white}; }
    .dark-theme table { background-color : ${setuColours.murkyNight}; }

    .light-theme .shadowed-text { text-shadow : 1px 1px 3px rgba(255, 255, 255, 1); }
    .dark-theme .shadowed-text { text-shadow : 1px 1px 2px ${lighten(0.56, setuColours.murkyNight)}; }

    //  TO RECREATE THAT PESKY TEAL ARROW ON HOVER  ///////////////////////////
    .has-arrow {
        position : relative;
        cursor   : pointer;

        &::after {
            display     : none;
            content     : "\u2192";
            margin-left : 8px;
            color       : ${setuColours.flashTurk};
        }
    }

    .arrow-on-hover:hover {
        .has-arrow::after { display : inline-block; }
    }

    #docs-sidebar {
        box-shadow   : none;
        border-right : 1px solid ${(props) => props.theme.DocsSidebar.borderRight};
        overflow-x   : hidden;
        
        &.visible { left : 0; }

        &.collapsed { overflow-y: auto; }

        a.active {
            background-color : ${(props) => props.theme.sidebar.linksWrapper.links.isActive.bg};
        }

        footer { width : 239px; }  // to make the right-border visible
        
        //  NESTED SIDEBAR SHIZ  //////////////////////////////////////////////////
        #linkset-wrapper {
            display        : flex;
            transition     : all 0.3s ease-in-out;
            width          : 480px;
            padding-bottom : 30px;
    
            &.linkset-2-active {
                margin-left : -240px;
            }

            .linkset {
                position   : relative;
                width      : 240px;
                top        : 0;
                display: flex;
                flex-direction: column;

                .sub-navs { display : none; }
                .expanded + .sub-navs, .sub-navs-open { 
                    display : flex;
                    flex-direction: column;
                }
            }
    
            hr { margin : 8px 0; }
        }
    }

    @media (max-width : 900px) {
        #docs-sidebar {
            top        : 48px;
            min-height : calc(100vh - 48px);

            header { display : none; }
        }

        .sidebar-backdrop {
            position   : fixed;
            width      : 100vw;
            height     : 100vh;
            background : rgba(0, 0, 0, 0.24);
            z-index    : 10;
            animation  : fade-in 0.16s ease-in-out;
        }

        @keyframes fade-in {
            0% {
                opacity : 0;
            }
            100% {
                opacity : 1;
            }
        }
    }

    hr {
        display : flex;
        border  : 0;
        margin  : 4vmax auto;
        width   : 100%;

        &.primary {
            background-color : ${(props) => props.theme.hr.primary.bg};
            height           : ${(props) => props.theme.hr.primary.height};
        }

        &.secondary {
            background-color : ${(props) => props.theme.hr.secondary.bg};
            height           : ${(props) => props.theme.hr.secondary.height};
        }

        &.tertiary {
            margin           : 32px 0;
            background-color : ${(props) => props.theme.hr.tertiary.bg};
            height           : ${(props) => props.theme.hr.tertiary.height};
        }
    }

    // Fix side-padding-none issue in Fictoan
    @media (max-width: 600px) {
        [class*="side-padding-"] {
            &.side-padding-none,
            &.side-padding-tiny {
                padding-left  : 0;
                padding-right : 0;
            }
        }
    }

    table {
        border-collapse : collapse;
        width           : 100%;
    }

    td,
    th {
        border     : 1px solid ${(props) => props.theme.CustomTable.border};
        text-align : left;
        padding    : 8px;
    }

    th {
        background  : ${(props) => props.theme.CustomTable.Header.bg};
        font-weight : 600;
        color       : ${(props) => props.theme.CustomTable.Header.text};
    }

    #user-roles-table tr th:not(:first-child),
    #user-roles-table tr td:not(:first-child) {
        width      : 16%;
        text-align : center;
    }
`;
