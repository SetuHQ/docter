import React from "react";
import { useRouter } from "next/router";
import { Element, Portion, Row } from "fictoan-react";

import SearchField from "../SearchField/SearchField";
import Breadcrumbs from "./Breadcrumbs";
import { HeaderStyled } from "./Header.styled";

const Header = ({ endpoints }) => {
    const router = useRouter();

    return (
        <HeaderStyled>
            <Row sidePadding={router.asPath == "/" ? "huge" : "medium"} marginBottom="none" className="header">
                <Portion desktopSpan={router.asPath == "/" ? "12" : "16"} marginTop="nano">
                    <Breadcrumbs />
                </Portion>

                <Portion desktopSpan={router.asPath == "/" ? "12" : "8"}>
                    <Element as="div" id="search-wrapper">
                        <SearchField endpoints={endpoints} />
                    </Element>
                </Portion>
            </Row>
        </HeaderStyled>
    );
};

export default Header;
