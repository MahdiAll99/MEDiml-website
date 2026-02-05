"use client";

import React, { useState } from "react";
import { AlertTriangle, X } from "lucide-react";

export default function Banner() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="relative bg-amber-500/90 text-black">
      <div className="mx-auto flex max-w-7xl items-center justify-center gap-3 px-4 py-2.5 text-sm font-medium md:px-6">
        <AlertTriangle className="h-4 w-4 shrink-0" />
        <p className="text-center">
          <span className="font-bold">Note:</span> MEDiml was formerly known as{" "}
          <span className="font-bold">MEDimage</span>. Same great tool, new name!
        </p>
        <button
          onClick={() => setIsVisible(false)}
          className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full p-1 transition hover:bg-black/10 md:right-4"
          aria-label="Dismiss banner"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
