import { ReactGoogleReviews } from "./components";
import "./css/index.css";
import { dangerouslyFetchPlaceReviews } from "./lib/fetchPlaceReviews";
import { FeaturableAPIResponse, GoogleReview } from "./types/review";

export {
    FeaturableAPIResponse,
    GoogleReview as ReactGoogleReview,
    ReactGoogleReviews,
    dangerouslyFetchPlaceReviews,
};
