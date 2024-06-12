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
// import * as styles from "../css/ReviewCard.module.css";
// import { displayName } from "../utils/displayName";
// import { getRelativeDate } from "../utils/getRelativeDate";
import { displayName } from "../../utils/displayName";
import { getRelativeDate } from "../../utils/getRelativeDate";
import { trim } from "../../utils/trim";
// import { GoogleIcon } from "./GoogleIcon";
// import { GoogleLogo } from "./GoogleLogo";
// import { StarRating } from "./StarRating";

export const ReviewCard: FC<{
    review: GoogleReview;
    maxCharacters: number;
    nameDisplay: NameDisplay;
    logoVariant: LogoVariant;
    dateDisplay: DateDisplay;
    reviewVariant: ReviewVariant;
    size?: "sm" | "md" | "lg" | "xl";
    theme?: Theme;
    commentOverride?: React.ReactNode;
    // highlights?: WidgetHighlight[];
}> = ({
    review,
    maxCharacters,
    nameDisplay,
    logoVariant,
    dateDisplay,
    reviewVariant,
    size = "md",
    theme = "light",
    commentOverride,
    // highlights = [],
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
            className={clsx()
            // @ts-ignore
            // size === "sm" && styles["reviewCardSm"],
            // // @ts-ignore
            // size === "md" && styles["reviewCardMd"],
            // // @ts-ignore
            // size === "lg" && styles["reviewCardLg"],
            // // @ts-ignore
            // size === "xl" && styles["reviewCardXl"],
            // // @ts-ignore
            // theme === "light" && styles["reviewCardLight"],
            // // @ts-ignore
            // theme === "dark" && styles["reviewCardDark"],
            // // @ts-ignore
            // styles["reviewCard"]
            }
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
                        className={clsx()
                        // @ts-ignore
                        // size === "lg" && styles["starsLg"],
                        // @ts-ignore
                        // size === "xl" && styles["starsXl"]
                        }
                    >
                        {/* <StarRating
                            rating={review.starRating}
                            size={size}
                        /> */}
                    </div>
                )}

                <div
                    className={clsx()
                    // reviewVariant === "card" &&
                    //     // @ts-ignore
                    //     styles["reviewBodyContainerCard"],
                    // reviewVariant === "testimonial" &&
                    //     size === "sm" &&
                    //     // @ts-ignore
                    //     styles[
                    //         "reviewBodyContainerTestimonialSm"
                    //     ],
                    // reviewVariant === "testimonial" &&
                    //     size === "md" &&
                    //     // @ts-ignore
                    //     styles[
                    //         "reviewBodyContainerTestimonialMd"
                    //     ],
                    // reviewVariant === "testimonial" &&
                    //     size === "lg" &&
                    //     // @ts-ignore
                    //     styles[
                    //         "reviewBodyContainerTestimonialLg"
                    //     ],
                    // reviewVariant === "testimonial" &&
                    //     size === "xl" &&
                    //     // @ts-ignore
                    //     styles["reviewBodyContainerTestimonialXl"]
                    }
                >
                    <p
                        className={clsx()
                        // // @ts-ignore
                        // size === "sm" && styles["reviewBodySm"],
                        // // @ts-ignore
                        // size === "md" && styles["reviewBodyMd"],
                        // // @ts-ignore
                        // size === "lg" && styles["reviewBodyLg"],
                        // // @ts-ignore
                        // size === "xl" && styles["reviewBodyXl"],
                        // theme === "light" &&
                        //     // @ts-ignore
                        //     styles["reviewBodyLight"],
                        // theme === "dark" &&
                        //     // @ts-ignore
                        //     styles["reviewBodyDark"]
                        }
                        data-review-comment
                        data-review-id={review.reviewId}
                    >
                        {comment}
                    </p>

                    {hasMore && (
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className={clsx()
                            // // @ts-ignore
                            // styles["readMore"],
                            // // @ts-ignore
                            // size === "sm" && styles["readMoreSm"],
                            // // @ts-ignore
                            // size === "md" && styles["readMoreMd"],
                            // // @ts-ignore
                            // size === "lg" && styles["readMoreLg"],
                            // // @ts-ignore
                            // size === "xl" && styles["readMoreXl"],
                            // // @ts-ignore
                            // theme === "light" &&
                            //     // @ts-ignore
                            //     styles["readMoreLight"],
                            // theme === "dark" &&
                            //     // @ts-ignore
                            //     styles["readMoreDark"]
                            }
                        >
                            Read {isOpen ? "less" : "more"}
                        </button>
                    )}
                </div>
            </div>

            <div
                className={clsx()
                // // @ts-ignore
                // styles["footer"],
                // // @ts-ignore
                // size === "md" && styles["footerMd"],
                // // @ts-ignore
                // size === "lg" && styles["footerLg"],
                // // @ts-ignore
                // size === "xl" && styles["footerXl"]
                }
            >
                {/* {reviewVariant === "card" && (
                    <StarRating
                        rating={review.starRating}
                        size={size}
                    />
                )} */}

                {reviewVariant === "testimonial" && (
                    <ReviewCardReviewer
                        review={review}
                        nameDisplay={nameDisplay}
                        dateDisplay={dateDisplay}
                        size={size}
                        theme={theme}
                    />
                )}

                {/* {logoVariant === "full" && (
                    <GoogleLogo
                        className={clsx(
                            // @ts-ignore
                            size === "sm" && styles["logoSm"],
                            // @ts-ignore
                            size === "md" && styles["logoMd"],
                            // @ts-ignore
                            size === "lg" && styles["logoLg"],
                            // @ts-ignore
                            size === "xl" && styles["logoXl"]
                        )}
                    />
                )} */}
                {/* {logoVariant === "icon" && (
                    <GoogleIcon
                        className={clsx(
                            reviewVariant &&
                                size === "sm" &&
                                // @ts-ignore
                                styles["iconSm"],
                            reviewVariant &&
                                size === "md" &&
                                // @ts-ignore
                                styles["iconMd"],
                            reviewVariant &&
                                size === "lg" &&
                                // @ts-ignore
                                styles["iconLg"],
                            reviewVariant &&
                                size === "xl" &&
                                // @ts-ignore
                                styles["iconXl"]
                        )}
                    />
                )} */}
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
        // @ts-ignore
        <div
        // className={styles["reviewer"]}
        >
            <div
                className={clsx()
                // // @ts-ignore
                // styles["reviewerContainer"],
                // // @ts-ignore
                // size === "sm" && styles["reviewerContainerSm"],
                // // @ts-ignore
                // size === "md" && styles["reviewerContainerMd"],
                // // @ts-ignore
                // size === "lg" && styles["reviewerContainerLg"],
                // // @ts-ignore
                // size === "xl" && styles["reviewerContainerXl"]
                }
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
                    className={clsx()
                    // // @ts-ignore
                    // styles["reviewerImg"],
                    // // @ts-ignore
                    // size === "sm" && styles["reviewerImgSm"],
                    // // @ts-ignore
                    // size === "md" && styles["reviewerImgMd"],
                    // // @ts-ignore
                    // size === "lg" && styles["reviewerImgLg"],
                    // // @ts-ignore
                    // size === "xl" && styles["reviewerImgXl"]
                    }
                />

                {fallback && (
                    <div
                        className={clsx()
                        // // @ts-ignore
                        // styles["fallback"],
                        // // @ts-ignore
                        // size === "sm" && styles["fallbackSm"],
                        // // @ts-ignore
                        // size === "md" && styles["fallbackMd"],
                        // // @ts-ignore
                        // size === "lg" && styles["fallbackLg"],
                        // // @ts-ignore
                        // size === "xl" && styles["fallbackXl"]
                        }
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
                    className={clsx()
                    // // @ts-ignore
                    // styles["reviewerName"],
                    // // @ts-ignore
                    // size === "sm" && styles["reviewerNameSm"],
                    // // @ts-ignore
                    // size === "md" && styles["reviewerNameMd"],
                    // // @ts-ignore
                    // size === "lg" && styles["reviewerNameLg"],
                    // // @ts-ignore
                    // size === "xl" && styles["reviewerNameXl"],
                    // // @ts-ignore
                    // // theme === "light" &&
                    // //     styles["reviewerNameLight"],
                    // // @ts-ignore
                    // theme === "dark" && styles["reviewerNameDark"]
                    }
                >
                    {review.reviewer.isAnonymous
                        ? "Anonymous"
                        : displayName(
                              review.reviewer.displayName,
                              nameDisplay
                          )}
                </p>
                {dateDisplay === "absolute" && (
                    <p
                        className={clsx()
                        // // @ts-ignore
                        // size === "sm" && styles["reviewerDateSm"],
                        // // @ts-ignore
                        // size === "md" && styles["reviewerDateMd"],
                        // // @ts-ignore
                        // size === "lg" && styles["reviewerDateLg"],
                        // // @ts-ignore
                        // size === "xl" && styles["reviewerDateXl"],
                        // // @ts-ignore
                        // theme === "light" &&
                        //     // @ts-ignore
                        //     styles["reviewerDateLight"],
                        // theme === "dark" &&
                        //     // @ts-ignore
                        //     styles["reviewerDateDark"]
                        }
                    >
                        {new Date(
                            review.updateTime
                        ).toLocaleDateString(undefined, {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                        })}
                    </p>
                )}
                {dateDisplay === "relative" && (
                    <p
                        className={clsx()
                        // // @ts-ignore
                        // size === "sm" && styles["reviewerDateSm"],
                        // // @ts-ignore
                        // size === "md" && styles["reviewerDateMd"],
                        // // @ts-ignore
                        // size === "lg" && styles["reviewerDateLg"],
                        // // @ts-ignore
                        // size === "xl" && styles["reviewerDateXl"],
                        // // @ts-ignore
                        // theme === "light" &&
                        //     // @ts-ignore
                        //     styles["reviewerDateLight"],
                        // theme === "dark" &&
                        //     // @ts-ignore
                        //     styles["reviewerDateDark"]
                        }
                    >
                        {getRelativeDate(new Date(review.updateTime))}
                    </p>
                )}
            </div>
        </div>
    );
};
