//  External deps  ============================================================
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

//  Internal deps  ============================================================
import {
    Element,
    ExpandableContent,
    HRule,
    SidebarFooter,
    SidebarHeader,
    SidebarItem,
    SidebarItemIcon,
    SidebarItemText,
    SidebarWrapper,
    Spinner,
    NotificationsWrapper,
} from "fictoan-react";

import Callout from "../InjectableComponents/Callout/Callout";

//  Types  ====================================================================
//  Local components  =========================================================
import NavLink, { isExpanded as isNavExpanded } from "./NavLink/NavLink";

//  Local assets  =============================================================
// import LogoBig from "../../assets/images/logo-docs.svg";
import LogoBig from "../../assets/images/logo-main.svg";
import LogoBigDark from "../../assets/images/logo-main-dark.svg";
import LogoSmall from "../../assets/images/logo-footer.svg";
import HomeIcon from "../../assets/icons/home.svg";
import BackIcon from "../../assets/icons/back.svg";
import ProductIcon from "../../assets/icons/product.svg";
import ThemeIcon from "../../assets/icons/theme.svg";

export const Sidebar = ({
    currentTheme,
    toggleTheme,
    endpointsDirectory,
    isVisible,
    setIsSidebarVisible,
    linkToOpen,
    endpoints,
    setLinkToOpen,
}) => {
    const router = useRouter();
    const docPath = router.query.docPath || [];
    const [activeLinkset, setActiveLinkset] = useState(docPath.length < 2 ? "linkset-1" : "linkset-2");
    const [linkset2Navs, setLinkset2Navs] = useState([""]);

    // Hack to open API reference in new tab ///////////////////
    const openInNewTab = ["fastag"];
    ////////////////////////////////////////////////////////////

    useEffect(() => {
        if (endpoints.length > 0) {
            let test = generateNavs(endpoints, router.asPath);
            setLinkset2Navs(test);
        }
    }, [endpoints]);

    useEffect(() => {
        setLinkToOpen(router.asPath);
        if (router.asPath.split("/").slice(1).length <= 2) {
            setActiveLinkset("linkset-1");
        } else {
            if (linkToOpen != router.asPath) {
                setLinkset2Navs(generateNavs(endpoints, router.asPath));
                if (activeLinkset !== "linkset-2") {
                    setActiveLinkset("linkset-2");
                }
            }
        }
    }, [router.asPath]);

    const onNavClick = (e, slug, hasChildren) => {
        console.log("Slug", slug);
        // To prevent linkset change while opening in a new tab using Ctrl/Cmd + click
        if (e.ctrlKey || e.metaKey) {
            return;
        }

        // Hack to open API reference in new tab ///////////////////
        if (openInNewTab.includes(slug.split("/").slice(2, 3)[0])) {
            return;
        }
        ////////////////////////////////////////////////////////////

        setLinkToOpen(slug);
        if (activeLinkset !== "linkset-2" && hasChildren) {
            setLinkset2Navs(generateNavs(endpoints, slug));
            setActiveLinkset("linkset-2");
        }
        setIsSidebarVisible(false);
    };

    const getIcon = (iconName) => {
        switch (iconName) {
            default:
                return <ProductIcon />;
        }
    };

    const createSidebarItem = (product, slug, level, type) => {
        const isAPIReference = product.path.indexOf("api-reference") !== -1;
        let isAccordion = false;
        let isProduct = false;

        type === "product" ? (isProduct = true) : null;
        type === "accordion" ? (isAccordion = true) : null;

        if (isProduct) {
            return (
                <SidebarItem key={product.path} className="product-nav expanded">
                    <SidebarItemIcon iconType="stroked">{getIcon(product.path.toUpperCase())}</SidebarItemIcon>
                    <SidebarItemText className="sidebar-item-text" weight="600" linkText={product.name} />
                </SidebarItem>
            );
        } else if (isAccordion) {
            return (
                <ExpandableContent
                    open
                    key={product.slug}
                    style={{ order: 1000 }}
                    marginTop="micro"
                    summary={
                        <SidebarItem className="product-nav expanded">
                            <SidebarItemIcon iconType="stroked">{getIcon(product.icon)}</SidebarItemIcon>
                            <SidebarItemText className="sidebar-item-text" weight="600" linkText={product.name} />
                        </SidebarItem>
                    }
                >
                    <Element
                        as="section"
                        style={{
                            display: "flex",
                            flexDirection: "column",
                        }}
                    >
                        {generateNavsHelper(product.children, slug, level)}
                    </Element>
                </ExpandableContent>
            );
        } else {
            return (
                product.visible_in_sidebar && (
                    <NavLink
                        key={product.path}
                        href={slug + "/" + product.path}
                        exact
                        className="sub-nav"
                        newTab={isAPIReference}
                        style={{ order: product.order }}
                    >
                        <SidebarItem
                            style={{
                                paddingLeft: level * 15 + "px",
                                gridTemplateRows: 40 - level * 5 + "px",
                            }}
                            onClick={(e) => (isAPIReference ? null : onNavClick(e, slug + "/" + product.path, true))}
                        >
                            <SidebarItemIcon iconType="stroked" />
                            <SidebarItemText
                                className="sidebar-item-text"
                                weight="400"
                                textColor={level === 0 ? undefined : "slate-80"}
                                linkText={product.name}
                            />
                        </SidebarItem>
                    </NavLink>
                )
            );
        }
    };

    const generateNavsHelper = (page, slug, level) => {
        let output = [];
        let child_output = [];

        if (page.children) {
            output.push(createSidebarItem(page, slug, level, "link"));
            slug += "/" + page.path;
            // Generate child trees
            for (let sub_page of page.children) {
                let childNavs = generateNavsHelper(sub_page, slug, level + 1);

                // Add it as sub-navs to the current tree
                child_output.push(...childNavs);
            }
            output.push(
                <Element as="section" className="sub-navs" key={slug} style={{ order: page.order }}>
                    {child_output}
                </Element>
            );
        } else {
            output.push(createSidebarItem(page, slug, level, "link"));
        }
        return output;
    };

    const generateNavs = (directory, slug) => {
        let segments = slug.split("/").slice(0, 3);

        for (let category of directory) {
            if (category.path === segments[1]) {
                if (category.children) {
                    console.log(category.children);
                    for (let product of category.children) {
                        if (product.path === segments[2]) {
                            console.log(product.path);
                            let output = [];
                            output.push(createSidebarItem(product, segments.join("/"), 0, "product"));
                            if (product.children) {
                                for (let page of product.children) {
                                    output.push(generateNavsHelper(page, segments.join("/"), 0));
                                }
                            }
                            return output;
                        }
                    }
                }
            }
        }
        return [""];
    };

    return (
        <SidebarWrapper id="docs-sidebar" className={`${isVisible ? "visible" : ""}`}>
            <SidebarHeader>
                <div className="header-logo">{currentTheme == "light" ? <LogoBig /> : <LogoBigDark />}</div>
                <div className="header-icon">
                    <LogoSmall />
                </div>
            </SidebarHeader>

            {/*  HOME  ==================================================  */}
            {/* <NavLink href="/" exact>
                <SidebarItem onClick={() => setActiveLinkset("linkset-1")}>
                    <SidebarItemIcon iconType="stroked">
                        <HomeIcon />
                    </SidebarItemIcon>
                    <SidebarItemText className="sidebar-item-text" weight="400" linkText="Home" />
                </SidebarItem>
            </NavLink>*/}

            <HRule kind="secondary" marginTop="nano" marginBottom="nano" />

            {endpoints.length === 0 ? (
                <Spinner marginTop="medium"></Spinner>
            ) : (
                <Element as="div" id="linkset-wrapper" className={`${activeLinkset}-active`}>
                    {/* <> */}
                    <Element as="div" id="linkset-1" className="linkset">
                        {endpoints.map((category) => {
                            return category["visible_in_sidebar"] ? (
                                <Element
                                    as="div"
                                    key={category["name"]}
                                    style={{
                                        order: category["order"],
                                    }}
                                >
                                    {category["children"] ? (
                                        <>
                                            <Element as="div" marginTop="micro" marginBottom="none" />
                                            <>
                                                <SidebarItem>
                                                    <SidebarItemIcon iconType="stroked" />
                                                    <SidebarItemText
                                                        className="sidebar-item-text"
                                                        weight="600"
                                                        textColour="slate-60"
                                                        size="medium"
                                                        linkText={category["name"]}
                                                    />
                                                </SidebarItem>

                                                <Element as="div" className="sub-navs-open">
                                                    {category["children"].map((product, j) => {
                                                        return product["visible_in_sidebar"] ? (
                                                            <NavLink
                                                                href={
                                                                    isNavExpanded(router.asPath, product["path"])
                                                                        ? router.asPath
                                                                        : "/" + category["path"] + "/" + product["path"]
                                                                }
                                                                key={j}
                                                                newTab={openInNewTab.includes(product["path"])} // Hack //
                                                                style={{
                                                                    order: product["order"],
                                                                }}
                                                            >
                                                                <SidebarItem
                                                                    onClick={(e) =>
                                                                        onNavClick(
                                                                            e,
                                                                            isNavExpanded(
                                                                                router.asPath,
                                                                                "/" +
                                                                                    category["path"] +
                                                                                    "/" +
                                                                                    product["path"]
                                                                            )
                                                                                ? router.asPath
                                                                                : "/" +
                                                                                      category["path"] +
                                                                                      "/" +
                                                                                      product["path"],
                                                                            product["children"]
                                                                        )
                                                                    }
                                                                >
                                                                    <SidebarItemIcon iconType="stroked">
                                                                        {getIcon(product["path"].toUpperCase())}
                                                                    </SidebarItemIcon>
                                                                    <SidebarItemText
                                                                        className="sidebar-item-text"
                                                                        weight="400"
                                                                        linkText={product.name}
                                                                    />
                                                                </SidebarItem>
                                                            </NavLink>
                                                        ) : product["visible_in_sidebar"] === undefined ? (
                                                            <>
                                                                <Spinner marginTop="medium"></Spinner>
                                                                <NotificationsWrapper anchor="top" position="right">
                                                                    <Callout type="error">
                                                                        Something went wrong. Please check console.
                                                                    </Callout>
                                                                </NotificationsWrapper>
                                                            </>
                                                        ) : null;
                                                    })}
                                                </Element>
                                            </>
                                            <Element as="div" marginTop="none" marginBottom="micro" />
                                        </>
                                    ) : (
                                        <NavLink
                                            href={
                                                isNavExpanded(router.asPath, category["path"])
                                                    ? router.asPath
                                                    : "/" + category["path"]
                                            }
                                            key={category["name"]}
                                            newTab={openInNewTab.includes(category["path"])} // Hack //
                                            style={{
                                                order: category["order"],
                                            }}
                                        >
                                            <SidebarItem
                                                onClick={(e) =>
                                                    onNavClick(
                                                        e,
                                                        isNavExpanded(router.asPath, "/" + category["path"])
                                                            ? router.asPath
                                                            : "/" + category["path"],
                                                        false
                                                    )
                                                }
                                            >
                                                <SidebarItemIcon iconType="stroked">
                                                    {getIcon(category["path"].toUpperCase())}
                                                </SidebarItemIcon>
                                                <SidebarItemText
                                                    className="sidebar-item-text"
                                                    weight="400"
                                                    linkText={category.name}
                                                />
                                            </SidebarItem>
                                        </NavLink>
                                    )}
                                </Element>
                            ) : category["visible_in_sidebar"] === undefined ? (
                                <>
                                    <Spinner marginTop="medium"></Spinner>
                                    <NotificationsWrapper anchor="top" position="right">
                                        <Callout type="error">Something went wrong. Please check console.</Callout>
                                    </NotificationsWrapper>
                                </>
                            ) : null;
                        })}
                    </Element>

                    <Element as="div" id="linkset-2" className="linkset">
                        <SidebarItem
                            onClick={() => {
                                setActiveLinkset("linkset-1");
                            }}
                        >
                            <SidebarItemIcon iconType="stroked">
                                <BackIcon />
                            </SidebarItemIcon>
                            <SidebarItemText className="sidebar-item-text" weight="400" linkText="Back" />
                        </SidebarItem>

                        <HRule kind="tertiary" marginTop="nano" marginBottom="nano" />

                        {/*  NAVS UNDER A PRODUCT ============================================  */}
                        {linkToOpen != router.asPath ? <Spinner marginTop="medium"></Spinner> : linkset2Navs}
                    </Element>
                </Element>
            )}

            <SidebarFooter>
                <SidebarItem onClick={toggleTheme}>
                    <SidebarItemIcon iconType="stroked">
                        <ThemeIcon />
                    </SidebarItemIcon>
                    <SidebarItemText className="sidebar-item-text" weight="400" linkText="Theme" />
                </SidebarItem>
            </SidebarFooter>
        </SidebarWrapper>
    );
};

export default Sidebar;
