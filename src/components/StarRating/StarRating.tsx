/** @jsxImportSource @emotion/react */

import { css } from "@emotion/react";
import { FC } from "react";
import { StarIcon } from "./StarIcon";

const starRating = css`
    display: flex;
    align-items: center;
`;

const star = css`
    height: 20px;
    width: 20px;
`;

const starFilled = css`
    color: #f8af0d;
`;

const starEmpty = css`
    color: #6b7280;
`;

export const StarRating: FC<{
    rating: number;
    className?: string;
}> = ({ rating }) => {
    return (
        <div css={starRating}>
            {Array.from({ length: 5 }).map((_, i) => (
                <StarIcon
                    key={i}
                    css={[
                        star,
                        rating >= i + 1 ? starFilled : starEmpty,
                    ]}
                />
            ))}
        </div>
    );
};
