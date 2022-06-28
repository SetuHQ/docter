import React from "react";
import { Element, CodeBlock, Button } from "fictoan-react";

const CodeBlockWithCopy = ({ language, source, children }) => {
    const copyToClipboard = (event, value) => {
        const el = document.createElement("textarea");
        el.value = value;
        el.setAttribute("readonly", "");
        el.style.position = "absolute";
        el.style.left = "-9999px";
        document.body.appendChild(el);
        el.select();
        document.execCommand("copy");
        document.body.removeChild(el);
        // Updating button text
        event.target.innerText = "Copied!";
        setTimeout(() => {
            event.target.innerText = "Copy";
        }, 2000);
    };

    return (
        <Element as="div" className="code-block-container">
            <Button
                kind="tertiary"
                size="tiny"
                className="code-block-copy-btn"
                onClick={(e) => copyToClipboard(e, children)}
            >
                Copy
            </Button>
            <CodeBlock language={language} source={children} />
        </Element>
    );
};

export default CodeBlockWithCopy;
