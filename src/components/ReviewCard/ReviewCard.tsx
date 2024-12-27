/** @jsxImportSource @emotion/react */

import { css } from "@emotion/react";
import clsx from "clsx";
import React, { FC, useEffect, useMemo, useState } from "react";
import { ReviewCardCSSProps } from "../../types/cssProps";
import {
    DateDisplay,
    GoogleReview,
    LogoVariant,
    NameDisplay,
    ReviewVariant,
    Theme,
} from "../../types/review";
import { displayName } from "../../utils/displayName";
import { getRelativeDate as defaultGetRelativeDate } from "../../utils/getRelativeDate";
import { trim } from "../../utils/trim";
import { GoogleIcon } from "../Google/GoogleIcon";
import { GoogleLogo } from "../Google/GoogleLogo";
import { StarRating } from "../StarRating/StarRating";

const reviewCard = css`
    max-width: 65ch;
    margin: 0 auto;
    height: 100%;
    width: 100%;
    box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1),
        0 1px 2px -1px rgb(0 0 0 / 0.1);
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    transition: all;
    padding: 12px;
    box-sizing: border-box;
`;

const reviewCardLight = css`
    background: white;
    border: 1px solid #e5e7eb;
`;

const reviewCardDark = css`
    background: #111827;
    border: 1px solid #374151;
`;

const reviewBodyCard = css`
    margin-top: 16px;
`;

const reviewBodyTestimonial = css`
    margin-top: 20px;
`;

const reviewText = css`
    line-height: 1.5;
    margin: 0;
    font-size: 16px;
`;

const reviewTextLight = css`
    color: #030712;
`;
const reviewTextDark = css`
    color: white;
`;

const readMore = css`
    margin-top: 4px;
    display: inline-block;
    text-decoration: none;
    border: none;
    background: none;
    outline: none;
    font-size: 16px;
    cursor: pointer;

    &:hover {
        text-decoration: underline;
    }
`;

const readMoreLight = css`
    color: #6b7280;
`;

const readMoreDark = css`
    color: #9ca3af;
`;

