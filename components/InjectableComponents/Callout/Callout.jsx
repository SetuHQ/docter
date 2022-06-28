import React from "react";
import { useRouter } from "next/router";
import { Text } from "fictoan-react";

import { CalloutStyled } from "./Callout.styled";

const Callout = (props) => {
    const router = useRouter();
    return (
        <CalloutStyled className={props.type}>
            <Text marginBottom="none">{props.children}</Text>
        </CalloutStyled>
    );
};

export default Callout;
