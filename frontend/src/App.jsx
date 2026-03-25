// src/App.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import ProductDetail from "./pages/ProductDetail";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        {/* Home — search + results */}
        <Route path="/" element={<Home />} />

        {/* Product detail — fetches single product by MongoDB _id */}
        <Route path="/product/:id" element={<ProductDetail />} />

        {/* Catch-all — redirect unknown routes back home */}
        <Route path="*" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}
