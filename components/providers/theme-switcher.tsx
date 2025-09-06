"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useThemeColors } from "@/components/providers/useThemeColors";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Palette } from "lucide-react";
import { motion } from "framer-motion";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <button onClick={toggleTheme} className="flex items-center justify-center cursor-pointer w-6 h-6 rounded-full  transition-colors text-primary ">
      <Sun className="h-[1.2rem] w-[1.2rem] transition-all dark:hidden" />
      <Moon className="h-[1.2rem] w-[1.2rem] transition-all hidden dark:block" />
      <span className="sr-only">Toggle theme</span>
    </button>
  );
}
export function ColorToggle() {
  const { primary, secondary, setPrimary, colorPalette } = useThemeColors();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="w-6 h-6 rounded-full bg-muted animate-pulse" />;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center justify-center cursor-pointer w-6 h-6 rounded-full transition-colors"
          style={{
            background: `linear-gradient(135deg, ${primary} 50%, ${secondary} 50%)`,
          }}
        >
          <Palette className="h-4 w-4 text-white" />
        </motion.div>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="p-2 grid grid-cols-5 gap-2">
        {colorPalette.map((color) => (
          <DropdownMenuItem key={color} className="p-0 flex items-center justify-center cursor-pointer rounded-full w-6 h-6" onClick={() => setPrimary(color)}>
            <div
              className="w-6 h-6 rounded-full border"
              style={{
                background: `linear-gradient(135deg, ${color} 50%, var(--secondary, #fff) 50%)`,
                borderColor: color === primary ? "black" : "transparent",
              }}
            />
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
