export type GoogleReview = {
    reviewId: string;
    reviewer: {
        profilePhotoUrl: string;
        displayName: string;
        isAnonymous: boolean;
    };
    starRating: number;
    comment: string;
    createTime: string;
    updateTime: string;
    reviewReply: {
        comment: string;
        updateTime: string;
    } | null;
};

export type NameDisplay =
    | "fullNames"
    | "firstAndLastInitials"
    | "firstNamesOnly";

export type LogoVariant = "icon" | "full" | "none";

export type DateDisplay = "relative" | "absolute" | "none";

export type ReviewVariant = "testimonial" | "card";

export type Theme = "light" | "dark";
