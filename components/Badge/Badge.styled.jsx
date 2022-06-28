import styled from "styled-components";

export const BadgeStyled = styled.button`
    pointer-events: none !important;
    font-weight: bold !important;
    font-size: 12px !important;
    border-radius: 4px !important;
    padding: 4px !important;

    &.success {
        background-color: #c0e2d0 !important;
        color: #36a168 !important;
    }

    &.failure {
        background-color: #fcdddd !important;
        color: #f05656 !important;
    }

    &.warning {
        background-color: #fef0d7 !important;
        color: #feb452 !important;
    }

    &.tip {
        background-color: #d9ebff;
        color: #1482ff;
    }
`;
