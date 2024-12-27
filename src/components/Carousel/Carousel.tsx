/** @jsxImportSource @emotion/react */

import { css } from "@emotion/react";
import clsx from "clsx";
import React, { FC, useMemo } from "react";
import Slider from "react-slick";
import {
    CarouselCSSProps,
    ReviewCardCSSProps,
} from "../../types/cssProps";
import {
    DateDisplay,
    GoogleReview,
    LogoVariant,
    NameDisplay,
    ReviewVariant,
    Theme,
} from "../../types/review";
import { ReviewCard } from "../ReviewCard/ReviewCard";

const carousel = css`
    max-width: 1280px;
    margin: 0 auto;
    padding: 0 40px 32px;
    position: relative;
`;

const carouselBtn = css`
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    height: 40px;
    width: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 100%;
    transition: all;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    cursor: pointer;

    &:hover {
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    }
`;

const carouselBtnLeft = css`
    left: 0;
`;
const carouselBtnRight = css`
    right: 0;
`;
const carouselBtnLight = css`
    background: white;
    color: hsl(0, 0%, 20%);
    border: 1px solid hsl(0, 0%, 80%);

    &:hover {
        background: hsl(0, 0%, 95%);
        border: 1px solid hsl(0, 0%, 80%);
    }
`;
const carouselBtnDark = css`
    background: #111827;
    color: hsl(0, 0%, 20%);
    border: 1px solid #374151

    &:hover {
        background: #0b0f19;
        border: 1px solid #272e3a;
    }
`;

const carouselBtnIcon = css`
    width: 24px;
    height: 24px;
`;

const carouselCard = css`
    padding: 8px;
    box-sizing: border-box;
`;

type CarouselProps = {
    reviews: GoogleReview[];
    maxCharacters?: number;
    nameDisplay?: NameDisplay;
    logoVariant?: LogoVariant;
    dateDisplay?: DateDisplay;
    reviewVariant?: ReviewVariant;
    carouselSpeed?: number;
    carouselAutoplay?: boolean;
    maxItems?: number;
    theme?: Theme;
    accessibility?: boolean;
    readMoreLabel?: string;
    readLessLabel?: string;
};

export const Carousel: FC<
    CarouselProps & CarouselCSSProps & ReviewCardCSSProps
