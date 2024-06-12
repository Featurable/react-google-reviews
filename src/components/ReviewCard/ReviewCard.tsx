import clsx from "clsx";
import React, { FC, useEffect, useMemo, useState } from "react";
import {
    DateDisplay,
    GoogleReview,
    LogoVariant,
    NameDisplay,
    ReviewVariant,
    Theme,
} from "../../types/review";
import { displayName } from "../../utils/displayName";
import { getRelativeDate } from "../../utils/getRelativeDate";
import { trim } from "../../utils/trim";
import { GoogleIcon } from "../Google/GoogleIcon";
import { GoogleLogo } from "../Google/GoogleLogo";
import { StarRating } from "../StarRating/StarRating";

export const ReviewCard: FC<{
    review: GoogleReview;
    maxCharacters: number;
    nameDisplay: NameDisplay;
    logoVariant: LogoVariant;
    dateDisplay: DateDisplay;
    reviewVariant: ReviewVariant;
    size?: "sm" | "md" | "lg" | "xl";
    theme?: Theme;
}> = ({
    review,
    maxCharacters,
    nameDisplay,
    logoVariant,
    dateDisplay,
    reviewVariant,
    size = "md",
    theme = "light",
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
            className={clsx(
                "reviewCard",
                size === "sm" && "reviewCard--sm",
                size === "md" && "reviewCard--md",
                size === "lg" && "reviewCard--lg",
                size === "xl" && "reviewCard--xl",
                theme === "light" && "reviewCard--light",
                theme === "dark" && "reviewCard--dark"
            )}
        >
            <div>
                {reviewVariant === "card" && (
                    <ReviewCardReviewer
                        review={review}
                        nameDisplay={nameDisplay}
                        dateDisplay={dateDisplay}
                        size={size}
                        theme={theme}
                    />
                )}

                {reviewVariant === "testimonial" && (
                    <div
                        className={clsx(
                            size === "lg" && "stars--lg",
                            size === "xl" && "stars--xl"
                        )}
                    >
                        <StarRating
                            rating={review.starRating}
                            size={size}
                        />
                    </div>
                )}

                <div
                    className={clsx(
                        reviewVariant === "card" &&
                            "reviewBody__container--card",
                        reviewVariant === "testimonial" &&
                            size === "sm" &&
                            "reviewBody__container--testimonial--sm",
                        reviewVariant === "testimonial" &&
                            size === "md" &&
                            "reviewBody__container--testimonial--md",
                        reviewVariant === "testimonial" &&
                            size === "lg" &&
                            "reviewBody__container--testimonial--lg",
                        reviewVariant === "testimonial" &&
                            size === "xl" &&
                            "reviewBody__container--testimonial--xl"
                    )}
                >
                    <p
                        className={clsx(
                            size === "sm" && "reviewBody--sm",
                            size === "md" && "reviewBody--md",
                            size === "lg" && "reviewBody--lg",
                            size === "xl" && "reviewBody--xl",
                            theme === "light" && "reviewBody--light",
                            theme === "dark" && "reviewBody--dark"
                        )}
                        data-review-comment
                        data-review-id={review.reviewId}
                    >
                        {comment}
                    </p>

                    {hasMore && (
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className={clsx(
                                "readMore",
                                size === "sm" && "readMore--sm",
                                size === "md" && "readMore--md",
                                size === "lg" && "readMore--lg",
                                size === "xl" && "readMore--xl",
                                theme === "light" &&
                                    "readMore--light",
                                theme === "dark" && "readMore--dark"
                            )}
                        >
                            Read {isOpen ? "less" : "more"}
                        </button>
                    )}
                </div>
            </div>

            <div
                className={clsx(
                    "footer",
                    size === "md" && "footer--md",
                    size === "lg" && "footer--lg",
                    size === "xl" && "footer--xl"
                )}
            >
                {reviewVariant === "card" && (
                    <StarRating
                        rating={review.starRating}
                        size={size}
                    />
                )}

                {reviewVariant === "testimonial" && (
                    <ReviewCardReviewer
                        review={review}
                        nameDisplay={nameDisplay}
                        dateDisplay={dateDisplay}
                        size={size}
                        theme={theme}
                    />
                )}

                {logoVariant === "full" && (
                    <GoogleLogo
                        className={clsx(
                            size === "sm" && "logo--sm",
                            size === "md" && "logo--md",
                            size === "lg" && "logo--lg",
                            size === "xl" && "logo--xl"
                        )}
                    />
                )}
                {logoVariant === "icon" && (
                    <GoogleIcon
                        className={clsx(
                            reviewVariant &&
                                size === "sm" &&
                                "icon--sm",
                            reviewVariant &&
                                size === "md" &&
                                "icon--md",
                            reviewVariant &&
                                size === "lg" &&
                                "icon--lg",
                            reviewVariant &&
                                size === "xl" &&
                                "icon--xl"
                        )}
                    />
                )}
            </div>
        </div>
    );
};

