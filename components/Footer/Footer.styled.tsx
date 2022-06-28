import styled from "styled-components";

export const FooterStyled = styled.footer`
    background-color: ${(props) => props.theme.Footer.bg};
    margin-top: auto;

    & img {
        width: 40px;
    }

    .footer-section {
        display: flex;
        flex-direction: column;
    }

    .footer-section:not(:last-child) {
        margin-bottom: 24px;
    }

    .footer-section p {
        font-weight: 600;
        color: ${(props) => props.theme.Footer.sectionTitle.text};
    }

    a {
        font-weight: 400;
        color: ${(props) => props.theme.Footer.links.text};
        font-size: 96%;
        margin: 2px 0;
    }
`;
