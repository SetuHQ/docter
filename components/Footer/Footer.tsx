//  External deps  ============================================================
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

//  Internal deps  ============================================================
import { Element, Row, Portion, Text, HRule, Button, Spinner } from "fictoan-react";

//  Types  ====================================================================

//  Local components  =========================================================
import { FooterStyled } from "./Footer.styled";

//  Local assets  =============================================================
import LogoSmall from "../../assets/images/logo-footer.svg";

const Footer = ({ endpoints }) => {
    const router = useRouter();

    const [categories, setCategories] = useState({});
    const currentYear = new Date().getFullYear();

    useEffect(() => {
        let categories = {};
        endpoints.forEach((category) => {
            if (category.path !== "dev-tools" && category.visible_in_sidebar) {
                categories[category.path] = category;
            }
        });
        setCategories(categories);
    }, [endpoints]);

    return (
        <FooterStyled>
            <Element as="section" paddingTop="small" paddingBottom="tiny">
                <Row sidePadding={router.asPath === "/" ? "huge" : "large"} marginBottom="none">
                    <Portion desktopSpan="2" tabPTSpan="4" mobileSpan="4" marginBottom="tiny">
                        <Link href="/">
                            <LogoSmall />
                        </Link>
                    </Portion>

                    <Portion desktopSpan="4" tabPTSpan="whole" />

                    {/*  PRODUCTS  ===========================================  */}
                    <Portion desktopSpan="one-fourth" tabPTSpan="one-third" mobileSpan="half" marginBottom="micro">
                        {Object.keys(categories).length === 0 ? (
                            <Spinner marginTop="medium"></Spinner>
                        ) : (
                            Object.keys(categories).map((categoryName, i) => (
                                <Element as="div" className="footer-section" key={i}>
                                    <Text size="small" margin="none" textColour="teal">
                                        {categoryName.toUpperCase()}
                                    </Text>
                                    {categories[categoryName]["children"].map(
                                        (product, j) =>
                                            product.visible_in_sidebar && (
                                                <Link href={categories[categoryName].path + "/" + product.path} key={j}>
                                                    {product.name}
                                                </Link>
                                            )
                                    )}
                                </Element>
                            ))
                        )}
                    </Portion>

                    {/*  DEVELOPERS  ===========================================  */}
                    <Portion desktopSpan="one-fourth" tabPTSpan="one-third" mobileSpan="half" marginBottom="micro">
                        <Element as="div" className="footer-section">
                            <Text size="small" margin="none" textColour="teal">
                                COMPANY
                            </Text>

                            <a href="#" target="_blank">
                                About
                            </a>

                            <a href="#" target="_blank">
                                Careers
                            </a>

                            <a href="#" target="_blank" rel="noopener noreferrer">
                                Blog
                            </a>
                        </Element>
                    </Portion>

                    {/*  COMPANY  ===========================================  */}
                    <Portion desktopSpan="one-fourth" tabPTSpan="one-third" mobileSpan="half">
                        <Element as="div" className="footer-section">
                            <Text size="small" margin="none" textColour="teal">
                                HELP
                            </Text>

                            <a href="#" target="_blank" rel="noopener noreferrer">
                                Product FAQs
                            </a>

                            <a href="#" target="_blank" rel="noopener noreferrer">
                                Knowledge Base
                            </a>

                            <a href="#" target="_blank">
                                Contact
                            </a>

                            <a href="#" target="_blank" rel="noopener noreferrer">
                                Raise a ticket
                            </a>
                        </Element>
                    </Portion>
                </Row>
            </Element>

            <HRule
                kind="secondary"
                sideMargin={router.asPath === "/" ? "huge" : "large"}
                marginTop="nano"
                marginBottom="nano"
            />

            <Element as="section" paddingTop="nano" paddingBottom="micro">
                <Row sidePadding={router.asPath === "/" ? "huge" : "large"} marginBottom="none">
                    <Portion>
                        <Text size="small">&copy; {currentYear} Company Name Pvt. Ltd</Text>
                    </Portion>
                </Row>
            </Element>
        </FooterStyled>
    );
};

export default Footer;
