import React, { useEffect, useState } from "react";
import "../../css/index.css";
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

interface ReactGoogleReviewsBaseProps {
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
}

interface ReactGoogleReviewsWithPlaceIdProps
    extends ReactGoogleReviewsBaseProps {
    /**
     * If using Google Places API, use `dangerouslyFetchPlaceDetails` to get reviews server-side and pass them to the client.
     * Note: the Places API limits the number of reviews to FIVE most recent reviews.
     */
    reviews: GoogleReview[];
    featurableId?: never;
}

interface ReactGoogleReviewsWithFeaturableIdProps
    extends ReactGoogleReviewsBaseProps {
    reviews?: never;
    /**
     * If using Featurable API, pass the ID of the widget after setting it up in the dashboard.
     * Using the free Featurable API allows for unlimited reviews.
     * https://featurable.com/app/widgets
     */
    featurableId: string;
}

type ReactGooglereviewsBasePropsWithRequired =
    ReactGoogleReviewsBaseProps &
        (
            | ReactGoogleReviewsWithPlaceIdProps
            | ReactGoogleReviewsWithFeaturableIdProps
        );

type ReactGoogleReviewsCarouselProps =
    ReactGooglereviewsBasePropsWithRequired & {
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
    };

type ReactGoogleReviewsBadgeProps =
    ReactGooglereviewsBasePropsWithRequired & {
        layout: "badge";

        /**
         * Google profile URL, if manually fetching Google Places API.
         * This is automatically fetched when using the Featurable API.
         */
        profileUrl?: string;
    };

type ReactGoogleReviewsCustomProps =
    ReactGooglereviewsBasePropsWithRequired & {
        layout: "custom";
        renderer: (reviews: GoogleReview[]) => React.ReactNode;
    };

type ReactGoogleReviewsProps =
    | ReactGoogleReviewsCarouselProps
    | ReactGoogleReviewsCustomProps
    | ReactGoogleReviewsBadgeProps;

const ReactGoogleReviews: React.FC<ReactGoogleReviewsProps> = ({
    ...props
}) => {
    const [reviews, setReviews] = useState<GoogleReview[]>(
        props.reviews ?? []
    );
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [profileUrl, setProfileUrl] = useState<string | null>(null);
    const [totalReviewCount, setTotalReviewCount] = useState<
        number | null
    >(null);
    const [averageRating, setAverageRating] = useState<number | null>(
        null
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
                    setReviews(data.reviews);
                    setProfileUrl(data.profileUrl);
                    setTotalReviewCount(data.totalReviewCount);
                    setAverageRating(data.averageRating);
                })
                .catch((err) => {
                    console.error(err);
                    setError(true);
                })
                .finally(() => setLoading(false));
        } else {
            setLoading(false);
        }
    }, [props.featurableId]);

    if (loading) {
        return (
            <div className="loading">
                <svg
                    role={"status"}
                    aria-hidden="true"
                    className="loading__spinner"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="currentColor"
                    />
                    <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentFill"
                    />
                </svg>
                <p className={"loading__text"}>Loading reviews...</p>
            </div>
        );
    }

    if (
        error ||
        (props.layout === "badge" &&
            (averageRating === null || totalReviewCount === null))
    ) {
        return (
            <div className="error">
                Something went wrong loading reviews.
            </div>
        );
    }

    return (
        <div className="">
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
                />
            )}

            {props.layout === "badge" && (
                <Badge
                    averageRating={averageRating!}
                    totalReviewCount={totalReviewCount!}
                    profileUrl={profileUrl}
                    theme={props.theme}
                />
            )}

            {props.layout === "custom" && props.renderer(reviews)}
        </div>
    );
};

export default ReactGoogleReviews;
