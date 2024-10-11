import type { FullReview, ReviewShelf } from "./types.ts";

export interface API {
  "GET /api/:storeKey/review/:productId/fullreview": {
    response: FullReview;
    searchParams: {
      orderBy?: number;
      count?: number;
      page?: number;
    };
  };
  "GET /api/:storeKey/review/reviewshelf": {
    response: ReviewShelf;
    searchParams: {
      productIds?: string;
    };
  };
}
