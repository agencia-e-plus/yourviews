import { Offer, PriceSpecification, ProductListingPage, UnitPriceSpecification } from "apps/commerce/types.ts";
import { AppContext } from "../mod.ts";
import { toAggregateRating } from "../utils/transform.ts";
import { ExtensionOf } from "apps/website/loaders/extension.ts";
/**
 * @title Yourviews
*/

export default function getReviewProduct(
  _props: unknown,
  _req: Request,
  ctx: AppContext,
): ExtensionOf<ProductListingPage | null> {
  
  const { api, storeKey } = ctx;
  return async (page: ProductListingPage | null) => {
    if (!page) {
      return null;
    }

    const productIds = page.products.map((product) =>
      product.inProductGroupWithID
    ).filter(Boolean) as string[];



    const fullReviewResponse = await api
      ["GET /api/:storeKey/review/reviewshelf"]({
        storeKey,
        productIds: productIds.join(","),
      });

    const fullReview = await fullReviewResponse.json();

    const products = page.products.map((product) => {
      const resume = fullReview.Element.find((rating) =>
        rating.ProductId === product.inProductGroupWithID
      );


      const {offers} = product

      if (!resume) return product;
      const aggregateRating = toAggregateRating(resume);

      const productOffers = offers?.offers.map((offer) => {
        const unitPriceUpdated = offer.priceSpecification.map((item) => ({...item,priceCurrency:"BRL"} as UnitPriceSpecification)) 

        return ({
          ...offer,
          priceCurrency:"BRL",
          priceSpecification:unitPriceUpdated
        }) as Offer 

      })  ?? []
      

      return {
        ...product,
        offers: product.offers ? {
          ...product.offers,
          offers: productOffers
        } : undefined,
        isVariantOf: product.isVariantOf
          ? {
            ...product.isVariantOf,
            aggregateRating,
          }
          : undefined,
      };
    });

    return {
      ...page,
      products,
    };
  };
}