> = ({
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
    accessibility = true,
    readMoreLabel,
    readLessLabel,

    carouselClassName,
    carouselStyle,
    carouselBtnClassName,
    carouselBtnStyle,
    carouselBtnLeftClassName,
    carouselBtnLeftStyle,
    carouselBtnRightClassName,
    carouselBtnRightStyle,
    carouselBtnLightClassName,
    carouselBtnLightStyle,
    carouselBtnDarkClassName,
    carouselBtnDarkStyle,
    carouselBtnIconClassName,
    carouselBtnIconStyle,
    carouselCardClassName,
    carouselCardStyle,

    reviewCardClassName,
    reviewCardStyle,
    reviewCardLightClassName,
    reviewCardLightStyle,
    reviewCardDarkClassName,
    reviewCardDarkStyle,
    reviewBodyCardClassName,
    reviewBodyCardStyle,
    reviewBodyTestimonialClassName,
    reviewBodyTestimonialStyle,
    reviewTextClassName,
    reviewTextStyle,
    reviewTextLightClassName,
    reviewTextLightStyle,
    reviewTextDarkClassName,
    reviewTextDarkStyle,
    reviewReadMoreClassName,
    reviewReadMoreStyle,
    reviewReadMoreLightClassName,
    reviewReadMoreLightStyle,
    reviewReadMoreDarkClassName,
    reviewReadMoreDarkStyle,
    reviewFooterClassName,
    reviewFooterStyle,
    reviewerClassName,
    reviewerStyle,
    reviewerProfileClassName,
    reviewerProfileStyle,
    reviewerProfileImageClassName,
    reviewerProfileImageStyle,
    reviewerProfileFallbackClassName,
    reviewerProfileFallbackStyle,
    reviewerNameClassName,
    reviewerNameStyle,
    reviewerNameLightClassName,
    reviewerNameLightStyle,
    reviewerNameDarkClassName,
    reviewerNameDarkStyle,
    reviewerDateClassName,
    reviewerDateStyle,
    reviewerDateLightClassName,
    reviewerDateLightStyle,
    reviewerDateDarkClassName,
    reviewerDateDarkStyle,
}) => {
    const slider = React.useRef<Slider>(null);

    const autoplay = useMemo(() => {
        return carouselAutoplay == null ? true : carouselAutoplay;
    }, [carouselAutoplay]);

    const speed = useMemo(() => {
        return carouselSpeed == null ? 3000 : carouselSpeed;
    }, [carouselSpeed]);

    return (
        <div
            css={carousel}
            role="region"
            aria-label="Customer Reviews Carousel"
            className={carouselClassName}
            style={carouselStyle}
        >
            <button
                onClick={() => slider?.current?.slickPrev()}
                css={[
                    carouselBtn,
                    carouselBtnLeft,
                    theme === "light"
                        ? carouselBtnLight
                        : carouselBtnDark,
                ]}
                role="button"
                aria-description="Previous Review"
                className={clsx(
                    carouselBtnClassName,
                    carouselBtnLeftClassName,
                    theme === "light"
                        ? carouselBtnLightClassName
                        : carouselBtnDarkClassName
                )}
                style={{
                    ...carouselBtnStyle,
                    ...carouselBtnLeftStyle,
                    ...(theme === "light"
                        ? carouselBtnLightStyle
                        : carouselBtnDarkStyle),
                }}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    css={carouselBtnIcon}
                    className={carouselBtnIconClassName}
                    style={carouselBtnIconStyle}
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
                css={[
                    carouselBtn,
                    carouselBtnRight,
                    theme === "light"
                        ? carouselBtnLight
                        : carouselBtnDark,
                ]}
                role="button"
                aria-description="Next Review"
                className={clsx(
                    carouselBtnClassName,
                    carouselBtnRightClassName,
                    theme === "light"
                        ? carouselBtnLightClassName
                        : carouselBtnDarkClassName
                )}
                style={{
                    ...carouselBtnStyle,
                    ...carouselBtnRightStyle,
                    ...(theme === "light"
                        ? carouselBtnLightStyle
                        : carouselBtnDarkStyle),
                }}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    css={carouselBtnIcon}
                    className={carouselBtnIconClassName}
                    style={carouselBtnIconStyle}
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
                accessibility={accessibility}
                focusOnSelect={accessibility}
                customPaging={(i) => (
                    <button
                        tabIndex={0}
                        aria-label={`Review ${i + 1}`}
                    >
                        {i + 1}
                    </button>
                )}
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
                {reviews.map((review, index) => {
                    return (
                        <div
                            css={carouselCard}
                            key={review.reviewId ?? review.comment}
                            tabIndex={index === 0 ? 0 : -1}
                            aria-label={`Review ${index + 1}`}
                            className={carouselCardClassName}
                            style={carouselCardStyle}
                        >
                            <ReviewCard
                                review={review}
                                maxCharacters={maxCharacters}
                                nameDisplay={nameDisplay}
                                logoVariant={logoVariant}
                                dateDisplay={dateDisplay}
                                reviewVariant={reviewVariant}
                                theme={theme}
                                readMoreLabel={readMoreLabel}
                                readLessLabel={readLessLabel}
                                reviewCardClassName={
                                    reviewCardClassName
                                }
                                reviewCardStyle={reviewCardStyle}
                                reviewCardLightClassName={
                                    reviewCardLightClassName
                                }
                                reviewCardLightStyle={
                                    reviewCardLightStyle
                                }
                                reviewCardDarkClassName={
                                    reviewCardDarkClassName
                                }
                                reviewCardDarkStyle={
                                    reviewCardDarkStyle
                                }
                                reviewBodyCardClassName={
                                    reviewBodyCardClassName
                                }
                                reviewBodyCardStyle={
                                    reviewBodyCardStyle
                                }
                                reviewBodyTestimonialClassName={
                                    reviewBodyTestimonialClassName
                                }
                                reviewBodyTestimonialStyle={
                                    reviewBodyTestimonialStyle
                                }
                                reviewTextClassName={
                                    reviewTextClassName
                                }
                                reviewTextStyle={reviewTextStyle}
                                reviewTextLightClassName={
                                    reviewTextLightClassName
                                }
                                reviewTextLightStyle={
                                    reviewTextLightStyle
                                }
                                reviewTextDarkClassName={
                                    reviewTextDarkClassName
                                }
                                reviewTextDarkStyle={
                                    reviewTextDarkStyle
                                }
                                reviewReadMoreClassName={
                                    reviewReadMoreClassName
                                }
                                reviewReadMoreStyle={
                                    reviewReadMoreStyle
                                }
                                reviewReadMoreLightClassName={
                                    reviewReadMoreLightClassName
                                }
                                reviewReadMoreLightStyle={
                                    reviewReadMoreLightStyle
                                }
                                reviewReadMoreDarkClassName={
                                    reviewReadMoreDarkClassName
                                }
                                reviewReadMoreDarkStyle={
                                    reviewReadMoreDarkStyle
                                }
                                reviewFooterClassName={
                                    reviewFooterClassName
                                }
                                reviewFooterStyle={reviewFooterStyle}
                                reviewerClassName={reviewerClassName}
                                reviewerStyle={reviewerStyle}
                                reviewerProfileClassName={
                                    reviewerProfileClassName
                                }
                                reviewerProfileStyle={
                                    reviewerProfileStyle
                                }
                                reviewerProfileImageClassName={
                                    reviewerProfileImageClassName
                                }
                                reviewerProfileImageStyle={
                                    reviewerProfileImageStyle
                                }
                                reviewerProfileFallbackClassName={
                                    reviewerProfileFallbackClassName
                                }
                                reviewerProfileFallbackStyle={
                                    reviewerProfileFallbackStyle
                                }
                                reviewerNameClassName={
                                    reviewerNameClassName
                                }
                                reviewerNameStyle={reviewerNameStyle}
                                reviewerNameLightClassName={
                                    reviewerNameLightClassName
                                }
                                reviewerNameLightStyle={
                                    reviewerNameLightStyle
                                }
                                reviewerNameDarkClassName={
                                    reviewerNameDarkClassName
                                }
                                reviewerNameDarkStyle={
                                    reviewerNameDarkStyle
                                }
                                reviewerDateClassName={
                                    reviewerDateClassName
                                }
                                reviewerDateStyle={reviewerDateStyle}
                                reviewerDateLightClassName={
                                    reviewerDateLightClassName
                                }
                                reviewerDateLightStyle={
                                    reviewerDateLightStyle
                                }
                                reviewerDateDarkClassName={
                                    reviewerDateDarkClassName
                                }
                                reviewerDateDarkStyle={
                                    reviewerDateDarkStyle
                                }
                            />
                        </div>
                    );
                })}
            </Slider>
        </div>
    );
};
