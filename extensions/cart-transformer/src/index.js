// @ts-check

/**
 * @typedef {import("../generated/api").InputQuery} InputQuery
 * @typedef {import("../generated/api").FunctionResult} FunctionResult
 */

/**
 * @type {FunctionResult}
 */
const NO_CHANGES = {
  operations: [],
};

export default /**
 * @param {InputQuery} input
 * @returns {FunctionResult}
 */
(input) => {
// @ts-ignore
let customBundleTotal = 0;
    const inputTargets = input.cart.lines
      // @ts-ignore
      .filter(line => {const isBundle = line.isBundle; if(isBundle) {return line}})
      // @ts-ignore
      const targets = inputTargets.map(({id, quantity}) => { return {cartLineId:id, quantity}});
      // @ts-ignore
      let customBundleOriginalPrice = targets[0]?.customBundleTotal || 0;
      // @ts-ignore
      let customDiscountedTotal = targets[0]?.customBundleDiscountedPrice || 0;
      // @ts-ignore 
      customBundleTotal = customBundleOriginalPrice - customDiscountedTotal;

      customBundleTotal = ((customBundleOriginalPrice / customBundleTotal) * 100);
      const operations =  [
        {
          "merge": {
            "cartLines": targets,
            "parentVariantId": "gid://shopify/ProductVariant/43497517842583",
            "price": {
              "percentageDecrease": {
                "value": customBundleTotal
              }
            },
            "image": null,
            "title": null
          }
        }
      ]
    if (!targets.length || targets.length < 2) {
      console.error("No cart lines qualify bundles.");
      return NO_CHANGES;
    }
      return {operations};
};