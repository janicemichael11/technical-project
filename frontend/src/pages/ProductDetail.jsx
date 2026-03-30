// pages/ProductDetail.jsx
// Fetches a single product by its MongoDB _id from GET /api/products/:id
// Accessible via /product/:id

import { formatCurrency } from "../utils/formatCurrency";
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { productService } from "../services/api";
import {
  StarIcon,
  ArrowTopRightOnSquareIcon,
  ArrowLeftIcon,
  CheckBadgeIcon,
} from "@heroicons/react/24/solid";
import { StarIcon as StarOutline } from "@heroicons/react/24/outline";

const PLATFORM_STYLES = {
  Amazon:   { badge: "bg-orange-100 text-orange-700 border-orange-200" },
  Flipkart: { badge: "bg-blue-100 text-blue-700 border-blue-200"       },
  eBay:     { badge: "bg-yellow-100 text-yellow-700 border-yellow-200" },
  Etsy:     { badge: "bg-rose-100 text-rose-700 border-rose-200"       },
};

function StarRating({ rating }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) =>
        i <= Math.round(rating)
          ? <StarIcon key={i} className="h-5 w-5 text-amber-400" />
          : <StarOutline key={i} className="h-5 w-5 text-gray-300" />
      )}
    </div>
  );
}

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(null);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    productService
      .getById(id)
      .then((res) => {
        // Backend envelope: { success, data: product }
        setProduct(res.data?.data ?? res.data);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent" />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center gap-4">
        <p className="text-red-500 font-medium">{error || "Product not found"}</p>
        <Link to="/" className="text-blue-600 hover:underline flex items-center gap-1">
          <ArrowLeftIcon className="h-4 w-4" /> Back to search
        </Link>
      </div>
    );
  }

  const title      = product.name       || product.title || "Unknown Product";
  const productUrl = product.productUrl || product.url   || "#";
  const style      = PLATFORM_STYLES[product.platform]  || PLATFORM_STYLES.Amazon;

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-4xl mx-auto">

        {/* Back link */}
        <Link to="/" className="inline-flex items-center gap-1.5 text-sm text-gray-500
                                 hover:text-blue-600 transition-colors mb-6">
          <ArrowLeftIcon className="h-4 w-4" />
          Back to results
        </Link>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0">

            {/* Image */}
            <div className="bg-gray-50 flex items-center justify-center p-8 min-h-72">
              <img
                src={product.image || `https://placehold.co/400x400/e2e8f0/94a3b8?text=${encodeURIComponent(product.platform)}`}
                alt={title}
                className="max-h-72 object-contain rounded-xl"
                onError={(e) => {
                  e.target.src = `https://placehold.co/400x400/e2e8f0/94a3b8?text=${encodeURIComponent(product.platform)}`;
                }}
              />
            </div>

            {/* Details */}
            <div className="p-8 flex flex-col gap-5">

              {/* Platform badge */}
              <span className={`self-start text-xs font-semibold px-3 py-1 rounded-full border ${style.badge}`}>
                {product.platform}
              </span>

              {/* Title */}
              <h1 className="text-2xl font-bold text-gray-900 leading-snug">{title}</h1>

              {/* Rating */}
              <div className="flex items-center gap-3">
                <StarRating rating={product.rating} />
                <span className="text-sm font-semibold text-gray-700">{product.rating}</span>
                <span className="text-sm text-gray-400">
                  ({(product.reviews || 0).toLocaleString()} reviews)
                </span>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-extrabold text-gray-900">
                  {formatCurrency(product.price)}
                </span>
                {product.isCheapest && (
                  <span className="flex items-center gap-1 text-sm font-semibold text-green-600">
                    <CheckBadgeIcon className="h-5 w-5" />
                    Best price found
                  </span>
                )}
              </div>

              {/* Meta info */}
              <div className="text-xs text-gray-400 space-y-1">
                {product.searchQuery && (
                  <p>Search: <span className="font-medium text-gray-600">"{product.searchQuery}"</span></p>
                )}
                {product.createdAt && (
                  <p>Cached: <span className="font-medium text-gray-600">{new Date(product.createdAt).toLocaleString()}</span></p>
                )}
              </div>

              {/* CTA */}
              <a
                href={productUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-auto flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700
                           text-white font-semibold py-3 px-6 rounded-xl transition-colors shadow-sm"
              >
                View on {product.platform}
                <ArrowTopRightOnSquareIcon className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
