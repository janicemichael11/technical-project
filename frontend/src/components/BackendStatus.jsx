// components/BackendStatus.jsx
// Pings the backend health endpoint on mount and shows a small status pill.
// Helps developers immediately see if the backend is reachable.

import { useState, useEffect } from "react";
import { healthService } from "../services/api";

export default function BackendStatus() {
  // "checking" | "online" | "offline"
  const [status, setStatus] = useState("checking");

  useEffect(() => {
    healthService
      .check()
      .then(() => setStatus("online"))
      .catch(() => setStatus("offline"));
  }, []);

  if (status === "checking") {
    return (
      <div className="flex items-center gap-2 text-xs text-gray-400 bg-gray-50
                      border border-gray-200 rounded-xl px-4 py-2 w-fit mb-6">
        <span className="w-2 h-2 rounded-full bg-gray-300 animate-pulse" />
        Connecting to backend...
      </div>
    );
  }

  if (status === "offline") {
    return (
      <div className="flex items-center gap-2 text-xs text-red-700 bg-red-50
                      border border-red-200 rounded-xl px-4 py-2 w-fit mb-6">
        <span className="w-2 h-2 rounded-full bg-red-500" />
        Backend offline — run <code className="font-mono mx-1 bg-red-100 px-1 rounded">npm run dev:server</code>
        in your terminal
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2 text-xs text-green-700 bg-green-50
                    border border-green-200 rounded-xl px-4 py-2 w-fit mb-6">
      <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
      Backend connected — ready to compare prices
    </div>
  );
}
