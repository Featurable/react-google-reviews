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
import { Carousel } from "../Carousel/Carousel";

interface ReactGoogleReviewsBaseProps {
    /**
     * Layout of the reviews.
     */
    layout: "carousel" | "badge" | "custom";
    /**
     * How to display the reviewer's name.
     */
    nameDisplay?: NameDisplay;

    /**
     * How to display the Google logo
     */
    logoVariant?: LogoVariant;

    /**
     * When collapsed, the maximum number of characters to display in the review body.
     */
    maxCharacters?: number;

    /**
     * How to display the review date.
     */
    dateDisplay?: DateDisplay;

    /**
     * How to display the review.
     */
    reviewVariant?: ReviewVariant;

    /**
     * Theme of the carousel.
     */
    theme?: Theme;
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
         */
        carouselSpeed?: number;

        /**
         * Whether to autoplay the carousel.
         */
        carouselAutoplay?: boolean;

        /**
         * Maximum number of items to display at any one time.
         */
        maxItems?: number;
    };

type ReactGoogleReviewsBadgeProps =
    ReactGooglereviewsBasePropsWithRequired & {
        layout: "badge";
        /**
         * Google profile URL.
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

export const EXAMPLE_REVIEWS: GoogleReview[] = [
    {
        reviewId: "1",
        reviewer: {
            displayName: "Isabella Harris",
            profilePhotoUrl: "",
            isAnonymous: false,
        },
        comment:
            "I was hesitant to invest in this product at first, but I'm so glad I did. It has been a total game-changer for me and has made a significant positive impact on my work. It's worth every penny.",
        starRating: 5,
        createTime: new Date().toISOString(),
        updateTime: new Date().toISOString(),
    },
    {
        reviewId: "2",
        reviewer: {
            displayName: "Sophia Moore",
            profilePhotoUrl: "",
            isAnonymous: false,
        },
        comment:
            "I've tried similar products in the past, but none of them compare to this one. It's in a league of its own in terms of functionality, durability, and overall value. I can't recommend it highly enough!",
        starRating: 5,
        createTime: new Date().toISOString(),
        updateTime: new Date().toISOString(),
    },
    {
        reviewId: "3",
        reviewer: {
            displayName: "John Doe",
            profilePhotoUrl: "",
            isAnonymous: false,
        },
        comment:
            "This product is a game-changer! I've been using it for a few months now and it has consistently delivered excellent results. It's easy to use, well-designed, and built to last.",
        starRating: 5,
        createTime: new Date().toISOString(),
        updateTime: new Date().toISOString(),
    },
    {
        reviewId: "4",
        reviewer: {
            displayName: "Emily Davis",
            profilePhotoUrl: "",
            isAnonymous: false,
        },
        comment:
            "I've been using this product for a few weeks now and I'm blown away by how well it works. It's intuitive, easy to use, and has already saved me a ton of time. I can't imagine going back to the way I used to do things before I had this product. I've been using it for a few months now and it has consistently delivered excellent results. It's easy to use, well-designed, and built to last.",
        starRating: 5,
        createTime: new Date().toISOString(),
        updateTime: new Date().toISOString(),
    },
    {
        reviewId: "5",
        reviewer: {
            displayName: "David Wilson",
            profilePhotoUrl: "",
            isAnonymous: false,
        },
        comment:
            "I was skeptical at first, but after using this product for a while, I'm a believer. It's well-designed, durable, and does exactly what it's supposed to do. I couldn't be happier with my purchase.",
        starRating: 5,
        createTime: new Date().toISOString(),
        updateTime: new Date().toISOString(),
    },
    {
        reviewId: "6",
        reviewer: {
            displayName: "Jessica Brown",
            profilePhotoUrl: "",
            isAnonymous: false,
        },
        comment:
            "I love this product! It has exceeded my expectations in every way. Setup was a breeze and it works flawlessly. I've already recommended it to several friends and family members.",
        starRating: 5,
        createTime: new Date().toISOString(),
        updateTime: new Date().toISOString(),
    },
];

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
                .catch((err) => setError(true))
                .finally(() => setLoading(false));
        } else {
            setLoading(false);
        }
    }, [props.featurableId]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error loading reviews</div>;
    }

    return (
        <div className="">
            <div>
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
                    />
                )}

                {props.layout === "badge" && null}

                {props.layout === "custom" &&
                    props.renderer(EXAMPLE_REVIEWS)}
            </div>
        </div>
    );
};

export default ReactGoogleReviews;
