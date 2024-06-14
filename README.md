

# React Google Reviews

![React Google Reviews Integration by Featurable](public/react-google-reviews.jpg)

<div align="center">
  <strong>Making adding Google reviews to any website beautiful, easy, and free!</strong><br />
  <br />
  <a href="https://github.com/ryanschiang/react-google-reviews/issues/new?assignees=&labels=Type%3A+Bug&template=01_bug_report.yml&title=bug%3A+">Report a Bug</a>
  -
  <a href="https://github.com/ryanschiang/react-google-reviews/issues/new?assignees=&labels=Type%3A+Feature&template=02_feature_request.yml&title=feat%3A+">Request a Feature</a>
  -
  <a href="https://github.com/ryanschiang/react-google-reviews/issues/new?assignees=&labels=Type%3A+Question&template=03_support_question.yml&title=support%3A+">Ask a Question</a>
</div>

<div align="center">

<br />

[![npm](https://img.shields.io/npm/v/react-google-reviews?style=flat-square)](https://www.npmjs.com/package/react-google-reviews)
[![GitHub release (latest SemVer)](https://img.shields.io/github/v/release/ryanschiang/react-google-reviews?sort=semver&style=flat-square)](https://github.com/ryanschiang/react-google-reviews/releases)
[![Release Date](https://img.shields.io/github/release-date/ryanschiang/react-google-reviews?style=flat-square)](https://github.com/ryanschiang/ryanschiang/releases/latest)
[![License: MIT](https://img.shields.io/badge/license-%20MIT-blue?style=flat-square&logo=gnu)](https://github.com/ryanschiang/react-google-reviews/blob/main/LICENSE)
[![Pull Requests welcome](https://img.shields.io/badge/PRs-welcome-ff69b4.svg?style=flat-square)](https://github.com/ryanschiang/react-google-reviews/issues?q=is%3Aissue+is%3Aopen+label%3A%22help+wanted%22%2C%22Status%3A+Available%22+sort%3Aupdated-desc+)

</div>

---

<a href="https://github.com/premail">

<img src="public/featurable-icon.svg" alt="Featurable" width="50" height="50" align="left" />

</a><strong>This
React Google Reviews library is brought to you by
<a href="https://featurable.com">Featurable</a>, and the following
documentation can also be found at
<a href="https://featurable.com/docs/react-google-reviews">https://featurable.com/docs/react-google-reviews</a></strong>

---

**What is it?** React component to display Google reviews on your website. This library is built with React and uses the Google Places API -or- the free Featurable API to fetch and display Google reviews on your website.

Documentation and examples at [https://featurable.com/docs/react-google-reviews](https://featurable.com/docs/react-google-reviews). Source code at [https://github.com/ryanschiang/react-google-reviews](https://github.com/ryanschiang/react-google-reviews).

## Installation

Install it from npm:

```
npm install react-google-reviews
```

## Usage

### Using the Featurable API (recommended)

Prerequisites:
1. Create a free Featurable account at [https://featurable.com](https://featurable.com)
2. Create a new Featurable widget and copy the widget ID

```jsx
import { ReactGoogleReviews } from "react-google-reviews";
import "react-google-reviews/dist/index.css";

function Reviews() {
  // Create a free Featurable account at https://featurable.com
  // Then create a new Featurable widget and copy the widget ID
  const featurableWidgetId = "842ncdd8-0f40-438d-9cd6-b01907d1094a";

  return (
    <ReactGoogleReviews layout="carousel" featurableId={featurableWidgetId} />
  );
}
```

### Using the Google Places API

Prerequisites:
1. Create a Google Cloud Platform account at [https://cloud.google.com](https://cloud.google.com)
2. Create a new project and enable the Google Places API **(old version)**
3. Find the Google Place ID using the [Place ID Finder](https://developers.google.com/maps/documentation/javascript/examples/places-placeid-finder)

```jsx
import { ReactGoogleReviews, dangerouslyFetchPlaceReviews } from "react-google-reviews";
import "react-google-reviews/dist/index.css";

/**
 * Example using NextJS server component
 */
async function ReviewsPage() {
  const placeId = "ChIJN1t_tDeuEmsRU..."; // Google Place ID
  const apiKey = "AIzaSyD..."; // Google API Key

  // IMPORTANT: Only fetch reviews server-side to avoid exposing API key
  const reviews = await dangerouslyFetchPlaceReviews(placeId, apiKey)

  return (
    <ReactGoogleReviews layout="carousel" reviews={reviews} />
  );
}

export default ReviewsPage;
```

> [!NOTE]
> The Google Places API **only returns the 5 most recent reviews.** If you need more reviews or want to customize which reviews are returned, consider using the free Featurable API.

## Configuration

## Example

## License

## Acknowledgements