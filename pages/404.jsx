import Link from "next/link";
import { Row, Portion, Heading, Text } from "fictoan-react";

//  Local assets  =============================================================

const FourOhFour = () => {
    return (
        <Row sidePadding="huge" marginTop="medium" marginBottom="large">
            <Portion>
                <Heading as="h1" weight="400" marginBottom="micro">
                    <Text size="huge">Uh-oh!</Text>
                </Heading>
                <Text size="huge" marginBottom="micro">
                    The page you’re looking for doesn’t seem to exist.
                </Text>
                <Link href="/">
                    <a>Go back home, instead?</a>
                </Link>
            </Portion>
        </Row>
    );
};

export default FourOhFour;
