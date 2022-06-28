import React from "react";
import Link from "next/link";
import ReactMarkdownWithHtml from "react-markdown/with-html";
import { Element, Portion, Row, Card, Tabs, Text, ExpandableContent } from "fictoan-react";
import gfm from "remark-gfm";
import CodeBlockWithCopy from "./CodeBlockWithCopy/CodeBlockWithCopy";
import { Waypoint } from "react-waypoint";

// Injectable components
import Callout from "../InjectableComponents/Callout/Callout";

const flatten = (text, child) => {
    return typeof child === "string"
        ? text + child
        : React.Children.toArray(child.props.children).reduce(flatten, text);
};

const renderers = {
    code: ({ language, value }) => {
        return <CodeBlockWithCopy language={language} source={value} />;
    },
    link: (props) => {
        return props.href.startsWith("/") ? (
            <Link href={props.href}>
                <>{props.children}</>
            </Link>
        ) : (
            <a href={props.href} rel="nofollow noopener noreferrer">
                {props.children}
            </a>
        );
    },
    table: (props) => {
        return (
            <Element as="div" className="table-container">
                {props.children}
            </Element>
        );
    },
};

const constructParsedHtml = (children) => {
    return Array.isArray(children)
        ? children.map((child) => (typeof child === "object" ? renderers.parsedHtml({ element: child }) : child))
        : children;
};

const Markdown = ({ content, endpointsDirectory, onHeadingVisibilityChange }) => {
    //Headings
    renderers.heading = (props) => {
        var children = React.Children.toArray(props.children);
        var text = children.reduce(flatten, "");
        var slug = text.toLowerCase().replace(/\W/g, "-");
        children.push(React.createElement("a", { href: "#" + slug }, "#"));
        return (
            <Waypoint
                onEnter={(event) => (props.level <= 4 ? onHeadingVisibilityChange(event, slug) : null)}
                onLeave={(event) => (props.level <= 4 ? onHeadingVisibilityChange(event, slug) : null)}
            >
                {React.createElement("h" + props.level, { id: slug }, children)}
            </Waypoint>
        );
    };

    // To inject components
    renderers.parsedHtml = (props) => {
        if (props.element.type === "component") {
            switch (props.element.props.id) {
                case "Callout":
                    return <Callout {...props.element.props} />;
                case "Row":
                    return (
                        <Row sidePadding={props.element.props["sidepadding"]} gutters={props.element.props["gutters"]}>
                            {constructParsedHtml(props.element.props.children)}
                        </Row>
                    );
                case "Portion":
                    return (
                        <Portion
                            desktopSpan={props.element.props["desktopspan"]}
                            mobileSpan={props.element.props["mobilespan"]}
                            tabLSSpan={props.element.props["tablsspan"]}
                            tabPTSpan={props.element.props["tabptspan"]}
                        >
                            {constructParsedHtml(props.element.props.children)}
                        </Portion>
                    );
                case "Tabs":
                    const tabsJSON = props.element.props["tabs"].replace(/\'/g, '"');
                    let tabs = JSON.parse(tabsJSON);
                    tabs = tabs.map((tab) => ({
                        ...tab,
                        content: (
                            <ReactMarkdownWithHtml
                                allowDangerousHtml
                                renderers={renderers}
                                children={tab.content}
                                plugins={[gfm]}
                            />
                        ),
                    }));
                    return <Tabs tabs={tabs} />;
                case "CodeBlock":
                    return renderers.code({
                        language: props.element.props.language,
                        value: props.element.props.children,
                    });
                case "Card":
                    return <Card {...props.element.props}>{constructParsedHtml(props.element.props.children)}</Card>;
                case "Details":
                    return <details>{constructParsedHtml(props.element.props.children)}</details>;
                case "Summary":
                    return (
                        <summary>
                            <Text weight={props.element.props.weight} marginBottom="none">
                                {props.element.props.children}
                            </Text>
                        </summary>
                    );
            }
        }
        return props.element;
    };

    return <ReactMarkdownWithHtml allowDangerousHtml renderers={renderers} children={content} plugins={[gfm]} />;
};

export default Markdown;