const footer = css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 16px;
`;

type ReviewCardProps = {
    review: GoogleReview;
    maxCharacters?: number;
    nameDisplay?: NameDisplay;
    logoVariant?: LogoVariant;
    dateDisplay?: DateDisplay;
    reviewVariant?: ReviewVariant;
    theme?: Theme;
    readMoreLabel?: string;
    readLessLabel?: string;
    getAbsoluteDate?: (date: Date) => string;
    getRelativeDate?: (date: Date) => string;
};

export const ReviewCard: FC<ReviewCardProps & ReviewCardCSSProps> = ({
    review,
    maxCharacters = 200,
    nameDisplay = "firstAndLastInitials",
    logoVariant = "icon",
    dateDisplay = "relative",
    reviewVariant = "card",
    theme = "light",
    readMoreLabel = "Read more",
    readLessLabel = "Read less",
    getAbsoluteDate,
    getRelativeDate,
    reviewCardClassName,
    reviewCardStyle,
    reviewCardLightClassName,
    reviewCardLightStyle,
    reviewCardDarkClassName,
    reviewCardDarkStyle,
    reviewBodyCardClassName,
    reviewBodyCardStyle,
    reviewBodyTestimonialClassName,
    reviewBodyTestimonialStyle,
    reviewTextClassName,
    reviewTextStyle,
    reviewTextLightClassName,
    reviewTextLightStyle,
    reviewTextDarkClassName,
    reviewTextDarkStyle,
    reviewReadMoreClassName,
    reviewReadMoreStyle,
    reviewReadMoreLightClassName,
    reviewReadMoreLightStyle,
    reviewReadMoreDarkClassName,
    reviewReadMoreDarkStyle,
    reviewFooterClassName,
    reviewFooterStyle,
    reviewerClassName,
    reviewerStyle,
    reviewerProfileClassName,
    reviewerProfileStyle,
    reviewerProfileImageClassName,
    reviewerProfileImageStyle,
    reviewerProfileFallbackClassName,
    reviewerProfileFallbackStyle,
    reviewerNameClassName,
    reviewerNameStyle,
    reviewerNameLightClassName,
    reviewerNameLightStyle,
    reviewerNameDarkClassName,
    reviewerNameDarkStyle,
    reviewerDateClassName,
    reviewerDateStyle,
    reviewerDateLightClassName,
    reviewerDateLightStyle,
    reviewerDateDarkClassName,
    reviewerDateDarkStyle,
}) => {
    const [isOpen, setIsOpen] = useState(false);

    const hasMore = useMemo(() => {
        return review.comment.length > maxCharacters;
    }, [review.comment, maxCharacters]);

    const comment = useMemo(() => {
        if (isOpen) {
            return review.comment;
        } else {
            return trim(review.comment, maxCharacters);
        }
    }, [isOpen, review.comment, maxCharacters, hasMore]);

    return (
        <div
            css={[
                reviewCard,
                theme === "light" && reviewCardLight,
                theme === "dark" && reviewCardDark,
            ]}
            className={clsx(
                reviewCardClassName,
                theme === "light" && reviewCardLightClassName,
                theme === "dark" && reviewCardDarkClassName
            )}
            style={{
                ...reviewCardStyle,
                ...(theme === "light" && reviewCardLightStyle),
                ...(theme === "dark" && reviewCardDarkStyle),
            }}
        >
            <div>
                {reviewVariant === "card" && (
                    <ReviewCardReviewer
                        review={review}
                        nameDisplay={nameDisplay}
                        dateDisplay={dateDisplay}
                        theme={theme}
                        reviewerClassName={reviewerClassName}
                        reviewerStyle={reviewerStyle}
                        reviewerProfileClassName={
                            reviewerProfileClassName
                        }
                        reviewerProfileStyle={reviewerProfileStyle}
                        reviewerProfileImageClassName={
                            reviewerProfileImageClassName
                        }
                        reviewerProfileImageStyle={
                            reviewerProfileImageStyle
                        }
                        reviewerProfileFallbackClassName={
                            reviewerProfileFallbackClassName
                        }
                        reviewerProfileFallbackStyle={
                            reviewerProfileFallbackStyle
                        }
                        reviewerNameClassName={reviewerNameClassName}
                        reviewerNameStyle={reviewerNameStyle}
                        reviewerNameLightClassName={
                            reviewerNameLightClassName
                        }
                        reviewerNameLightStyle={
                            reviewerNameLightStyle
                        }
                        reviewerNameDarkClassName={
                            reviewerNameDarkClassName
                        }
                        reviewerNameDarkStyle={reviewerNameDarkStyle}
                        reviewerDateClassName={reviewerDateClassName}
                        reviewerDateStyle={reviewerDateStyle}
                        reviewerDateLightClassName={
                            reviewerDateLightClassName
                        }
                        reviewerDateLightStyle={
                            reviewerDateLightStyle
                        }
                        reviewerDateDarkClassName={
                            reviewerDateDarkClassName
                        }
                        reviewerDateDarkStyle={reviewerDateDarkStyle}
                    />
                )}

                {reviewVariant === "testimonial" && (
                    <StarRating rating={review.starRating} />
                )}

                <div
                    css={[
                        reviewBodyCard,
                        reviewVariant === "testimonial" &&
                            reviewBodyTestimonial,
                    ]}
                    className={clsx(
                        reviewBodyCardClassName,
                        reviewVariant === "testimonial" &&
                            reviewBodyTestimonialClassName
                    )}
                    style={{
                        ...reviewBodyCardStyle,
                        ...(reviewVariant === "testimonial" &&
                            reviewBodyTestimonialStyle),
                    }}
                >
                    <p
                        css={[
                            reviewText,
                            theme === "light" && reviewTextLight,
                            theme === "dark" && reviewTextDark,
                        ]}
                        className={clsx(
                            reviewTextClassName,
                            theme === "light" &&
                                reviewTextLightClassName,
                            theme === "dark" &&
                                reviewTextDarkClassName
                        )}
                        style={{
                            ...reviewTextStyle,
                            ...(theme === "light" &&
                                reviewTextLightStyle),
                            ...(theme === "dark" &&
                                reviewTextDarkStyle),
                        }}
                        data-review-comment
                        data-review-id={review.reviewId}
                    >
                        {comment}
                    </p>

                    {hasMore && (
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            css={[
                                readMore,
                                theme === "light" && readMoreLight,
                                theme === "dark" && readMoreDark,
                            ]}
                            className={clsx(
                                reviewReadMoreClassName,
                                theme === "light" &&
                                    reviewReadMoreLightClassName,
                                theme === "dark" &&
                                    reviewReadMoreDarkClassName
                            )}
                            style={{
                                ...reviewReadMoreStyle,
                                ...(theme === "light"
                                    ? reviewReadMoreLightStyle
                                    : reviewReadMoreDarkStyle),
                            }}
                        >
                            {isOpen ? readLessLabel : readMoreLabel}
                        </button>
                    )}
                </div>
            </div>

            <div
                css={footer}
                className={reviewFooterClassName}
                style={reviewFooterStyle}
            >
                {reviewVariant === "card" && (
                    <StarRating rating={review.starRating} />
                )}

                {reviewVariant === "testimonial" && (
                    <ReviewCardReviewer
                        review={review}
                        nameDisplay={nameDisplay}
                        dateDisplay={dateDisplay}
                        theme={theme}
                        reviewerClassName={reviewerClassName}
                        reviewerStyle={reviewerStyle}
                        reviewerProfileClassName={
                            reviewerProfileClassName
                        }
                        reviewerProfileStyle={reviewerProfileStyle}
                        reviewerProfileImageClassName={
                            reviewerProfileImageClassName
                        }
                        reviewerProfileImageStyle={
                            reviewerProfileImageStyle
                        }
                        reviewerProfileFallbackClassName={
                            reviewerProfileFallbackClassName
                        }
                        reviewerProfileFallbackStyle={
                            reviewerProfileFallbackStyle
                        }
                        reviewerNameClassName={reviewerNameClassName}
                        reviewerNameStyle={reviewerNameStyle}
                        reviewerNameLightClassName={
                            reviewerNameLightClassName
                        }
                        reviewerNameLightStyle={
                            reviewerNameLightStyle
                        }
                        reviewerNameDarkClassName={
                            reviewerNameDarkClassName
                        }
                        reviewerNameDarkStyle={reviewerNameDarkStyle}
                        reviewerDateClassName={reviewerDateClassName}
                        reviewerDateStyle={reviewerDateStyle}
                        reviewerDateLightClassName={
                            reviewerDateLightClassName
                        }
                        reviewerDateLightStyle={
                            reviewerDateLightStyle
                        }
                        reviewerDateDarkClassName={
                            reviewerDateDarkClassName
                        }
                        reviewerDateDarkStyle={reviewerDateDarkStyle}
                    />
                )}

                {logoVariant === "full" && <GoogleLogo />}
                {logoVariant === "icon" && <GoogleIcon />}
            </div>
        </div>
    );
};

const reviewer = css`
    display: flex;
    align-items: center;
