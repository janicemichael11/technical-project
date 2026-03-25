// components/ProductList.jsx
import { useMemo } from "react";
import ProductCard from "./ProductCard";

export default function ProductList({ products, sort, activePlatforms }) {
  // Apply platform filter then sort — memoised so it only recalculates when inputs change
  const processed = useMemo(() => {
    let list = activePlatforms.length
      ? products.filter((p) => activePlatforms.includes(p.platform))
      : products;

    // "default" keeps the backend's sort order (price_asc from the API)
    switch (sort) {
      case "price_asc":  return [...list].sort((a, b) => a.price - b.price);
      case "price_desc": return [...list].sort((a, b) => b.price - a.price);
      case "rating":     return [...list].sort((a, b) => b.rating - a.rating);
      default:           return list;
    }
  }, [products, sort, activePlatforms]);

  // Find the cheapest product across the filtered list.
  // Backend sets isCheapest=true on the globally cheapest item, but after
  // platform filtering the cheapest visible item may be different — recalculate.
  const cheapestId = useMemo(() => {
    if (!processed.length) return null;
    const cheapest = processed.reduce((min, p) => (p.price < min.price ? p : min));
    // Backend uses _id (MongoDB ObjectId string); mock data uses id (number)
    return cheapest._id ?? cheapest.id;
  }, [processed]);

  if (!processed.length) return null;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
      {processed.map((product) => {
        // Support both _id (backend) and id (mock/legacy)
        const key        = product._id ?? product.id;
        const isCheapest = key === cheapestId;
        return (
          <ProductCard
            key={key}
            product={product}
            isCheapest={isCheapest}
          />
        );
      })}
    </div>
  );
}
