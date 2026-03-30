// ============================================================
// services/searchService.js — Search API wrapper for Home.jsx
// ============================================================
// This thin wrapper calls productService.search and normalises
// the Axios response into a simple { data, meta, error } shape
// that Home.jsx can use directly without knowing about Axios.
//
// Backend response envelope shape:
//   { success, message, data: Product[], meta: { total, cheapestPrice, ... } }
//
// Product shape returned by the backend:
//   { _id, name, price, currency, platform, rating, reviews, image, url, isCheapest }

import { productService } from './api';

/**
 * fetchProducts(query, options)
 * Fetches and compares product prices from the backend.
 *
 * @param {string} query   — product name to search for
 * @param {object} options — optional { sort, platform } filters
 * @returns {{ data: Product[], meta: object, error: string|null }}
 *
 * Always returns an object (never throws) so the caller doesn't
 * need a try/catch — errors are returned in the `error` field.
 */
export const fetchProducts = async (query, options = {}) => {
  try {
    const res = await productService.search(query, options);

    // res.data is the full Axios response body
    // res.data.data is the products array inside the backend envelope
    const products = res.data?.data ?? [];
    const meta     = res.data?.meta ?? {};

    return { data: products, meta, error: null };
  } catch (err) {
    // Return the error message instead of throwing so the UI can display it
    return {
      data:  [],
      meta:  {},
      error: err.message || 'Failed to fetch products. Is the backend running?',
    };
  }
};
