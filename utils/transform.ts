import type {
  Element,
  Review as YVReview,
  ReviewShelfElement,
} from "./types.ts";
import type { AggregateRating, Review } from "apps/commerce/types.ts";

export const toReview = (
  productReview: YVReview,
): Review => {
  return ({
    "@type": "Review" as const,
    id: String(productReview.ReviewId),
    author: [{ "@type": "Author", name: productReview.User.Name }],
    datePublished: productReview.Date,
    reviewBody: productReview.Review,
    reviewRating: {
      "@type": "AggregateRating",
      ratingValue: productReview.Rating,
      reviewCount: 1,
    },
  }) as Review;
};

export const toAggregateRating = (
  review: Element | ReviewShelfElement,
): AggregateRating | undefined => {
  if (!review || review.TotalRatings == 0) return;

  return {
    "@type": "AggregateRating",
    reviewCount: review.TotalRatings,
    ratingValue: review.Rating,
    ratingCount: review.TotalRatings,
  };
};
