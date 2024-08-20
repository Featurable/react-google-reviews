import React from "react";
import { createRoot } from "react-dom/client";
import { ReactGoogleReviews } from "../src";

const App: React.FC<{}> = () => {
    return (
        <div>
            <h1>React Google Reviews Example</h1>
            <ReactGoogleReviews
                layout="carousel"
                featurableId="example"
            />
            <ReactGoogleReviews
                layout="badge"
                featurableId="example"
            />
        </div>
    );
};

const root = createRoot(document.getElementById("root")!);
root.render(<App />);
