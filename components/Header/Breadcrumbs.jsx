import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { BreadcrumbItem, BreadcrumbsWrapper, Element } from "fictoan-react";

import { BreadcrumbsStyled } from "./Breadcrumbs.styled";

const Breadcrumbs = () => {
    const router = useRouter();
    const routeSegments = router.asPath.split("#")[0].split("/").slice(1);

    return (
        <BreadcrumbsStyled>
            <BreadcrumbsWrapper className="breadcrumbs-wrapper">
                <ul>
                    <BreadcrumbItem>
                        <Link href={"/"} passHref>
                            <Element as="a" size="small" weight="600" textColor="teal">
                                HOME
                            </Element>
                        </Link>
                    </BreadcrumbItem>
                    {router.asPath != "/" &&
                        routeSegments.map((path, i) => (
                            <BreadcrumbItem key={i}>
                                <Link
                                    href={routeSegments.reduce(
                                        (slug, item, j) => (j <= i ? slug + "/" + item : slug),
                                        ""
                                    )}
                                    passHref
                                >
                                    <Element as="a" size="small" weight="600" textColor="teal">
                                        {path.toUpperCase()}
                                    </Element>
                                </Link>
                            </BreadcrumbItem>
                        ))}
                </ul>
            </BreadcrumbsWrapper>
        </BreadcrumbsStyled>
    );
};

export default Breadcrumbs;
