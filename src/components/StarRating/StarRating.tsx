import clsx from "clsx";
import React, { FC } from "react";
import { StarIcon } from "./StarIcon";

export const StarRating: FC<{
    rating: number;
    className?: string;
    size?: "sm" | "md" | "lg" | "xl";
}> = ({ className, rating, size = "md" }) => {
    return (
        <div className={"starRating"}>
            {Array.from({ length: 5 }).map((_, i) => (
                <StarIcon
                    key={i}
                    className={clsx(
                        size === "sm" && "star--sm",
                        size === "md" && "star--md",
                        size === "lg" && "star--lg",
                        size === "xl" && "star--xl",
                        className,
                        rating >= i + 1
                            ? "star--filled"
                            : "star--empty"
                    )}
                />
            ))}
        </div>
    );
};
