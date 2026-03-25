// components/LinkInput.jsx
// Lets users paste a product URL from Amazon, Flipkart, Etsy, or eBay
// and triggers a cross-platform price comparison.

import { useState, useRef } from "react";
import {
  LinkIcon,
  XMarkIcon,
  ArrowRightIcon,
  CheckCircleIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/24/outline";

// ── Platform detection (mirrors backend urlParser.js logic) ──────────────────
// Done client-side so we can show instant visual feedback before the API call.
const PLATFORM_PATTERNS = [
  { name: "Amazon",   pattern: /amazon\./i,   color: "text-orange-600", bg: "bg-orange-50 border-orange-200", dot: "bg-orange-400" },
  { name: "Flipkart", pattern: /flipkart\./i, color: "text-blue-600",   bg: "bg-blue-50 border-blue-200",     dot: "bg-blue-500"   },
  { name: "Etsy",     pattern: /etsy\./i,     color: "text-rose-600",   bg: "bg-rose-50 border-rose-200",     dot: "bg-rose-500"   },
  { name: "eBay",     pattern: /ebay\./i,     color: "text-yellow-600", bg: "bg-yellow-50 border-yellow-200", dot: "bg-yellow-500" },
];

const detectPlatformClient = (url) => {
  if (!url) return null;
  return PLATFORM_PATTERNS.find((p) => p.pattern.test(url)) || null;
};

const isValidUrl = (url) => {
  try { new URL(url); return true; }
  catch { return false; }
};

// ── Component ─────────────────────────────────────────────────────────────────

export default function LinkInput({ onCompare, isLoading }) {
  const [url, setUrl]           = useState("");
  const [urlError, setUrlError] = useState("");
  const inputRef                = useRef(null);

  const detectedPlatform = detectPlatformClient(url);
  const urlIsValid       = url.trim().length > 0 && isValidUrl(url.trim());
  const isSupported      = urlIsValid && detectedPlatform !== null;

  // ── Handlers ────────────────────────────────────────────────────────────────

  const handleChange = (e) => {
    setUrl(e.target.value);
    setUrlError(""); // clear error on new input
  };

  const handleClear = () => {
    setUrl("");
    setUrlError("");
    inputRef.current?.focus();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = url.trim();

    if (!trimmed) {
      setUrlError("Please paste a product URL.");
      return;
    }
    if (!isValidUrl(trimmed)) {
      setUrlError("That doesn't look like a valid URL. Make sure it starts with https://");
      return;
    }
    if (!detectedPlatform) {
      setUrlError("Unsupported platform. Please use an Amazon, Flipkart, Etsy, or eBay link.");
      return;
    }

    onCompare(trimmed);
  };

  // ── Render ───────────────────────────────────────────────────────────────────

  return (
    <div className="w-full max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="relative">

        {/* Link icon */}
        <LinkIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none z-10" />

        <input
          ref={inputRef}
          type="url"
          value={url}
          onChange={handleChange}
          placeholder="Paste a product link (Amazon, Flipkart, Etsy, eBay)..."
          className={`w-full pl-12 pr-36 py-4 text-base rounded-2xl border-2 bg-white shadow-sm
                      focus:outline-none focus:ring-4 transition-all placeholder-gray-400
                      ${urlError
                        ? "border-red-400 focus:border-red-500 focus:ring-red-100"
                        : isSupported
                          ? "border-green-400 focus:border-green-500 focus:ring-green-100"
                          : "border-gray-200 focus:border-violet-500 focus:ring-violet-100"
                      }`}
        />

        {/* Clear button */}
        {url && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-32 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors z-10"
          >
            <XMarkIcon className="h-5 w-5" />
          </button>
        )}

        {/* Submit button */}
        <button
          type="submit"
          disabled={isLoading || !url.trim()}
          className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1.5
                     bg-violet-600 hover:bg-violet-700 disabled:bg-violet-300
                     text-white px-4 py-2.5 rounded-xl text-sm font-semibold
                     transition-colors shadow-sm"
        >
          {isLoading ? (
            <>
              <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Comparing
            </>
          ) : (
            <>
              Compare
              <ArrowRightIcon className="h-3.5 w-3.5" />
            </>
          )}
        </button>
      </form>

      {/* ── Status row below the input ─────────────────────────────────────── */}
      <div className="mt-2.5 min-h-[24px] px-1">
        {/* Validation error */}
        {urlError && (
          <div className="flex items-center gap-1.5 text-xs text-red-600">
            <ExclamationCircleIcon className="h-4 w-4 shrink-0" />
            {urlError}
          </div>
        )}

        {/* Platform detected — green confirmation */}
        {!urlError && isSupported && (
          <div className={`inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1 rounded-full border ${detectedPlatform.bg}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${detectedPlatform.dot}`} />
            <span className={detectedPlatform.color}>{detectedPlatform.name} link detected</span>
            <CheckCircleIcon className={`h-3.5 w-3.5 ${detectedPlatform.color}`} />
          </div>
        )}

        {/* URL typed but platform not recognised */}
        {!urlError && url.trim().length > 10 && urlIsValid && !isSupported && (
          <div className="flex items-center gap-1.5 text-xs text-amber-600">
            <ExclamationCircleIcon className="h-4 w-4 shrink-0" />
            Supported platforms: Amazon · Flipkart · Etsy · eBay
          </div>
        )}
      </div>

      {/* ── Supported platform chips ───────────────────────────────────────── */}
      <div className="flex flex-wrap gap-2 mt-3 justify-center">
        {PLATFORM_PATTERNS.map((p) => (
          <span
            key={p.name}
            className={`text-xs px-3 py-1.5 rounded-full border font-medium ${p.bg} ${p.color}`}
          >
            {p.name}
          </span>
        ))}
      </div>
    </div>
  );
}
