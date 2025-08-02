"use client";

import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export default function FullPageLoader({ className }: { className?: string }) {
  return (
    <div className={cn("fixed inset-0 z-50 flex items-center justify-center bg-white dark:bg-background", className)}>
      <Loader2 className="h-12 w-12 animate-spin text-primary" />
    </div>
  );
}
