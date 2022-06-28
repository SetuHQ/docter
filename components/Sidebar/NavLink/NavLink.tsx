import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";

export const isExpanded = (routerPath, slug) => {
    const index = routerPath.indexOf(slug);
    if (index !== -1) {
        if (
            routerPath[index + slug.length] === undefined ||
            routerPath[index + slug.length] === "/" ||
            routerPath[index + slug.length] === "#"
        ) {
            return true;
        }
    }

    return false;
};

const NavLink = ({ href, children, className = "", style = {}, exact = false, newTab = false }) => {
    const router = useRouter();

    const isActive = (slug) => {
        return exact ? router.asPath.split("#")[0] === slug : isExpanded(router.asPath, slug);
    };

    return (
        <Link href={href} passHref>
            <a
                className={`${className} ${isActive(href) ? "active" : ""} ${
                    isExpanded(router.asPath, href) ? "expanded" : ""
                }`}
                target={newTab ? "_blank" : ""}
                style={{ ...style }}
            >
                {children}
            </a>
        </Link>
    );
};

export default NavLink;
