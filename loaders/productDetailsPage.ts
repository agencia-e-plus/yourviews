import { ProductDetailsPage } from "apps/commerce/types.ts";
import { AppContext } from "../mod.ts";
import { toAggregateRating, toReview } from "../utils/transform.ts";
import { ExtensionOf } from "apps/website/loaders/extension.ts";

export interface Props {
  orderBy?: number;
}

/**
 * @title Yourviews
 */
export default function getReviewProduct(
  props: Props,
  _req: Request,
  ctx: AppContext,
): ExtensionOf<ProductDetailsPage | null> {
  const { api, storeKey } = ctx;
  const {
    orderBy = 1,
  } = props;

  return async (productDetailsPage: ProductDetailsPage | null) => {
    if (!productDetailsPage) {
      return null;
    }

    const fullReviewResponse = await api
      ["GET /api/:storeKey/review/:productId/fullreview"]({
        storeKey,
        productId: productDetailsPage.product.inProductGroupWithID ?? "",
        orderBy,
      });

    const fullReview = await fullReviewResponse.json();
    const resume = fullReview.Element;
    const reviews = fullReview.Element?.Reviews ?? [];

    const aggregateRating = toAggregateRating(resume);

    const review = reviews.length >= 1
      ? reviews?.map((item) => toReview(item))
      : undefined;

    return {
      ...productDetailsPage,
      product: {
        ...productDetailsPage.product,
        isVariantOf: productDetailsPage.product.isVariantOf
          ? {
            ...productDetailsPage.product.isVariantOf,
            aggregateRating,
            review,
          }
          : undefined,
      },
    };
  };
}
