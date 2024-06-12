import clsx from "clsx";
import React, { useMemo } from "react";
// import { GoogleReview } from "common/types/review.types";
// import {
//     WidgetConfig,
//     WidgetConfigDateDisplay,
//     WidgetConfigLogoVariant,
//     WidgetConfigNameDisplay,
//     WidgetConfigReviewVariant,
//     WidgetConfigTheme,
//     WidgetHighlight,
// } from "common/types/widget.types";
import { FC } from "react";
// import "slick-carousel/slick/slick-theme.css";
// import "slick-carousel/slick/slick.css";
// import styles from "../css/Carousel.module.css";
// import * as styles from "./Carousel.module.css";
import Slider from "react-slick";
import {
    DateDisplay,
    GoogleReview,
    LogoVariant,
    NameDisplay,
    ReviewVariant,
    Theme,
} from "../../types/review";
import { ReviewCard } from "../ReviewCard/ReviewCard";

export const Carousel: FC<{
    reviews: GoogleReview[];

    /**
     * When collapsed, the maximum number of characters to display in the review body.
     */
    maxCharacters?: number;

    /**
     * How to display the reviewer's name.
     */
    nameDisplay?: NameDisplay;

    /**
     * How to display the Google logo
     */
    logoVariant?: LogoVariant;

    /**
     * How to display the review date.
     */
    dateDisplay?: DateDisplay;

    /**
     * How to display the review.
     */
    reviewVariant?: ReviewVariant;

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

    /**
     * Theme of the carousel.
     */
    theme?: Theme;
}> = ({
    reviews,
    maxCharacters = 200,
    nameDisplay = "firstAndLastInitials",
    logoVariant = "icon",
    dateDisplay = "relative",
    reviewVariant = "card",
    carouselAutoplay = true,
    carouselSpeed = 3000,
    maxItems = 3,
    theme = "light",
}) => {
    const slider = React.useRef<Slider>(null);

    const autoplay = useMemo(() => {
        return carouselAutoplay == null ? true : carouselAutoplay;
    }, [carouselAutoplay]);

    const speed = useMemo(() => {
        return carouselSpeed == null ? 3000 : carouselSpeed;
    }, [carouselSpeed]);

    return (
        <div className={"carousel"}>
            <button
                onClick={() => slider?.current?.slickPrev()}
                className={clsx(
                    "carousel__btn carousel__btn--left",
                    theme === "light"
                        ? "carousel__btn--light"
                        : "carousel__btn--dark"
                )}
                style={{
                    transform: "translateY(-50%)",
                }}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="carousel__btn__icon"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.75 19.5 8.25 12l7.5-7.5"
                    />
                </svg>
            </button>
            <button
                onClick={() => slider?.current?.slickNext()}
                className={clsx(
                    "carousel__btn carousel__btn--right",
                    theme === "light"
                        ? "carousel__btn--light"
                        : "carousel__btn--dark"
                )}
                style={{
                    transform: "translateY(-50%)",
                }}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="carousel__btn__icon"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m8.25 4.5 7.5 7.5-7.5 7.5"
                    />
                </svg>
            </button>
            <Slider
                key={`${autoplay}-${speed}`}
                dots={true}
                infinite={true}
                speed={500}
                slidesToShow={maxItems}
                slidesToScroll={autoplay ? 1 : maxItems}
                className=""
                ref={slider}
                autoplay={autoplay}
                autoplaySpeed={speed}
                arrows={false}
                responsive={[
                    {
                        breakpoint: 1280,
                        settings: {
                            slidesToShow: maxItems,
                            slidesToScroll: autoplay ? 1 : maxItems,
                            infinite: true,
                            dots: true,
                        },
                    },
                    {
                        breakpoint: 768,
                        settings: {
                            slidesToShow: 2,
                            slidesToScroll: autoplay ? 1 : 2,
                            initialSlide: 2,
                        },
                    },
                    {
                        breakpoint: 640,
                        settings: {
                            slidesToShow: 1,
                            slidesToScroll: 1,
                        },
                    },
                ]}
            >
                {reviews.map((review) => {
                    return (
                        <div
                            // className={styles.card}
                            key={review.reviewId}
                        >
                            <ReviewCard
                                review={review}
                                maxCharacters={maxCharacters}
                                nameDisplay={nameDisplay}
                                logoVariant={logoVariant}
                                dateDisplay={dateDisplay}
                                reviewVariant={reviewVariant}
                                theme={theme}
                            />
                        </div>
                    );
                })}
            </Slider>
        </div>
    );
};
