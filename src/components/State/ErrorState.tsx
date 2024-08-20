/** @jsxImportSource @emotion/react */

import { css } from "@emotion/react";
import { FC } from "react";

const error = css`
    padding-top: 64px;
    padding-bottom: 64px;
    text-align: center;
    font-size: 16px;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
        Helvetica, Arial, sans-serif, "Apple Color Emoji",
        "Segoe UI Emoji", "Segoe UI Symbol";
`;

export const ErrorState: FC<{}> = () => {
    return (
        <div css={error}>
            Failed to load Google reviews. Please try again later.
        </div>
    );
};
