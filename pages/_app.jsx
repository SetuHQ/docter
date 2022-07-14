//  External deps  ============================================================
import React, { useState, useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";

//  Internal deps  ============================================================
import { ThemeProvider, ContentWrapper, Element } from "fictoan-react";

//  Local components  =========================================================
import { GlobalStyle } from "../styles/Global.styled";
import { DocsLightTheme } from "../styles/Docs.light.theme";
import { DocsDarkTheme } from "../styles/Docs.dark.theme";
import Sidebar from "../components/Sidebar/Sidebar";
import { MobileHeader } from "../components/MobileHeader/MobileHeader";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";

import home_endpoints from "../utils/menuItems.json";
import { cmsService } from "../services/cmsService";

//  Local assets  =============================================================
import "../styles/SetuFonts.css";

//  Types  ====================================================================

function MyApp({ Component, pageProps }) {
    const router = useRouter();
    let [currentTheme, setCurrentTheme] = useState("light");
    let [docsDefaultLayout, setDocsDefaultLayout] = useState(true);
    let [isSidebarVisible, setIsSidebarVisible] = useState(false);
    let [endpoints, setEndpoints] = useState([]);
    const [linkToOpen, setLinkToOpen] = useState(router.asPath);

    useEffect(() => {
        // Set theme from local storage //////////////////////
        const storedValue = localStorage.getItem("theme");
        if (!!storedValue) {
            setCurrentTheme(storedValue);
        }

        // Reset body overflow if //////////////////////
        window.addEventListener("resize", updateBodyOverflow);

        if (process.env.NEXT_PUBLIC_NODE_ENV === "development") {
            console.log("Using development endpoints");
            cmsService
                .cms()
                .then((data) => {
                    setEndpoints(data["sidebar"]);
                })
                .catch((error) => {
                    console.log(error);
                });
        } else {
            setEndpoints(home_endpoints["sidebar"]);
        }

        return () => {
            window.removeEventListener("resize", updateBodyOverflow);
        };
    }, []);

    useEffect(() => {
        if (router.query.docPath && router.query.docPath.includes("api-reference")) {
            setDocsDefaultLayout(false);
        } else {
            setDocsDefaultLayout(true);
        }
    }, [router.query]);

    useEffect(() => {
        if (isSidebarVisible) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
    }, [isSidebarVisible]);

    const updateBodyOverflow = (event) => {
        if (window.innerWidth > 900) {
            if (document.body.style.overflow == "hidden") {
                document.body.style.overflow = "auto";
            }
        }
    };

    const toggleTheme = () => {
        if (currentTheme === "light") {
            setDocsTheme("dark");
        } else {
            setDocsTheme("light");
        }
    };

    const setDocsTheme = (theme) => {
        setCurrentTheme(theme);
        localStorage.setItem("theme", theme);
    };

    const toggleSidebarVisibility = () => {
        setIsSidebarVisible(!isSidebarVisible);
    };

    const modifiedPageProps = {
        ...pageProps,
        docsDefaultLayout,
        currentTheme,
        linkToOpen,
        endpoints,
        setLinkToOpen,
    };

    return (
        <>
            <Head>
                <link rel="shortcut icon" href="/favicon-docs.ico" />
            </Head>
            {!docsDefaultLayout && router.asPath.indexOf("api-reference") != -1 ? (
                // Moving out API Reference pages to prevent styling interference
                <Component {...modifiedPageProps} />
            ) : (
                <ThemeProvider theme={currentTheme === "light" ? DocsLightTheme : DocsDarkTheme}>
                    <GlobalStyle />

                    {isSidebarVisible && (
                        <Element as="div" className="sidebar-backdrop" onClick={() => setIsSidebarVisible(false)} />
                    )}
                    <Sidebar
                        currentTheme={currentTheme}
                        toggleTheme={toggleTheme}
                        isVisible={isSidebarVisible}
                        setIsSidebarVisible={setIsSidebarVisible}
                        endpoints={endpoints}
                        linkToOpen={linkToOpen}
                        setLinkToOpen={setLinkToOpen}
                    />

                    <ContentWrapper className={`${currentTheme}-theme`}>
                        {/* Only visible on viewport width < 900px */}
                        <MobileHeader currentTheme={currentTheme} toggleSidebarVisibility={toggleSidebarVisibility} />

                        {/* <Header endpoints={endpoints} /> */}

                        <Component {...modifiedPageProps} />

                        <Footer endpoints={endpoints} />
                    </ContentWrapper>
                </ThemeProvider>
            )}
        </>
    );
}

export default MyApp;
