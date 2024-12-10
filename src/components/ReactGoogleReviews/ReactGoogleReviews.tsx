/** @jsxImportSource @emotion/react */

import { css } from "@emotion/react";
import React, { useCallback, useEffect, useState } from "react";
import "../../css/index.css";
import {
    BadgeCSSProps,
    CarouselCSSProps,
    ErrorStateCSSProps,
    LoadingStateCSSProps,
    ReviewCardCSSProps,
} from "../../types/cssProps";
import {
    DateDisplay,
    FeaturableAPIResponse,
    GoogleReview,
    LogoVariant,
    NameDisplay,
    ReviewVariant,
    Theme,
} from "../../types/review";
import { Badge } from "../Badge/Badge";
import { Carousel } from "../Carousel/Carousel";
import { ErrorState } from "../State/ErrorState";
import { LoadingState } from "../State/LoadingState";

type StructuredDataProps = {
    /**
     * Total number of reviews.
     * This is automatically fetched when passing `featurableId`.
     * Required if `structuredData` is true and passing `reviews`.
     */
    totalReviewCount?: number;

    /**
     * Average star rating from 1 to 5.
     * This is automatically fetched when passing `featurableId`.
     * Required if `structuredData` is true and passing `reviews`.
     */
    averageRating?: number;
};

type ReactGoogleReviewsBaseProps = {
    /**
     * Layout of the reviews.
     */
    layout: "carousel" | "badge" | "custom";

    /**
     * How to display the reviewer's name.
     * Default: "firstAndLastInitials"
     */
    nameDisplay?: NameDisplay;

    /**
     * How to display the Google logo
     * Default: "icon"
     */
    logoVariant?: LogoVariant;

    /**
     * When collapsed, the maximum number of characters to display in the review body.
     * Default: 200
     */
    maxCharacters?: number;

    /**
     * How to display the review date.
     * Default: "relative"
     */
    dateDisplay?: DateDisplay;

    /**
     * Review card layout variant.
     * Default: "card"
     */
    reviewVariant?: ReviewVariant;

    /**
     * Color scheme of the component.
     * Default: "light"
     */
    theme?: Theme;

    /**
     * Enable or disable structured data.
     * Default: false
     */
    structuredData?: boolean;

    /**
     * Brand name for structured data.
     * Default: current page title
     */
    brandName?: string;

    /**
     * Product/service name for structured data.
     * Default: current page title
     */
    productName?: string;

    /**
     * Short description of the product/service for structured data.
     * Default: empty
     */
    productDescription?: string;

    /**
     * Enable/disable accessibility features.
     */
    accessibility?: boolean;

    /**
     * Hide reviews without text
     * Default: false
     */
    hideEmptyReviews?: boolean;

    /**
     * Disables translation from Google to use original review text
     * Default: false
     */
    disableTranslation?: boolean;

    /**
     * Customize the error message when reviews fail to load.
     * Default: "Failed to load Google reviews. Please try again later."
     */
    errorMessage?: React.ReactNode;
} & StructuredDataProps;

type ReactGoogleReviewsWithPlaceIdBaseProps =
    ReactGoogleReviewsBaseProps & {
        /**
         * If using Google Places API, use `dangerouslyFetchPlaceDetails` to get reviews server-side and pass them to the client.
         * Note: the Places API limits the number of reviews to FIVE most recent reviews.
         */
        reviews: GoogleReview[];
        featurableId?: never;
    };

type ReactGoogleReviewsWithPlaceIdWithStructuredDataProps = {
    structuredData: true;
} & Required<StructuredDataProps>;

type ReactGoogleReviewsWithPlaceIdWithoutStructuredDataProps = {
    structuredData?: false;
};

type ReactGoogleReviewsWithPlaceIdProps =
    ReactGoogleReviewsWithPlaceIdBaseProps &
        (
            | ReactGoogleReviewsWithPlaceIdWithStructuredDataProps
            | ReactGoogleReviewsWithPlaceIdWithoutStructuredDataProps
        );

