// components/PriceSummaryBar.jsx
import { formatCurrency } from "../utils/formatCurrency";
// Shows a quick stats strip: cheapest, most expensive, average price.
// Prefers backend-calculated meta values when available (more accurate
// since they're computed before pagination/filtering).

export default function PriceSummaryBar({ products, query, meta = {} }) {
  if (!products.length) return null;

  // Use backend meta if available, otherwise calculate client-side
  const prices = products.map((p) => p.price);
  const min     = meta.priceRange?.min  ?? Math.min(...prices);
  const max     = meta.priceRange?.max  ?? Math.max(...prices);
  const avg     = meta.priceRange?.avg  ?? prices.reduce((a, b) => a + b, 0) / prices.length;
  const saving  = max - min;

  // Cheapest platform from backend meta or find it locally
  const cheapestPlatform = meta.cheapestPlatform
    ?? products.find((p) => p.price === min)?.platform;

  return (
    <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-5 text-white shadow-lg">
      <p className="text-sm font-medium text-blue-100 mb-3">
        Price comparison for{" "}
        <span className="font-bold text-white">"{query}"</span>{" "}
        across {meta.total ?? products.length} listings
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <Stat label="Lowest Price"  value={formatCurrency(min)}    sub={cheapestPlatform} highlight />
        <Stat label="Highest Price" value={formatCurrency(max)} />
        <Stat label="Average Price" value={formatCurrency(avg)} />
        <Stat label="Max Savings"   value={formatCurrency(saving)}  sub="vs most expensive" />
      </div>
    </div>
  );
}

function Stat({ label, value, sub, highlight }) {
  return (
    <div className={`rounded-xl p-3 ${highlight ? "bg-white/20 ring-1 ring-white/30" : "bg-white/10"}`}>
      <p className="text-xs text-blue-200 font-medium">{label}</p>
      <p className={`text-xl font-bold mt-0.5 ${highlight ? "text-white" : "text-blue-50"}`}>{value}</p>
      {sub && <p className="text-xs text-blue-300 mt-0.5">{sub}</p>}
    </div>
  );
}
