import React from "react";
import { useRouter } from "next/router";
import { Element } from "fictoan-react";

const MainImage = ({ src, alt }) => {
    return (
        <Element as="div" className="image-wrapper">
            <img src={src} alt={alt} />
        </Element>
    );
};

export default MainImage;
