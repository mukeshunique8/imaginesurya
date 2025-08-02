import { Card, CardContent } from "@/components/ui/card";
import { ADMINROUTES } from "@/lib/data/routes";
import { FileText } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function Page() {
  const editRoutes = Object.entries(ADMINROUTES)
    .filter(([_, path]) => path.startsWith("/admin/dashboard/edit/"))
    .map(([key, path]) => {
      const name = key
        .replace("EDIT_", "")
        .replaceAll("_", " ")
        .toLowerCase()
        .replace(/^\w/, (c) => c.toUpperCase()); // Capitalize first letter
      return { name, path };
    });

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {editRoutes.map((item) => (
        <Link key={item.path} href={item.path}>
          <Card className="hover:shadow-lg transition-all cursor-pointer group">
            <CardContent className="p-5 flex items-center gap-4">
              <div className="p-3 rounded-full bg-primary text-white group-hover:scale-110 transition-transform">
                <FileText className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Edit</p>
                <p className="text-base font-medium">{item.name}</p>
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
}
