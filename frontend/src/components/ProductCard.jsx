// ============================================================
// components/ProductCard.jsx — Single product result card
// ============================================================
// Displays one product listing with its image, title, rating,
// price, and a "View Deal" button that links to the product page.
//
// Props:
//   product     — product object from the backend
//   isCheapest  — boolean, true if this is the lowest-priced result
//                 (passed down from ProductList after client-side recalculation)

import { formatCurrency } from '../utils/formatCurrency';
import { StarIcon, ArrowTopRightOnSquareIcon } from '@heroicons/react/24/solid';
import { StarIcon as StarOutline } from '@heroicons/react/24/outline';

// Each platform gets its own colour scheme for visual distinction
const PLATFORM_STYLES = {
  Amazon:   { bg: 'bg-orange-50',  border: 'border-orange-200', badge: 'bg-orange-100 text-orange-700',  dot: 'bg-orange-400' },
  Flipkart: { bg: 'bg-blue-50',    border: 'border-blue-200',   badge: 'bg-blue-100 text-blue-700',      dot: 'bg-blue-500'   },
  eBay:     { bg: 'bg-yellow-50',  border: 'border-yellow-200', badge: 'bg-yellow-100 text-yellow-700',  dot: 'bg-yellow-500' },
  Etsy:     { bg: 'bg-rose-50',    border: 'border-rose-200',   badge: 'bg-rose-100 text-rose-700',      dot: 'bg-rose-500'   },
};

// Renders a row of 5 stars, filled up to the rounded rating value
function StarRating({ rating }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        i <= Math.round(rating)
          ? <StarIcon    key={i} className="h-3.5 w-3.5 text-amber-400" />
          : <StarOutline key={i} className="h-3.5 w-3.5 text-gray-300" />
      ))}
    </div>
  );
}

export default function ProductCard({ product, isCheapest: isCheapestProp }) {
  // Fall back to Amazon styles if the platform isn't in our map
  const style = PLATFORM_STYLES[product.platform] || PLATFORM_STYLES.Amazon;

  // Support both backend field names and legacy mock data field names
  const title      = product.name       || product.title || 'Unknown Product';
  const productUrl = product.productUrl || product.url   || '#';
  const reviews    = product.reviews    || 0;

  // The cheapest flag can come from the backend OR be calculated by ProductList
  const isCheapest = product.isCheapest || isCheapestProp;

  return (
    <div
      className={`relative flex flex-col rounded-2xl border-2 overflow-hidden shadow-sm
                  hover:shadow-lg hover:-translate-y-1 transition-all duration-200 bg-white
                  ${isCheapest ? 'border-green-400 ring-2 ring-green-200' : style.border}`}
    >
      {/* Green "Best Price" ribbon — only shown on the cheapest card */}
      {isCheapest && (
        <div className="absolute top-3 left-3 z-10 bg-green-500 text-white text-xs font-bold
                        px-2.5 py-1 rounded-full shadow flex items-center gap-1">
          🏆 Best Price
        </div>
      )}

      {/* Platform badge (top-right corner) */}
      <div className={`absolute top-3 right-3 z-10 flex items-center gap-1.5 text-xs font-semibold
                       px-2.5 py-1 rounded-full ${style.badge}`}>
        <span className={`w-1.5 h-1.5 rounded-full ${style.dot}`} />
        {product.platform}
      </div>

      {/* Product image — falls back to a placeholder if the URL is missing */}
      <div className={`${style.bg} h-48 flex items-center justify-center overflow-hidden`}>
        <img
          src={product.image || `https://placehold.co/400x300/e2e8f0/94a3b8?text=${encodeURIComponent(product.platform)}`}
          alt={title}
          className="h-full w-full object-cover"
          onError={(e) => {
            // If the image fails to load, swap in the placeholder
            e.target.src = `https://placehold.co/400x300/e2e8f0/94a3b8?text=${encodeURIComponent(product.platform)}`;
          }}
        />
      </div>

      {/* Card body — title, rating, price, CTA button */}
      <div className="flex flex-col flex-1 p-4 gap-3">
        <h3 className="text-sm font-semibold text-gray-800 line-clamp-2 leading-snug">
          {title}
        </h3>

        {/* Star rating row */}
        <div className="flex items-center gap-2">
          <StarRating rating={product.rating} />
          <span className="text-xs text-gray-500 font-medium">{product.rating}</span>
          <span className="text-xs text-gray-400">({reviews.toLocaleString()})</span>
        </div>

        {/* Price and "View Deal" button */}
        <div className="flex items-center justify-between mt-auto pt-2 border-t border-gray-100">
          <div>
            {/* formatCurrency formats the number as ₹68,999 using Indian locale */}
            <span className="text-2xl font-bold text-gray-900">
              {formatCurrency(product.price)}
            </span>
            {isCheapest && (
              <p className="text-xs text-green-600 font-medium mt-0.5">Lowest price!</p>
            )}
          </div>

          {/* External link to the product page on the original platform */}
          <a
            href={productUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center gap-1.5 text-xs font-semibold px-4 py-2 rounded-xl
                        transition-colors shadow-sm
                        ${isCheapest
                          ? 'bg-green-500 hover:bg-green-600 text-white'
                          : 'bg-gray-900 hover:bg-gray-700 text-white'}`}
          >
            View Deal
            <ArrowTopRightOnSquareIcon className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
}
