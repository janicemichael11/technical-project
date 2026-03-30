// ============================================================
// App.jsx — Root component and client-side routing
// ============================================================
// This component sets up the URL router and defines which page
// component renders for each URL path.
//
// BrowserRouter uses the HTML5 History API so URLs look like
// normal paths (/product/123) instead of hash-based (#/product/123).
//
// Route map:
//   /              → Home page (search + results)
//   /product/:id   → ProductDetail page (single product view)
//   *              → Catch-all: redirect unknown URLs back to Home

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';

export default function App() {
  return (
    // BrowserRouter provides routing context to all child components
    <BrowserRouter>
      {/* Navbar is always visible at the top of every page */}
      <Navbar />

      {/* Routes renders only the first <Route> whose path matches the current URL */}
      <Routes>
        {/* Home page — search bar + price comparison results */}
        <Route path="/" element={<Home />} />

        {/* Product detail — fetches a single product by its MongoDB _id */}
        <Route path="/product/:id" element={<ProductDetail />} />

        {/* Catch-all — any unknown URL falls back to the Home page */}
        <Route path="*" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}
