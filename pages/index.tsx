//  External deps  ============================================================
import React from "react";
import Head from "next/head";
import Link from "next/link";

//  Internal deps  ============================================================
import { Button, Card, Element, Heading, HRule, Portion, Row, Text } from "fictoan-react";

//  Local components  =========================================================
import { HomeStyled } from "../styles/Home.styled";

const Home = (props) => {
    return (
        <HomeStyled>
            <Head>
                <title>Developer Documentation</title>
                <link rel="icon" type="image/png" href="/favicon-docs.png" />
            </Head>

            {/*  /////////////////////////////////////////////////////////  */}
            {/*  HERO  */}
            {/*  /////////////////////////////////////////////////////////  */}
            <Row sidePadding="huge" marginBottom="tiny" marginTop="tiny">
                <Portion>
                    <Card id="intro-hero" shape="rounded">
                        <Heading as="h2" marginBottom="nano">
                            Developer Documentation
                        </Heading>

                        <Text className="shadowed-text" marginBottom="micro">
                            Documentation and APIs for our products.
                        </Text>
                    </Card>
                </Portion>
            </Row>
        </HomeStyled>
    );
};

export default Home;