const ReviewCardReviewer: React.FC<{
    review: GoogleReview;
    nameDisplay: NameDisplay;
    dateDisplay: DateDisplay;
    size?: "sm" | "md" | "lg" | "xl";
    theme?: Theme;
}> = ({
    review,
    nameDisplay,
    dateDisplay,
    size,
    theme = "light",
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
        <div className="reviewer">
            <div
                className={clsx(
                    "reviewer__container",
                    size === "sm" && "reviewer__container--sm",
                    size === "md" && "reviewer__container--md",
                    size === "lg" && "reviewer__container--lg",
                    size === "xl" && "reviewer__container--xl"
                )}
            >
                <img
                    src={
                        review.reviewer.isAnonymous
                            ? ""
                            : review.reviewer.profilePhotoUrl
                    }
                    onError={(e) => {
                        setFallback(true);
                    }}
                    className={clsx(
                        "reviewer__img",
                        size === "sm" && "reviewer__img--sm",
                        size === "md" && "reviewer__img--md",
                        size === "lg" && "reviewer__img--lg",
                        size === "xl" && "reviewer__img--xl"
                    )}
                />

                {fallback && (
                    <div
                        className={clsx(
                            "fallback",
                            size === "sm" && "fallback--sm",
                            size === "md" && "fallback--md",
                            size === "lg" && "fallback--lg",
                            size === "xl" && "fallback--xl"
                        )}
                        style={{
                            backgroundColor: getFallbackBgColor(
                                review.reviewer.isAnonymous
                                    ? "a"
                                    : review.reviewer.displayName[0].toLowerCase()
                            ),
                        }}
                    >
                        {review.reviewer.isAnonymous
                            ? "A"
                            : review.reviewer.displayName[0]}
                    </div>
                )}
            </div>
            <div className="">
                <p
                    className={clsx(
                        "reviewer__name",
                        size === "sm" && "reviewer__name--sm",
                        size === "md" && "reviewer__name--md",
                        size === "lg" && "reviewer__name--lg",
                        size === "xl" && "reviewer__name--xl",
                        theme === "light" && "reviewer__name--light",
                        theme === "dark" && "reviewer__name--dark"
                    )}
                >
                    {review.reviewer.isAnonymous
                        ? "Anonymous"
                        : displayName(
                              review.reviewer.displayName,
                              nameDisplay
                          )}
                </p>

                {review.updateTime ||
                    (review.createTime && (
                        <p
                            className={clsx(
                                size === "sm" && "reviewer__date--sm",
                                size === "md" && "reviewer__date--md",
                                size === "lg" && "reviewer__date--lg",
                                size === "xl" && "reviewer__date--xl",
                                theme === "light" &&
                                    "reviewer__date--light",
                                theme === "dark" &&
                                    "reviewer__date--dark"
                            )}
                        >
                            {dateDisplay === "absolute"
                                ? new Date(
                                      review.updateTime ??
                                          review.createTime
                                  ).toLocaleDateString(undefined, {
                                      year: "numeric",
                                      month: "long",
                                      day: "numeric",
                                  })
                                : getRelativeDate(
                                      new Date(
                                          review.updateTime ??
                                              review.createTime
                                      )
                                  )}
                        </p>
                    ))}
            </div>
        </div>
    );
};
