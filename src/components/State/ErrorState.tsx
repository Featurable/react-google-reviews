/** @jsxImportSource @emotion/react */

import { css } from "@emotion/react";
import React, { FC } from "react";
import { ErrorStateCSSProps } from "../../types/cssProps";

const error = css`
    padding-top: 64px;
    padding-bottom: 64px;
    text-align: center;
    font-size: 16px;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
        Helvetica, Arial, sans-serif, "Apple Color Emoji",
        "Segoe UI Emoji", "Segoe UI Symbol";
`;

type ErrorStateProps = {
    errorMessage?: React.ReactNode;
};

export const ErrorState: FC<ErrorStateProps & ErrorStateCSSProps> = ({
    errorMessage,
    errorClassName,
    errorStyle,
}) => {
    return (
        <div
            css={error}
            className={errorClassName}
            style={errorStyle}
        >
            {errorMessage ??
                "Failed to load Google reviews. Please try again later."}
        </div>
    );
};
