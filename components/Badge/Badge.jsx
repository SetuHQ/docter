import React from "react";
import { BadgeStyled } from "./Badge.styled";

const Badge = (props) => {
    return <BadgeStyled className={props.type}>{props.children}</BadgeStyled>;
};

export default Badge;
