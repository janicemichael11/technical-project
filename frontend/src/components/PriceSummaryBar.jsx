// ============================================================
// components/PriceSummaryBar.jsx — Price statistics strip
// ============================================================
// Displays a coloured banner above the product grid showing:
//   - Lowest price found (and which platform has it)
//   - Highest price found
//   - Average price across all results
//   - Maximum potential saving (highest − lowest)
//
// Props:
//   products — array of product objects currently displayed
//   query    — the search term (shown in the banner text)
//   meta     — optional backend meta object with pre-calculated stats
//              (more accurate than client-side calculation because it
//               uses all results before pagination/filtering)

import { formatCurrency } from '../utils/formatCurrency';

export default function PriceSummaryBar({ products, query, meta = {} }) {
  // Don't render anything if there are no products to summarise
  if (!products.length) return null;

  // Prefer backend-calculated values from meta when available.
  // Fall back to calculating from the current products array.
  const prices = products.map((p) => p.price);
  const min    = meta.priceRange?.min ?? Math.min(...prices);
  const max    = meta.priceRange?.max ?? Math.max(...prices);
  const avg    = meta.priceRange?.avg ?? prices.reduce((a, b) => a + b, 0) / prices.length;
  const saving = max - min; // how much you save by choosing cheapest over most expensive

  // Which platform has the cheapest price
  const cheapestPlatform = meta.cheapestPlatform
    ?? products.find((p) => p.price === min)?.platform;

  return (
    <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-5 text-white shadow-lg">
      <p className="text-sm font-medium text-blue-100 mb-3">
        Price comparison for{' '}
        <span className="font-bold text-white">"{query}"</span>{' '}
        across {meta.total ?? products.length} listings
      </p>

      {/* Four stat boxes in a responsive grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {/* highlight=true gives the cheapest box a slightly brighter background */}
        <Stat label="Lowest Price"  value={formatCurrency(min)}    sub={cheapestPlatform} highlight />
        <Stat label="Highest Price" value={formatCurrency(max)} />
        <Stat label="Average Price" value={formatCurrency(avg)} />
        <Stat label="Max Savings"   value={formatCurrency(saving)}  sub="vs most expensive" />
      </div>
    </div>
  );
}

// ── Stat sub-component ────────────────────────────────────────────────────────
// Renders a single statistic box inside the summary bar.
// Props: label, value, sub (optional subtitle), highlight (boolean)
function Stat({ label, value, sub, highlight }) {
  return (
    <div className={`rounded-xl p-3 ${highlight ? 'bg-white/20 ring-1 ring-white/30' : 'bg-white/10'}`}>
      <p className="text-xs text-blue-200 font-medium">{label}</p>
      <p className={`text-xl font-bold mt-0.5 ${highlight ? 'text-white' : 'text-blue-50'}`}>{value}</p>
      {sub && <p className="text-xs text-blue-300 mt-0.5">{sub}</p>}
    </div>
  );
}
