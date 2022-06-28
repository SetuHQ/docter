import React, { useEffect, useState } from "react";
import { Row, Portion, Text, Card, Element, HRule, Button } from "fictoan-react";
import { useRouter } from "next/router";

import { WasPageHelpfulStyled } from "./WasPageHelpful.styled";

const WasPageHelpful = ({ pageTitle }) => {
    const [wasYesClicked, setWasYesClicked] = useState(false);
    const [wasNoClicked, setWasNoClicked] = useState(false);
    const router = useRouter();

    useEffect(() => {
        setTimeout(() => {
            setWasNoClicked(false);
            setWasYesClicked(false);
        }, 5000);
    }, [wasNoClicked, wasYesClicked]);

    return (
        <WasPageHelpfulStyled>
            <HRule kind="primary" />
            <Row marginBottom="small" marginTop="tiny">
                <Portion desktopSpan="whole">
                    <Card shape="rounded" padding="micro">
                        <Row marginBottom="none">
                            <Portion desktopSpan="whole">
                                <Element as="div" marginBottom="nano">
                                    <Text size="large" align="centre">
                                        Was this page helpful?
                                    </Text>
                                    {/* <Text align="centre" textColour="slate-60">15 people found this page useful</Text> */}
                                </Element>
                            </Portion>

                            <Portion desktopSpan="8" hideOnTabLS hideOnTabPT hideOnMobile />

                            <Portion desktopSpan="4" tabLSSpan="12" tabPTSpan="12" mobileSpan="12">
                                <Button
                                    kind="custom"
                                    shape="rounded"
                                    bgColour={wasYesClicked ? "green" : "green-10"}
                                    textColour={wasYesClicked ? "white" : "green"}
                                    borderColour="green"
                                    isFullWidth
                                    onClick={() => {
                                        setWasYesClicked(true);
                                        setWasNoClicked(false);
                                    }}
                                >
                                    Yes
                                </Button>
                            </Portion>

                            <Portion desktopSpan="4" tabLSSpan="12" tabPTSpan="12" mobileSpan="12">
                                <Button
                                    kind="custom"
                                    shape="rounded"
                                    bgColour={wasNoClicked ? "red" : "red-10"}
                                    textColour={wasNoClicked ? "white" : "red"}
                                    borderColour="red"
                                    isFullWidth
                                    onClick={() => {
                                        setWasNoClicked(true);
                                        setWasYesClicked(false);
                                    }}
                                >
                                    No
                                </Button>
                            </Portion>

                            <Portion desktopSpan="8" hideOnTabLS hideOnTabPT hideOnMobile />

                            <Portion desktopSpan="whole">
                                {wasYesClicked && <Text align="centre">Thank you for your feedback!</Text>}
                                {wasNoClicked && (
                                    <Text align="centre">
                                        Thank you for your feedback—we’ll do all we can to make it better!
                                    </Text>
                                )}
                            </Portion>
                        </Row>
                    </Card>
                </Portion>
            </Row>
        </WasPageHelpfulStyled>
    );
};

export default WasPageHelpful;