type ReactGoogleReviewsWithFeaturableIdProps =
    ReactGoogleReviewsBaseProps & {
        reviews?: never;
        /**
         * If using Featurable API, pass the ID of the widget after setting it up in the dashboard.
         * Using the free Featurable API allows for unlimited reviews.
         * https://featurable.com/app/widgets
         */
        featurableId: string;
    };

type ReactGoogleReviewsBasePropsWithRequired =
    ReactGoogleReviewsBaseProps &
        (
            | ReactGoogleReviewsWithPlaceIdProps
            | ReactGoogleReviewsWithFeaturableIdProps
        ) &
        ErrorStateCSSProps &
        LoadingStateCSSProps;

type ReactGoogleReviewsCarouselProps =
    ReactGoogleReviewsBasePropsWithRequired & {
        layout: "carousel";
        /**
         * Autoplay speed of the carousel in milliseconds.
         * Default: 3000
         */
        carouselSpeed?: number;

        /**
         * Whether to autoplay the carousel.
         * Default: true
         */
        carouselAutoplay?: boolean;

        /**
         * Maximum number of items to display at any one time.
         * Default: 3
         */
        maxItems?: number;
    } & CarouselCSSProps &
        ReviewCardCSSProps;

type ReactGoogleReviewsBadgeProps =
    ReactGoogleReviewsBasePropsWithRequired & {
        layout: "badge";

        /**
         * Google profile URL, if manually fetching Google Places API and passing `reviews`.
         * This is automatically fetched when passing `featurableId`.
         */
        profileUrl?: string;
    } & BadgeCSSProps;

type ReactGoogleReviewsCustomProps =
    ReactGoogleReviewsBasePropsWithRequired & {
        layout: "custom";
        renderer: (reviews: GoogleReview[]) => React.ReactNode;
    };

type ReactGoogleReviewsProps =
    | ReactGoogleReviewsCarouselProps
    | ReactGoogleReviewsCustomProps
    | ReactGoogleReviewsBadgeProps;

const parent = css`
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
        Helvetica, Arial, sans-serif, "Apple Color Emoji",
        "Segoe UI Emoji", "Segoe UI Symbol";
`;

