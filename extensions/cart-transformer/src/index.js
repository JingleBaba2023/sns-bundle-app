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
  let {customBundleTotal = 0 } = input.cart || {};
  let {customBundleDiscountedPrice = 0} = input.cart || {};
let totalAmount = customBundleTotal || 0; 
if(customBundleDiscountedPrice && customBundleDiscountedPrice) {
  totalAmount = customBundleTotal - customBundleDiscountedPrice;
}
  
    const inputTargets = input.cart.lines
      .filter(line => {const isBundle = line.isBundle || true;  if(isBundle) {return line}})
      // @ts-ignore
      const targets = inputTargets.map(({id, quantity}) => { return {cartLineId:id, quantity}});
      const operations =  [
        {
          "merge": {
            "cartLines": targets,
            "parentVariantId": "gid://shopify/ProductVariant/45408078823703",
            "price": {
              "percentageDecrease": {
                "value": totalAmount
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