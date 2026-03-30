// components/FilterBar.jsx
import { AdjustmentsHorizontalIcon } from "@heroicons/react/24/outline";

const PLATFORMS = ["Amazon", "Flipkart", "eBay", "Etsy"];

const SORT_OPTIONS = [
  { value: "default",    label: "Relevance" },
  { value: "price_asc",  label: "Price: Low → High" },
  { value: "price_desc", label: "Price: High → Low" },
  { value: "rating",     label: "Top Rated" },
];

export default function FilterBar({ sort, setSort, activePlatforms, setActivePlatforms, totalResults }) {
  const togglePlatform = (platform) => {
    setActivePlatforms((prev) =>
      prev.includes(platform)
        ? prev.filter((p) => p !== platform)   // remove
        : [...prev, platform]                   // add
    );
  };

  const allSelected = activePlatforms.length === PLATFORMS.length;

  const toggleAll = () => {
    setActivePlatforms(allSelected ? [] : [...PLATFORMS]);
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-4">
      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        {/* Left: icon + result count */}
        <div className="flex items-center gap-2 text-sm text-gray-500 shrink-0">
          <AdjustmentsHorizontalIcon className="h-4 w-4" />
          <span className="font-medium text-gray-700">{totalResults} results</span>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 flex-1">
          {/* Platform checkboxes */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Platforms:</span>
            {/* All toggle */}
            <button
              onClick={toggleAll}
              className={`text-xs px-3 py-1.5 rounded-full border font-medium transition-all
                          ${allSelected
                            ? "bg-gray-900 text-white border-gray-900"
                            : "bg-white text-gray-600 border-gray-300 hover:border-gray-500"}`}
            >
              All
            </button>
            {PLATFORMS.map((p) => (
              <button
                key={p}
                onClick={() => togglePlatform(p)}
                className={`text-xs px-3 py-1.5 rounded-full border font-medium transition-all
                            ${activePlatforms.includes(p)
                              ? "bg-blue-600 text-white border-blue-600"
                              : "bg-white text-gray-600 border-gray-300 hover:border-blue-400 hover:text-blue-600"}`}
              >
                {p}
              </button>
            ))}
          </div>

          {/* Sort dropdown */}
          <div className="flex items-center gap-2 sm:ml-auto">
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide shrink-0">Sort:</span>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="text-sm border border-gray-200 rounded-xl px-3 py-1.5 bg-white
                         focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400
                         text-gray-700 cursor-pointer"
            >
              {SORT_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
