export type GoogleReview = {
    reviewId: string | null;
    reviewer: {
        profilePhotoUrl: string;
        displayName: string;
        isAnonymous: boolean;
    };
    starRating: number;
    comment: string;
    createTime: string | null;
    updateTime: string | null;
    reviewReply?: {
        comment: string;
        updateTime: string;
    } | null;
};

// Force type into value space to avoid type-only export incompatibility
export const GoogleReview = {};

export type NameDisplay =
    | "fullNames"
    | "firstAndLastInitials"
    | "firstNamesOnly";

export type LogoVariant = "icon" | "full" | "none";

export type DateDisplay = "relative" | "absolute" | "none";

export type ReviewVariant = "testimonial" | "card";

export type Theme = "light" | "dark";

interface FeaturableAPIResponseBase {
    success: boolean;
}

interface FeaturableAPIResponseSuccess
    extends FeaturableAPIResponseBase {
    success: true;
    profileUrl: string | null;
    batchSize: number;
    totalReviewCount: number;
    averageRating: number;
    reviews: GoogleReview[];
}

interface FeaturableAPIResponseError
    extends FeaturableAPIResponseBase {
    success: false;
}

export type FeaturableAPIResponse =
    | FeaturableAPIResponseSuccess
    | FeaturableAPIResponseError;

// Force type into value space to avoid type-only export incompatibility
export const FeaturableAPIResponse = {} as const;
