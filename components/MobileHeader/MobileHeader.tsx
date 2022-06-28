import React from "react";
import Link from "next/link";

import LogoBig from "../../assets/images/logo-main.svg";
import LogoBigDark from "../../assets/images/logo-main-dark.svg";
import { MobileHeaderStyled } from "./MobileHeader.styled";

interface Props {
    currentTheme: String;
    toggleSidebarVisibility: () => void;
}

export const MobileHeader = (props: Props) => (
    <MobileHeaderStyled>
        <div className="menu-toggle" onClick={props.toggleSidebarVisibility}>
            <h5>—</h5>
            <h5>–</h5>
        </div>

        <Link href="/">{props.currentTheme == "light" ? <LogoBig /> : <LogoBigDark />}</Link>
    </MobileHeaderStyled>
);
