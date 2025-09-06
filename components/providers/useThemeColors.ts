"use client";

import { useEffect, useState } from "react";

// Define primary → secondary combos
const colorCombos: Record<string, string> = {
  // "#000000": "#6b7280", // black → gray
  "#3b82f6": "#bfdbfe", // blue → light blue
  "#ef4444": "#fecaca", // red → light red
  "#10b981": "#a7f3d0", // green → mint
  "#8b5cf6": "#ddd6fe", // violet → lavender
  "#f59e0b": "#fde68a", // amber → light amber
  "#ec4899": "#fbcfe8", // pink → light pink
  "#14b8a6": "#99f6e4", // teal → aqua
  "#9333ea": "#d8b4fe", // purple → lilac
  "#eab308": "#fef08a", // yellow → pale yellow
  "#f97316": "#fdba74", // orange → light orange
};

// List of primaries (keys of combos)
const colorPalette = Object.keys(colorCombos);

export function useThemeColors() {
  // Lazy init: load saved or fallback
  const [primary, setPrimary] = useState<string>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("primaryColor");
      if (saved) return saved;
    }
    return colorPalette[0];
  });

  const [secondary, setSecondary] = useState<string>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("secondaryColor");
      if (saved) return saved;
    }
    return colorCombos[colorPalette[0]];
  });

  // Apply CSS vars + persist
  useEffect(() => {
    if (primary) {
      const nextSecondary = colorCombos[primary] || "#6b7280";
      setSecondary(nextSecondary);

      document.documentElement.style.setProperty("--primary", primary);
      document.documentElement.style.setProperty("--secondary", nextSecondary);

      localStorage.setItem("primaryColor", primary);
      localStorage.setItem("secondaryColor", nextSecondary);
    }
  }, [primary]);

  // Cycle through colors
  const cycleColor = () => {
    const idx = colorPalette.indexOf(primary);
    const next = colorPalette[(idx + 1) % colorPalette.length];
    setPrimary(next);
  };

  return { primary, secondary, setPrimary, cycleColor, colorPalette };
}
