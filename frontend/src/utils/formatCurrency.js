// utils/formatCurrency.js
// Single source of truth for all price formatting across the frontend.

const INR_FORMATTER = new Intl.NumberFormat("en-IN", {
  style:                 "currency",
  currency:              "INR",
  maximumFractionDigits: 0,
});

/**
 * Formats a numeric price as an Indian Rupee string.
 * Returns "N/A" for null, undefined, or non-numeric values.
 *
 * @param {number|string|null|undefined} price
 * @returns {string}  e.g. "₹68,999" | "₹1,25,000" | "N/A"
 */
export function formatCurrency(price) {
  if (price == null || price === "") return "N/A";
  const num = Number(price);
  if (isNaN(num)) return "N/A";
  return INR_FORMATTER.format(num);
}
