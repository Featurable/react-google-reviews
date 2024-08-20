/** @jsxImportSource @emotion/react */

import { css } from "@emotion/react";
import { FC, useMemo } from "react";
import { Theme } from "../../types/review";
import { GoogleIcon } from "../Google/GoogleIcon";

const badge = css`
    text-align: center;
    width: 100%;
`;

const badgeContainer = css`
    text-align: left;
    display: inline-flex;
    align-items: center;
    border-top: 4px solid #10b981;
    border-radius: 6px;
    padding: 12px 16px;
    margin: 0 auto;
    box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1),
        0 1px 2px -1px rgb(0 0 0 / 0.1);
`;

const badgeContainerLight = css`
    background: white;
`;

const badgeContainerDark = css`
    background: #111827;
`;

const badgeGoogleIcon = css`
    height: 42px;
    width: 42px;
`;

const badgeInnerContainer = css`
    padding-left: 1rem;
`;

const badgeLabel = css`
    font-size: 1rem;
    font-weight: 500;
`;

const badgeLabelLight = css`
    color: #111827;
`;

const badgeLabelDark = css`
    color: #f9fafb;
`;

const badgeRatingContainer = css`
    display: flex;
    align-items: center;
    margin-top: 6px;
`;

const badgeRating = css`
    font-size: 16px;
    font-weight: 600;
    display: inline-block;
`;

const badgeRatingLight = css`
    color: #d97706;
`;

const badgeRatingDark = css`
    color: #f59e0b;
`;

const badgeStars = css`
    margin-left: 4px;
`;

const badgeStarsContainer = css`
    position: relative;
    font-size: 20px;
    line-height: 1;
    padding: 0;
    margin: 0;
`;

const badgeStarsFilled = css`
    display: flex;
    align-items: center;
    position: absolute;
    left: 0;
    top: 0;
    overflow: hidden;
    color: #f8af0d;
`;

const badgeStarsEmpty = css`
    display: flex;
    align-items: center;
    color: #d1d5db;
`;

const badgeLinkContainer = css`
    font-size: 12px;
    margin-top: 8px;
`;

const badgeLink = css`
    &:hover {
        text-decoration: underline;
    }
`;

const badgeLinkLight = css`
    color: #6b7280;
`;

const badgeLinkDark = css`
    color: #9ca3af;
`;

const badgeLinkInline = css`
    display: inline-block;
`;

export const Badge: FC<{
    averageRating: number;
    totalReviewCount: number;
    profileUrl?: string | null;
    theme?: Theme;
}> = ({
    averageRating,
    totalReviewCount,
    profileUrl,
    theme = "light",
}) => {
    const percentageFill = useMemo(() => {
        const pct = (averageRating / 5) * 100;
        return pct;
    }, [averageRating]);

    return (
        <div css={badge}>
            <div
                css={[
                    badgeContainer,
                    theme === "light"
                        ? badgeContainerLight
                        : badgeContainerDark,
                ]}
            >
                <GoogleIcon css={badgeGoogleIcon} />
                <div css={badgeInnerContainer}>
                    <span
                        css={[
                            badgeLabel,
                            theme === "light"
                                ? badgeLabelLight
                                : badgeLabelDark,
                        ]}
                    >
                        Google Rating
                    </span>
                    <div css={badgeRatingContainer}>
                        <span
                            css={[
                                badgeRating,
                                theme === "light"
                                    ? badgeRatingLight
                                    : badgeRatingDark,
                            ]}
                        >
                            {averageRating.toFixed(1)}
                        </span>
                        <div css={badgeStars} aria-hidden="true">
                            <div css={badgeStarsContainer}>
                                <div
                                    css={badgeStarsFilled}
                                    style={{
                                        width: `${percentageFill}%`,
                                    }}
                                >
                                    <span>★★★★★</span>
                                </div>
                                <div css={badgeStarsEmpty}>
                                    <span>★★★★★</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div css={badgeLinkContainer}>
                        {profileUrl ? (
                            <a
                                target="_blank"
                                rel="nofollow noopener noreferrer"
                                href={profileUrl}
                                css={[
                                    badgeLink,
                                    theme === "light"
                                        ? badgeLinkLight
                                        : badgeLinkDark,
                                ]}
                            >
                                Read our {totalReviewCount} reviews
                            </a>
                        ) : (
                            <span
                                css={[
                                    badgeLink,
                                    badgeLinkInline,
                                    theme === "light"
                                        ? badgeLinkLight
                                        : badgeLinkDark,
                                ]}
                            >
                                Read our {totalReviewCount} reviews
                            </span>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
