import React, { useState } from "react";
import { Element, Row, Portion } from "fictoan-react";
import { Card, Tabs, Text, ExpandableContent, Button } from "fictoan-react";
import Callout from "../InjectableComponents/Callout/Callout";

// import { STRAPI_API_URL } from "../../utils/StrapiContent";
import Markdown from "../Markdown/Markdown";
import { PageSectionsStyled } from "./PageSections.styled";
import { MDXRemote } from "next-mdx-remote";

import NextPage from "../NextPage/NextPage";
import WasPageHelpful from "../WasPageHelpful/WasPageHelpful";
import CodeBlockWithCopy from "../Markdown/CodeBlockWithCopy/CodeBlockWithCopy";
import { Waypoint } from "react-waypoint";
import MainImage from "../MainImage/MainImage";
import Badge from "../Badge/Badge";

const PageSections = ({ onHeadingVisibilityChange, mdx, sidebar }) => {
    // Heading components with WayPoint
    function getAnchor(text) {
        return text.toLowerCase().replace(/\W/g, "-");
    }
    const H1 = ({ children }) => {
        const anchor = getAnchor(children);
        const link = `#${anchor}`;
        return (
            <Waypoint
                onEnter={(event) => onHeadingVisibilityChange(event, anchor)}
                onLeave={(event) => onHeadingVisibilityChange(event, anchor)}
            >
                <h1 id={anchor}>
                    <a href={link} className="anchor-link">
                        #
                    </a>
                    {children}
                </h1>
            </Waypoint>
        );
    };

    const H2 = ({ children }) => {
        const anchor = getAnchor(children);
        const link = `#${anchor}`;
        return (
            <Waypoint
                onEnter={(event) => onHeadingVisibilityChange(event, anchor)}
                onLeave={(event) => onHeadingVisibilityChange(event, anchor)}
            >
                <h2 id={anchor}>
                    <a href={link} className="anchor-link">
                        #
                    </a>
                    {children}
                </h2>
            </Waypoint>
        );
    };

    const H3 = ({ children }) => {
        const anchor = getAnchor(children);
        const link = `#${anchor}`;
        return (
            <Waypoint
                onEnter={(event) => onHeadingVisibilityChange(event, anchor)}
                onLeave={(event) => onHeadingVisibilityChange(event, anchor)}
            >
                <h3 id={anchor}>
                    <a href={link} className="anchor-link">
                        #
                    </a>
                    {children}
                </h3>
            </Waypoint>
        );
    };

    const H4 = ({ children }) => {
        const anchor = getAnchor(children);
        const link = `#${anchor}`;
        return (
            <Waypoint
                onEnter={(event) => onHeadingVisibilityChange(event, anchor)}
                onLeave={(event) => onHeadingVisibilityChange(event, anchor)}
            >
                <h4 id={anchor}>
                    <a href={link} className="anchor-link">
                        #
                    </a>
                    {children}
                </h4>
            </Waypoint>
        );
    };

    const getComponent = (section, i) => {
        switch (section.__component) {
            case "page-components.text-section":
                return (
                    <Markdown
                        content={section.text}
                        endpointsDirectory={endpointsDirectory}
                        onHeadingVisibilityChange={onHeadingVisibilityChange}
                    />
                );

            case "page-components.media-section":
                return section.media.map((media) => {
                    return (
                        <Element as="div" className="image-wrapper">
                            <img src={media.url} alt={media.name} />
                        </Element>
                    );
                });

            case "page-components.api-reference":
                // Handled separately
                return null;
        }
    };

    const components = {
        Row,
        Portion,
        Card,
        Tabs,
        Text,
        ExpandableContent,
        Button,
        NextPage,
        WasPageHelpful,
        Element,
        CodeBlockWithCopy,
        Callout,
        h1: H1,
        h2: H2,
        h3: H3,
        h4: H4,
        MainImage,
        Badge,
    };

    return (
        <PageSectionsStyled>
            <Row sidePadding="medium" marginBottom="none">
                <Portion className="markdown-content">
                    <MDXRemote {...mdx} components={components} />
                </Portion>
            </Row>
        </PageSectionsStyled>
    );
};

export default PageSections;
