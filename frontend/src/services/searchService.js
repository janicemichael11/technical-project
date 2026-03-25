// src/services/searchService.js
// Thin wrapper around productService.search that normalises the response
// into the shape the rest of the frontend expects.
// Keeping this file means Home.jsx doesn't need to change its import.

import { productService } from './api';

/**
 * Fetch products from the backend comparison API.
 *
 * @param {string} query   - Search term
 * @param {object} options - { sort, platform }
 * @returns {{ data: Product[], meta: object, error: string|null }}
 *
 * Backend response envelope:
 *   { success, message, data: Product[], meta: { total, cheapestPrice, ... } }
 *
 * Backend product shape:
 *   { _id, name, price, platform, rating, reviews, image, productUrl, isCheapest, rank }
 */
export const fetchProducts = async (query, options = {}) => {
  try {
    const res = await productService.search(query, options);

    // res.data is the full Axios response; res.data.data is the products array
    const products = res.data?.data  ?? [];
    const meta     = res.data?.meta  ?? {};

    return { data: products, meta, error: null };
  } catch (err) {
    return {
      data:  [],
      meta:  {},
      error: err.message || 'Failed to fetch products. Is the backend running?',
    };
  }
};
