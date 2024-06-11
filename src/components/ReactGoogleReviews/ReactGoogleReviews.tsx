import React from "react";

export interface ButtonProps {
    label: string;
}

const ReactGoogleReviews = (props: ButtonProps) => {
    return (
        <div>
            <h1>React Google Reviews</h1>
            <p>{props}</p>
        </div>
    );
};

export default ReactGoogleReviews;