`;

const reviewerProfile = css`
    position: relative;
    border-radius: 100%;
    width: 40px;
    height: 40px;
    margin-right: 12px;
`;

const reviewerProfileImage = css`
    border-radius: 100%;
    width: 100%;
    height: 100%;
`;

const reviewerProfileFallback = css`
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 500;
    color: white;
    border-radius: 100%;
    font-size: 20px;
`;

const reviewerName = css`
    font-weight: 600;
    font-size: 16px;
    margin: 0;
`;

const reviewerNameLight = css`
    color: #030712;
`;

const reviewerNameDark = css`
    color: #ffffff;
`;

const reviewerDate = css`
    font-size: 16px;
    margin: 0;
`;
const reviewerDateLight = css`
    color: #6b7280;
`;
const reviewerDateDark = css`
    color: #9ca3af;
`;

type ReviewCardReviewerProps = {
    review: GoogleReview;
    nameDisplay: NameDisplay;
    dateDisplay: DateDisplay;
    theme?: Theme;
    getAbsoluteDate?: (date: Date) => string;
    getRelativeDate?: (date: Date) => string;
};

const ReviewCardReviewer: React.FC<
    ReviewCardReviewerProps & ReviewCardCSSProps
> = ({
    review,
    nameDisplay,
    dateDisplay,
    theme = "light",
    getAbsoluteDate = (date) =>
        date.toLocaleDateString(undefined, {
            year: "numeric",
            month: "long",
            day: "numeric",
        }),
    getRelativeDate = defaultGetRelativeDate,

    reviewerClassName,
    reviewerStyle,
    reviewerProfileClassName,
    reviewerProfileStyle,
    reviewerProfileImageClassName,
    reviewerProfileImageStyle,
    reviewerProfileFallbackClassName,
    reviewerProfileFallbackStyle,
    reviewerNameClassName,
    reviewerNameStyle,
    reviewerNameLightClassName,
    reviewerNameLightStyle,
    reviewerNameDarkClassName,
    reviewerNameDarkStyle,
    reviewerDateClassName,
    reviewerDateStyle,
    reviewerDateLightClassName,
    reviewerDateLightStyle,
    reviewerDateDarkClassName,
    reviewerDateDarkStyle,
}) => {
    const [fallback, setFallback] = useState(false);

    useEffect(() => {
        if (review.reviewer.isAnonymous) {
            setFallback(true);
        } else if (!review.reviewer.profilePhotoUrl) {
            setFallback(true);
        }
    }, [review.reviewer]);

    const getFallbackBgColor = (char: string): string => {
        switch (char) {
            case "a":
                return "#660091";
            case "b":
                return "#4B53B2";
            case "c":
                return "#B1004A";
            case "d":
                return "#972BB0";
            case "e":
                return "#0F72C8";
            case "f":
                return "#094389";
            case "g":
                return "#118797";
            case "h":
                return "#0F7868";
            case "i":
                return "#073D30";
            case "j":
                return "#57922C";
            case "k":
                return "#E42567";
            case "l":
                return "#364852";
            case "m":
                return "#295817";
            case "n":
                return "#795B50";
            case "o":
                return "#4A322B";
            case "p":
                return "#693EB4";
            case "q":
                return "#3E1796";
            case "r":
                return "#E95605";
            case "s":
                return "#F03918";
            case "t":
                return "#AE230D";
            case "u":
            case "v":
                return "#647F8C";
            case "w":
            case "x":
            case "y":
            case "z":
            default:
                return "#6b7280";
        }
    };

    return (
        <div
            css={reviewer}
            className={reviewerClassName}
            style={reviewerStyle}
        >
            <div
                css={reviewerProfile}
                className={reviewerProfileClassName}
                style={reviewerProfileStyle}
            >
                {!review.reviewer.isAnonymous &&
                    review.reviewer.profilePhotoUrl && (
                        <img
                            src={review.reviewer.profilePhotoUrl}
                            onError={() => {
                                setFallback(true);
                            }}
                            css={reviewerProfileImage}
                            className={reviewerProfileImageClassName}
                            style={reviewerProfileImageStyle}
                        />
                    )}

                {fallback && (
                    <div
                        css={reviewerProfileFallback}
                        className={reviewerProfileFallbackClassName}
                        style={{
                            backgroundColor: getFallbackBgColor(
                                review.reviewer.isAnonymous
                                    ? "a"
                                    : review.reviewer.displayName[0].toLowerCase()
                            ),
                            ...reviewerProfileFallbackStyle,
                        }}
                    >
                        {review.reviewer.isAnonymous
                            ? "A"
                            : review.reviewer.displayName[0].toUpperCase()}
                    </div>
                )}
            </div>
            <div className="">
                <p
                    css={[
                        reviewerName,
                        theme === "light" && reviewerNameLight,
                        theme === "dark" && reviewerNameDark,
                    ]}
                    className={clsx(
                        reviewerNameClassName,
                        theme === "light" &&
                            reviewerNameLightClassName,
                        theme === "dark" && reviewerNameDarkClassName
                    )}
                    style={{
                        ...reviewerNameStyle,
                        ...(theme === "light" &&
                            reviewerNameLightStyle),
                        ...(theme === "dark" &&
                            reviewerNameDarkStyle),
                    }}
                >
                    {review.reviewer.isAnonymous
                        ? "Anonymous"
                        : displayName(
                              review.reviewer.displayName,
                              nameDisplay
                          )}
                </p>

                {(review.updateTime || review.createTime) && (
                    <p
                        css={[
                            reviewerDate,
                            theme === "light" && reviewerDateLight,
                            theme === "dark" && reviewerDateDark,
                        ]}
                        className={clsx(
                            reviewerDateClassName,
                            theme === "light" &&
                                reviewerDateLightClassName,
                            theme === "dark" &&
                                reviewerDateDarkClassName
                        )}
                        style={{
                            ...reviewerDateStyle,
                            ...(theme === "light" &&
                                reviewerDateLightStyle),
                            ...(theme === "dark" &&
                                reviewerDateDarkStyle),
                        }}
                    >
                        {dateDisplay === "absolute"
                            ? getAbsoluteDate(
                                  new Date(
                                      review.updateTime ??
                                          review.createTime ??
                                          ""
                                  )
                              )
                            : getRelativeDate(
                                  new Date(
                                      review.updateTime ??
                                          review.createTime ??
                                          ""
                                  )
                              )}
                    </p>
                )}
            </div>
        </div>
    );
};