const ReactGoogleReviews: React.FC<ReactGoogleReviewsProps> = ({
    ...props
}) => {
    if (
        props.totalReviewCount != null &&
        (props.totalReviewCount < 0 ||
            !Number.isInteger(props.totalReviewCount))
    ) {
        throw new Error(
            "totalReviewCount must be a positive integer"
        );
    }
    if (
        props.averageRating != null &&
        (props.averageRating < 1 || props.averageRating > 5)
    ) {
        throw new Error("averageRating must be between 1 and 5");
    }

    const mapReviews = useCallback(
        (review: GoogleReview): GoogleReview => {
            let comment = review.comment;
            if (props.disableTranslation) {
                if (review.comment.includes("(Original)")) {
                    const split = review.comment.split("(Original)");
                    if (split.length > 1) {
                        comment = split[1].trim();
                    }
                } else if (
                    review.comment.includes("(Translated by Google)")
                ) {
                    const split = review.comment.split(
                        "(Translated by Google)"
                    );
                    if (split.length > 1) {
                        comment = split[0].trim();
                    }
                }
            }
            return {
                ...review,
                comment,
            };
        },
        [props.disableTranslation]
    );

    const filterReviews = useCallback(
        (review: GoogleReview): boolean => {
            if (props.hideEmptyReviews) {
                return review.comment.trim().length !== 0;
            }
            return true;
        },
        [props.hideEmptyReviews]
    );

    const [reviews, setReviews] = useState<GoogleReview[]>(
        props.reviews?.filter(filterReviews).map(mapReviews) ?? []
    );
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [profileUrl, setProfileUrl] = useState<string | null>(
        props.layout === "badge" ? props.profileUrl ?? null : null
    );
    const [totalReviewCount, setTotalReviewCount] = useState<
        number | null
    >(props.totalReviewCount ?? null);
    const [averageRating, setAverageRating] = useState<number | null>(
        props.averageRating ?? null
    );

    useEffect(() => {
        if (props.featurableId) {
            fetch(
                `https://featurable.com/api/v1/widgets/${props.featurableId}`,
                {
                    method: "GET",
                }
            )
                .then((res) => res.json())
                .then((data: FeaturableAPIResponse) => {
                    if (!data.success) {
                        setError(true);
                        return;
                    }
                    setReviews(
                        data.reviews
                            .filter(filterReviews)
                            .map(mapReviews)
                    );
                    setProfileUrl(data.profileUrl);
                    setTotalReviewCount(data.totalReviewCount);
                    setAverageRating(data.averageRating);
                })
                .catch(() => {
                    setError(true);
                })
                .finally(() => setLoading(false));
        } else {
            setLoading(false);
        }
    }, [props.featurableId, filterReviews, mapReviews]);

    if (loading) {
        return (
            <LoadingState
                loaderClassName={props.loaderClassName}
                loaderStyle={props.loaderStyle}
                loaderSpinnerClassName={props.loaderSpinnerClassName}
                loaderSpinnerStyle={props.loaderSpinnerStyle}
                loaderLabelClassName={props.loaderLabelClassName}
                loaderLabelStyle={props.loaderLabelStyle}
            />
        );
    }

    if (
        error ||
        (props.layout === "badge" &&
            (averageRating === null || totalReviewCount === null))
    ) {
        return (
            <ErrorState
                errorMessage={props.errorMessage}
                errorClassName={props.errorClassName}
                errorStyle={props.errorStyle}
            />
        );
    }

    return (
        <div css={parent} className="">
            {props.structuredData &&
                averageRating !== null &&
                totalReviewCount !== null && (
                    <script type="application/ld+json">
                        {`{
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "${props.productName ?? document.title}",
    "url": "${document.location.href}",
    "brand": { "@type": "Brand", "name": "${
        props.brandName ?? document.title
    }" },
    "description": "${props.productDescription ?? ""}",
    "image": [],
    "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": ${averageRating},
        "reviewCount": ${totalReviewCount},
        "bestRating": 5,
        "worstRating": 1
    },
    "review": [${reviews
        .filter((r) => !!r.reviewer.isAnonymous)
        .filter(filterReviews)
        .map(mapReviews)
        .slice(0, 10)
        .map((review) => {
            return `{
            "@type": "Review",
            "reviewBody": "${review.comment}",
            "datePublished": "${review.createTime}",
            "author": { "@type": "Person", "name": "${review.reviewer.displayName}" },
            "reviewRating": { "@type": "Rating", "ratingValue": ${review.starRating} }
        }`;
        })}]
}
`}
                    </script>
                )}

            {props.layout === "carousel" && (
                <Carousel
                    reviews={reviews}
                    maxCharacters={props.maxCharacters}
                    nameDisplay={props.nameDisplay}
                    logoVariant={props.logoVariant}
                    dateDisplay={props.dateDisplay}
                    reviewVariant={props.reviewVariant}
                    carouselSpeed={props.carouselSpeed}
                    carouselAutoplay={props.carouselAutoplay}
                    maxItems={props.maxItems}
                    theme={props.theme}
                    accessibility={props.accessibility}
                    carouselClassName={props.carouselClassName}
                    carouselStyle={props.carouselStyle}
                    carouselBtnClassName={props.carouselBtnClassName}
                    carouselBtnStyle={props.carouselBtnStyle}
                    carouselBtnLeftClassName={
                        props.carouselBtnLeftClassName
                    }
                    carouselBtnLeftStyle={props.carouselBtnLeftStyle}
                    carouselBtnRightClassName={
                        props.carouselBtnRightClassName
                    }
                    carouselBtnRightStyle={
                        props.carouselBtnRightStyle
                    }
                    carouselBtnLightClassName={
                        props.carouselBtnLightClassName
                    }
                    carouselBtnLightStyle={
                        props.carouselBtnLightStyle
                    }
                    carouselBtnDarkClassName={
                        props.carouselBtnDarkClassName
                    }
                    carouselBtnDarkStyle={props.carouselBtnDarkStyle}
                    carouselBtnIconClassName={
                        props.carouselBtnIconClassName
                    }
                    carouselBtnIconStyle={props.carouselBtnIconStyle}
                    carouselCardClassName={
                        props.carouselCardClassName
                    }
                    carouselCardStyle={props.carouselCardStyle}
                    reviewCardClassName={props.reviewCardClassName}
                    reviewCardStyle={props.reviewCardStyle}
                    reviewCardLightClassName={
                        props.reviewCardLightClassName
                    }
                    reviewCardLightStyle={props.reviewCardLightStyle}
                    reviewCardDarkClassName={
                        props.reviewCardDarkClassName
                    }
                    reviewCardDarkStyle={props.reviewCardDarkStyle}
                    reviewBodyCardClassName={
                        props.reviewBodyCardClassName
                    }
                    reviewBodyCardStyle={props.reviewBodyCardStyle}
                    reviewBodyTestimonialClassName={
                        props.reviewBodyTestimonialClassName
                    }
                    reviewBodyTestimonialStyle={
                        props.reviewBodyTestimonialStyle
                    }
                    reviewTextClassName={props.reviewTextClassName}
                    reviewTextStyle={props.reviewTextStyle}
                    reviewTextLightClassName={
                        props.reviewTextLightClassName
                    }
                    reviewTextLightStyle={props.reviewTextLightStyle}
                    reviewTextDarkClassName={
                        props.reviewTextDarkClassName
                    }
                    reviewTextDarkStyle={props.reviewTextDarkStyle}
                    reviewReadMoreClassName={
                        props.reviewReadMoreClassName
                    }
                    reviewReadMoreStyle={props.reviewReadMoreStyle}
                    reviewReadMoreLightClassName={
                        props.reviewReadMoreLightClassName
                    }
                    reviewReadMoreLightStyle={
                        props.reviewReadMoreLightStyle
                    }
                    reviewReadMoreDarkClassName={
                        props.reviewReadMoreDarkClassName
                    }
                    reviewReadMoreDarkStyle={
                        props.reviewReadMoreDarkStyle
                    }
                    reviewFooterClassName={
                        props.reviewFooterClassName
                    }
                    reviewFooterStyle={props.reviewFooterStyle}
                    reviewerClassName={props.reviewerClassName}
                    reviewerStyle={props.reviewerStyle}
                    reviewerProfileClassName={
                        props.reviewerProfileClassName
                    }
                    reviewerProfileStyle={props.reviewerProfileStyle}
                    reviewerProfileImageClassName={
                        props.reviewerProfileImageClassName
                    }
                    reviewerProfileImageStyle={
                        props.reviewerProfileImageStyle
                    }
                    reviewerProfileFallbackClassName={
                        props.reviewerProfileFallbackClassName
                    }
                    reviewerProfileFallbackStyle={
                        props.reviewerProfileFallbackStyle
                    }
                    reviewerNameClassName={
                        props.reviewerNameClassName
                    }
                    reviewerNameStyle={props.reviewerNameStyle}
                    reviewerNameLightClassName={
                        props.reviewerNameLightClassName
                    }
                    reviewerNameLightStyle={
                        props.reviewerNameLightStyle
                    }
                    reviewerNameDarkClassName={
                        props.reviewerNameDarkClassName
                    }
                    reviewerNameDarkStyle={
                        props.reviewerNameDarkStyle
                    }
                    reviewerDateClassName={
                        props.reviewerDateClassName
                    }
                    reviewerDateStyle={props.reviewerDateStyle}
                    reviewerDateLightClassName={
                        props.reviewerDateLightClassName
                    }
                    reviewerDateLightStyle={
                        props.reviewerDateLightStyle
                    }
                    reviewerDateDarkClassName={
                        props.reviewerDateDarkClassName
                    }
                    reviewerDateDarkStyle={
                        props.reviewerDateDarkStyle
                    }
                />
            )}

            {props.layout === "badge" && (
                <Badge
                    averageRating={averageRating!}
                    totalReviewCount={totalReviewCount!}
                    profileUrl={profileUrl}
                    theme={props.theme}
                    badgeClassName={props.badgeClassName}
                    badgeStyle={props.badgeStyle}
                    badgeContainerClassName={
                        props.badgeContainerClassName
                    }
                    badgeContainerStyle={props.badgeContainerStyle}
                    badgeContainerLightClassName={
                        props.badgeContainerLightClassName
                    }
                    badgeContainerLightStyle={
                        props.badgeContainerLightStyle
                    }
                    badgeContainerDarkClassName={
                        props.badgeContainerDarkClassName
                    }
                    badgeContainerDarkStyle={
                        props.badgeContainerDarkStyle
                    }
                    badgeGoogleIconClassName={
                        props.badgeGoogleIconClassName
                    }
                    badgeGoogleIconStyle={props.badgeGoogleIconStyle}
                    badgeInnerContainerClassName={
                        props.badgeInnerContainerClassName
                    }
                    badgeInnerContainerStyle={
                        props.badgeInnerContainerStyle
                    }
                    badgeLabelClassName={props.badgeLabelClassName}
                    badgeLabelStyle={props.badgeLabelStyle}
                    badgeLabelLightClassName={
                        props.badgeLabelLightClassName
                    }
                    badgeLabelLightStyle={props.badgeLabelLightStyle}
                    badgeLabelDarkClassName={
                        props.badgeLabelDarkClassName
                    }
                    badgeLabelDarkStyle={props.badgeLabelDarkStyle}
                    badgeRatingContainerClassName={
                        props.badgeRatingContainerClassName
                    }
                    badgeRatingContainerStyle={
                        props.badgeRatingContainerStyle
                    }
                    badgeRatingClassName={props.badgeRatingClassName}
                    badgeRatingStyle={props.badgeRatingStyle}
                    badgeRatingLightClassName={
                        props.badgeRatingLightClassName
                    }
                    badgeRatingLightStyle={
                        props.badgeRatingLightStyle
                    }
                    badgeRatingDarkClassName={
                        props.badgeRatingDarkClassName
                    }
                    badgeRatingDarkStyle={props.badgeRatingDarkStyle}
                    badgeStarsClassName={props.badgeStarsClassName}
                    badgeStarsStyle={props.badgeStarsStyle}
                    badgeStarsContainerClassName={
                        props.badgeStarsContainerClassName
                    }
                    badgeStarsContainerStyle={
                        props.badgeStarsContainerStyle
                    }
                    badgeStarsFilledClassName={
                        props.badgeStarsFilledClassName
                    }
                    badgeStarsFilledStyle={
                        props.badgeStarsFilledStyle
                    }
                    badgeStarsEmptyClassName={
                        props.badgeStarsEmptyClassName
                    }
                    badgeStarsEmptyStyle={props.badgeStarsEmptyStyle}
                    badgeLinkContainerClassName={
                        props.badgeLinkContainerClassName
                    }
                    badgeLinkContainerStyle={
                        props.badgeLinkContainerStyle
                    }
                    badgeLinkClassName={props.badgeLinkClassName}
                    badgeLinkStyle={props.badgeLinkStyle}
                    badgeLinkLightClassName={
                        props.badgeLinkLightClassName
                    }
                    badgeLinkLightStyle={props.badgeLinkLightStyle}
                    badgeLinkDarkClassName={
                        props.badgeLinkDarkClassName
                    }
                    badgeLinkDarkStyle={props.badgeLinkDarkStyle}
                    badgeLinkInlineClassName={
                        props.badgeLinkInlineClassName
                    }
                    badgeLinkInlineStyle={props.badgeLinkInlineStyle}
                />
            )}

            {props.layout === "custom" && props.renderer(reviews)}
        </div>
    );
};

export default ReactGoogleReviews;
