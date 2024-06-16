import clsx from "clsx";
import React, { FC, useMemo } from "react";
import { Theme } from "../../types/review";

export const Badge: FC<{
    averageRating: number;
    totalReviewCount: number;
    profileUrl?: string | null;
    theme?: Theme;
}> = ({
    averageRating,
    totalReviewCount,
    profileUrl,
    theme = "light",
}) => {
    const percentageFill = useMemo(() => {
        const pct = (averageRating / 5) * 100;
        return pct;
    }, [averageRating]);

    return (
        <div className="badge">
            <div
                className={clsx(
                    "badge__container",
                    theme === "light"
                        ? "badge__container--light"
                        : "badge__container--dark"
                )}
            >
                <div>
                    <svg
                        viewBox="0 0 512 512"
                        width="44"
                        height="44"
                        aria-label="Google logo"
                    >
                        <g
                            id="logo-g"
                            height="44"
                            width="44"
                            fill="none"
                            fillRule="evenodd"
                            className="h-8 w-8"
                        >
                            <path
                                d="M482.56 261.36c0-16.73-1.5-32.83-4.29-48.27H256v91.29h127.01c-5.47 29.5-22.1 54.49-47.09 71.23v59.21h76.27c44.63-41.09 70.37-101.59 70.37-173.46z"
                                fill="#4285f4"
                            ></path>
                            <path
                                d="M256 492c63.72 0 117.14-21.13 156.19-57.18l-76.27-59.21c-21.13 14.16-48.17 22.53-79.92 22.53-61.47 0-113.49-41.51-132.05-97.3H45.1v61.15c38.83 77.13 118.64 130.01 210.9 130.01z"
                                fill="#34a853"
                            ></path>
                            <path
                                d="M123.95 300.84c-4.72-14.16-7.4-29.29-7.4-44.84s2.68-30.68 7.4-44.84V150.01H45.1C29.12 181.87 20 217.92 20 256c0 38.08 9.12 74.13 25.1 105.99l78.85-61.15z"
                                fill="#fbbc05"
                            ></path>
                            <path
                                d="M256 113.86c34.65 0 65.76 11.91 90.22 35.29l67.69-67.69C373.03 43.39 319.61 20 256 20c-92.25 0-172.07 52.89-210.9 130.01l78.85 61.15c18.56-55.78 70.59-97.3 132.05-97.3z"
                                fill="#ea4335"
                            ></path>
                            <path d="M20 20h472v472H20V20z"></path>
                        </g>
                    </svg>
                </div>
                <div className="badge__subcontainer">
                    <span
                        className={clsx(
                            "badge__label",
                            theme === "light"
                                ? "badge__label--light"
                                : "badge__label--dark"
                        )}
                    >
                        Google Rating
                    </span>
                    <div className="badge__rating__container">
                        <span
                            className={clsx(
                                "badge__rating",
                                theme === "light"
                                    ? "badge__rating--light"
                                    : "badge__rating--dark"
                            )}
                        >
                            {averageRating.toFixed(1)}
                        </span>
                        <div
                            className={"badge__stars"}
                            aria-hidden="true"
                        >
                            <div
                                className={"badge__stars__container"}
                            >
                                <div
                                    className={"badge__stars__fill"}
                                    style={{
                                        width: `${percentageFill}%`,
                                    }}
                                >
                                    <span
                                        style={{ color: "#F8AF0D" }}
                                    >
                                        ★★★★★
                                    </span>
                                </div>
                                <div
                                    className={"badge__stars__empty"}
                                >
                                    <span
                                        style={{ color: "#d1d5db" }}
                                    >
                                        ★★★★★
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={"badge__link__container"}>
                        {profileUrl ? (
                            <a
                                target="_blank"
                                rel="nofollow noopener noreferrer"
                                href={profileUrl}
                                className={clsx(
                                    "badge__link",
                                    theme === "light"
                                        ? "badge__link--light"
                                        : "badge__link--dark"
                                )}
                            >
                                Read our {totalReviewCount} reviews
                            </a>
                        ) : (
                            <span
                                className={clsx(
                                    "badge__link",
                                    "badge__link--inline",
                                    theme === "light"
                                        ? "badge__link--light"
                                        : "badge__link--dark"
                                )}
                            >
                                Read our {totalReviewCount} reviews
                            </span>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
