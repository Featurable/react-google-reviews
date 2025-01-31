import { createRoot } from "react-dom/client";
import { ReactGoogleReviews } from "../components";

const container = document.getElementById("root")!;
const root = createRoot(container);

root.render(
    <div>
        <h1>Component Development Environment</h1>

        <h2>Carousel:</h2>
        <ReactGoogleReviews
            featurableId="example"
            layout="carousel"
        />

        <h2>Badge:</h2>
        <ReactGoogleReviews featurableId="example" layout="badge" />
    </div>
);
