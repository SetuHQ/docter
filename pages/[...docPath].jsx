//  External deps  ============================================================
import React, { useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";

//  Internal deps  ============================================================
import { Row, Portion, Button, Element, Spinner } from "fictoan-react";

//  Local components  =========================================================
import APIReference from "../components/APIReference/APIReference";
import PageSections from "../components/PageSections/PageSections";
import PageHeadings from "../components/PageHeadings/PageHeadings";
import { DocPathStyled } from "../styles/DocPath.styled";
import FourOhFour from "./404";

//  Local assets  =============================================================
import { serialize } from "next-mdx-remote/serialize";
import fs from "fs";
import path from "path";
import matter from "gray-matter";

import { cmsService } from "../services/cmsService";

import menuItems from "../utils/menuItems.json";
import redirects from "../content/redirects.json";

//  Types  ====================================================================

const DocPath = ({
    docPath,
    docsDefaultLayout,
    currentTheme,
    linkToOpen,
    endpoints,
    setLinkToOpen,
    mdx,
    pageDetails,
    raw,
    fourOhFour,
}) => {
    const router = useRouter();
    const [childOnChangeMethod, setChildOnChangeMethod] = useState(() => () => null);

    const isLoading = () => {
        return linkToOpen != router.asPath;
    };

    return (
        <>
            <Head>
                <title>{pageDetails.page_title} — Setu Docs</title>
                {pageDetails.meta_description && <meta name="description" content={pageDetails.meta_description} />}
            </Head>
            <div /> {/* Dummy div */}
            {!docsDefaultLayout ? (
                pageDetails.api_reference && (
                    <APIReference spec={pageDetails.api_reference} currentTheme={currentTheme} />
                )
            ) : fourOhFour ? (
                <FourOhFour />
            ) : (
                <DocPathStyled className={isLoading() ? "loading" : ""}>
                    <Row className="page-sections">
                        <Portion desktopSpan="18" tabLSSpan="24">
                            <Element as="div" marginTop="small">
                                <PageSections
                                    mdx={mdx}
                                    onHeadingVisibilityChange={childOnChangeMethod}
                                    sidebar={endpoints}
                                />
                            </Element>
                        </Portion>

                        <Portion desktopSpan="6">
                            {!isLoading() && (
                                <PageHeadings
                                    isLoading={isLoading()}
                                    raw={raw}
                                    setOnChangeMethod={setChildOnChangeMethod}
                                />
                            )}
                        </Portion>
                    </Row>

                    {isLoading() && <Spinner className="loading-spinner"></Spinner>}
                </DocPathStyled>
            )}
        </>
    );
};

const generatePaths = (currentDictionary, redirects, basePath) => {
    let paths = [];
    for (let nav of currentDictionary) {
        // Ignore hash links
        if (nav["path"][0] !== "#") {
            let path = basePath + "/" + nav["path"];
            if (!redirects[path] && path.split("/").length > 2) {
                paths.push({
                    params: {
                        docPath: path.split("/").slice(1),
                    },
                });
            }

            if (nav.children) {
                const childPaths = generatePaths(nav.children, redirects, basePath + "/" + nav.path);
                paths.push(...childPaths);
            }
        }
    }
    return paths;
};

export async function getStaticPaths() {
    let endpointsDirectory;

    if (process.env.NEXT_PUBLIC_NODE_ENV === "development") {
        let endpoints = await cmsService.cms();
        endpointsDirectory = endpoints["home"];
    } else {
        endpointsDirectory = menuItems["home"];
    }

    // const paths = generatePaths(endpointsDirectory);
    const paths = generatePaths(endpointsDirectory, redirects, "");
    return {
        fallback: "blocking",
        paths: paths,
    };
}

export async function getStaticProps({ params }) {
    const { docPath } = params;
    let markdownwithMeta;
    let endpointsDirectory;

    let redirectToSlug;
    if (process.env.NEXT_PUBLIC_NODE_ENV === "development") {
        let endpoints = await cmsService.cms();
        endpointsDirectory = endpoints["home"];
    } else {
        endpointsDirectory = menuItems["home"];
    }

    let redirectPath = "/" + docPath.join("/");

    if (redirects[redirectPath]) {
        redirectToSlug = redirects[redirectPath];
        return {
            // Redirection to route defined in CMS
            redirect: {
                destination: redirectToSlug,
                permanent: false,
            },
        };
    }

    for (let i in docPath) {
        let item = docPath[i];

        if (endpointsDirectory == null || !endpointsDirectory.some((endpoint) => endpoint.path === item)) {
            return {
                notFound: true,
            };
        }

        endpointsDirectory = endpointsDirectory.find((child) => child.path === item).children;
    }

    try {
        markdownwithMeta = fs.readFileSync(path.join("./content/categories/" + docPath.join("/") + ".mdx"), "utf-8");
    } catch (e) {
        markdownwithMeta = "";
    }

    const { data: frontMatter, content } = matter(markdownwithMeta);
    let raw = content;
    const mdxSource = await serialize(content);

    return {
        props: {
            docPath: docPath,
            mdx: mdxSource,
            pageDetails: frontMatter,
            raw: raw,
            fourOhFour: false,
        },
    };
}

export default DocPath;
