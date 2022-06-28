import React, { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Row, Portion, Text, Card } from "fictoan-react";

import { NextPageStyled } from "./NextPage.styled";

const NextPage = ({ info }) => {
    const router = useRouter();

    return (
        <NextPageStyled>
            <Row marginTop="small" marginBottom="small">
                <Portion desktopSpan="half" />

                <Portion desktopSpan="half">
                    <Link href={info.slug} class="next-page-link" passHref>
                        <a className="full-width">
                            <Card className="next-page-card" padding="micro" shape="rounded">
                                <Text size="small" weight="600" textColor="slate-60" marginBottom="micro">
                                    READ NEXT &rarr;
                                </Text>
                                <Text size="large" weight="600" textColor="blue-90">
                                    {info.title}
                                </Text>
                                <Text weight="400">{info.description}</Text>
                            </Card>
                        </a>
                    </Link>
                </Portion>
            </Row>
        </NextPageStyled>
    );
};

export default NextPage;
