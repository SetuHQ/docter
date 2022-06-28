import React, { useEffect } from "react";

import { RedocStandalone } from "redoc";
import { APIReferenceStyled } from "./APIReference.styled";
import lightTheme from "../../styles/redoc-theme/light.theme";
import darkTheme from "../../styles/redoc-theme/dark.theme";

const APIReference = ({ spec, currentTheme }) => {
    useEffect(() => {
        document.body.style.margin = 0;
    }, []);

    return (
        <APIReferenceStyled className={currentTheme}>
            <RedocStandalone
                spec={spec}
                // @ts-ignore
                options={{
                    nativeScrollbars: true,
                    theme: currentTheme == "light" ? lightTheme : darkTheme,
                }}
            />
        </APIReferenceStyled>
    );
};

export default APIReference;
