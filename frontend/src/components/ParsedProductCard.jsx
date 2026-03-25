// components/ParsedProductCard.jsx
// Shown at the top of link-comparison results.
// Displays what the backend extracted from the pasted URL so the user
// can confirm the right product was identified before seeing comparisons.

import { LinkIcon, ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";

const PLATFORM_STYLES = {
  Amazon:   { badge: "bg-orange-100 text-orange-700 border-orange-200", icon: "🛒" },
  Flipkart: { badge: "bg-blue-100 text-blue-700 border-blue-200",       icon: "🏪" },
  Etsy:     { badge: "bg-rose-100 text-rose-700 border-rose-200",       icon: "🎨" },
  eBay:     { badge: "bg-yellow-100 text-yellow-700 border-yellow-200", icon: "🔖" },
};

export default function ParsedProductCard({ parsedProduct }) {
  if (!parsedProduct) return null;

  const style = PLATFORM_STYLES[parsedProduct.platform] || {
    badge: "bg-gray-100 text-gray-700 border-gray-200",
    icon: "🔗",
  };

  return (
    <div className="bg-white rounded-2xl border-2 border-violet-200 shadow-sm p-5
                    flex flex-col sm:flex-row sm:items-center gap-4">

      {/* Left icon */}
      <div className="shrink-0 bg-violet-50 rounded-xl p-3 self-start sm:self-center">
        <LinkIcon className="h-6 w-6 text-violet-500" />
      </div>

      {/* Middle — extracted info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs font-semibold text-violet-600 uppercase tracking-wide">
            Extracted from your link
          </span>
          <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full border ${style.badge}`}>
            {style.icon} {parsedProduct.platform}
          </span>
        </div>

        <p className="text-base font-bold text-gray-900 truncate" title={parsedProduct.name}>
          {parsedProduct.name}
        </p>

        <p className="text-xs text-gray-400 mt-0.5 truncate" title={parsedProduct.originalUrl}>
          {parsedProduct.originalUrl}
        </p>
      </div>

      {/* Right — actions */}
      <div className="flex items-center gap-2 shrink-0">
        {/* Search by name hint */}
        <div className="hidden sm:flex items-center gap-1 text-xs text-gray-400">
          <MagnifyingGlassIcon className="h-3.5 w-3.5" />
          Searching as: <span className="font-medium text-gray-600 ml-1">"{parsedProduct.name}"</span>
        </div>

        {/* Original link */}
        <a
          href={parsedProduct.originalUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 text-xs font-semibold text-violet-600
                     hover:text-violet-800 transition-colors"
        >
          Original
          <ArrowTopRightOnSquareIcon className="h-3.5 w-3.5" />
        </a>
      </div>
    </div>
  );
}
