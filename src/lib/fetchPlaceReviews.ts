import { GoogleReview } from "../types/review";

class FetchPlaceReviewsError extends Error {
    constructor(message: string, public code?: string) {
        super(message);
        this.name = "FetchPlaceReviewsError";
    }
}

interface FetchPlaceReviewsBaseResponse {
    success: boolean;
}

interface FetchPlaceReviewsSuccessResponse
    extends FetchPlaceReviewsBaseResponse {
    success: true;
    reviews: GoogleReview[];
}

interface FetchPlaceReviewsErrorResponse
    extends FetchPlaceReviewsBaseResponse {
    success: false;
    error: FetchPlaceReviewsError;
}

type FetchPlaceReviewsResponse =
    | FetchPlaceReviewsSuccessResponse
    | FetchPlaceReviewsErrorResponse;

/**
 * IMPORTANT: ONLY CALL THIS FUNCTION SERVER-SIDE TO AVOID EXPOSING YOUR API KEY TO THE CLIENT
 *
 * This function will fetch the reviews of a place using the Google Places API
 * and return them as an array of GoogleReview objects to pass to `ReactGoogleReviews` component.
 *
 * Create a Google API key and enable the Places API in the [Google Cloud Console](https://console.cloud.google.com).
 * You can find your Place ID using the [Place ID Finder Tool](https://developers.google.com/maps/documentation/javascript/examples/places-placeid-finder).
 * For businesses without a physical address, see our [docs](https://featurable.com/docs/google-reviews/faq#how-to-get-google-reviews-for-a-business-without-a-physical-address).
 */
export const dangerouslyFetchPlaceReviews = async (
    placeId: string,
    apiKey: string
): Promise<FetchPlaceReviewsResponse> => {
    if (typeof window !== "undefined") {
        console.warn(
            "dangerouslyFetchPlaceReviews should only be called server-side to avoid exposing your API key."
        );
        return {
            success: false,
            error: new FetchPlaceReviewsError(
                "dangerouslyFetchPlaceReviews should only be called server-side to avoid exposing your API key."
            ),
        };
    }

    const baseUrl = `https://maps.googleapis.com/maps/api/place/details/json`;
    const params = {
        place_id: placeId,
        fields: "reviews",
        key: apiKey,
    } as Record<string, string>;
    const queryString = Object.keys(params)
        .map(
            (key) =>
                `${encodeURIComponent(key)}=${encodeURIComponent(
                    params[key]
                )}`
        )
        .join("&");
    const url = `${baseUrl}?${queryString}`;

    try {
        const res = await fetch(url, {
            method: "GET",
        });

        if (!res.ok) {
            const errorResponse = await res.json();
            throw new FetchPlaceReviewsError(
                errorResponse.error_message ||
                    "Unknown error occurred",
                errorResponse.status
            );
        }

        const data = await res.json();

        if (data.status !== "OK") {
            throw new FetchPlaceReviewsError(
                data.error_message || "Unknown error occurred",
                data.status
            );
        }

        const reviews: GoogleReview[] = (
            data.result.reviews || []
        ).map((rawReview: any) => {
            const review: GoogleReview = {
                reviewId: rawReview.review_id || null,
                reviewer: {
                    isAnonymous: !rawReview.author_name,
                    displayName: rawReview.author_name || "Anonymous",
                    profilePhotoUrl:
                        rawReview.profile_photo_url || "",
                },
                starRating: rawReview.rating || 0,
                createTime: rawReview.time
                    ? new Date(rawReview.time * 1000).toISOString()
                    : null,
                updateTime: rawReview.time
                    ? new Date(rawReview.time * 1000).toISOString()
                    : null,
                comment: rawReview.text || "",
            };

            return review;
        });

        return {
            success: true,
            reviews,
        };
    } catch (err) {
        if (err instanceof FetchPlaceReviewsError) {
            console.error(
                `Error fetching place reviews: ${err.message} (status: ${err.code})`
            );
            return {
                success: false,
                error: err,
            };
        } else {
            console.error(`Unexpected error occurred:`, err);
            return {
                success: false,
                error: new FetchPlaceReviewsError(
                    "Unexpected error occurred",
                    "UNKNOWN"
                ),
            };
        }
    }
};
