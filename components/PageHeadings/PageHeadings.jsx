import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Element, Row, Portion, Text, HRule } from "fictoan-react";

import { PageHeadingsStyled } from "./PageHeadings.styled";

const PageHeadings = ({ isLoading, setOnChangeMethod, raw }) => {
    const [headings, setHeadings] = useState([]);
    const [visibleIndex, setVisibleIndex] = useState(0);
    const router = useRouter();

    useEffect(() => {
        /* To set a function in state, allowing sibling to sibling function transfer (through parent's state)
            https://stackoverflow.com/questions/55621212/is-it-possible-to-react-usestate-in-react
        */
        setOnChangeMethod(() => onHeadingsVisibilityChange);
    }, [headings]);

    useEffect(() => {
        let newHeadings = [];

        const headingRegex = /^(#{1,4})\s+([^\n]*)/gm;
        const matches = raw.match(headingRegex);

        if (matches) {
            for (let match of matches) {
                let slug = "#" + match.trim().replace(/#+ /g, "").toLowerCase().replace(/\W/g, "-");

                newHeadings.push({
                    text: match.trim().replace(/#+ /g, ""),
                    slug: slug,
                });
            }
        }
        // for (let section of sections) {
        //     if (section.__component == "page-components.text-section") {
        //         const headingRegex = /^(#{1,4})\s+([^\n]*)/gm;
        //         const matches = section.text.match(headingRegex);

        //         if (matches) {
        //             for (let match of matches) {
        //                 let slug =
        //                     "#" +
        //                     match.trim().replace(/#+ /g, "").toLowerCase().replace(/\W/g, "-");

        //                 newHeadings.push({
        //                     text: match.trim().replace(/#+ /g, ""),
        //                     slug: slug
        //                 });
        //             }
        //         }
        //     }
        // }
        setHeadings(newHeadings);
        setVisibleIndex(0);
    }, [raw]);

    const isInViewport = (id) => {
        const el = document.getElementById(id);
        if (!el) {
            return false;
        }

        const rect = el.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    };

    const onHeadingsVisibilityChange = (event, slug) => {
        if (event.currentPosition == "inside") {
            let index = headings.findIndex((heading) => heading.slug == "#" + slug);
            if (event.previousPosition == "below") {
                if (index < headings.length && index > visibleIndex) {
                    setVisibleIndex(index);
                }
            } else if (event.previousPosition == "above") {
                if (index >= 0 && index < visibleIndex) {
                    setVisibleIndex(index);
                }
            }
        } else if (event.currentPosition == "below") {
            let index = headings.findIndex((heading) => heading.slug == "#" + slug);
            if (index > 0) {
                setVisibleIndex(index - 1);
            }
        } else if (event.currentPosition == "above") {
            let index = headings.findIndex((heading) => heading.slug == "#" + slug);
            if (index >= 0 && index < headings.length - 1 && isInViewport(headings[index + 1].slug.slice(1))) {
                setVisibleIndex(index + 1);
            }
        }
    };

    return (
        <PageHeadingsStyled>
            <Element as="div" className="headings-container">
                <Text size="small" textColour="slate-60" marginBottom="nano">
                    ON THIS PAGE
                </Text>
                {!isLoading &&
                    headings.map((heading, i) => (
                        <Element
                            as="a"
                            href={heading.slug}
                            key={i}
                            className={`heading-hash ${i == visibleIndex ? "visible" : ""}`}
                        >
                            {heading.text}
                        </Element>
                    ))}

                <HRule kind="secondary" marginTop="micro" marginBottom="micro" />

                <Text size="small" marginBottom="nano">
                    Need help with integration, or want to report a bug?
                </Text>
                <Element as="a" href="#" target="_blank">
                    Raise a ticket &#8599;
                </Element>
            </Element>
        </PageHeadingsStyled>
    );
};

export default PageHeadings;
