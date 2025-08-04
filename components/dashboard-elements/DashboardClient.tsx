"use client";

import { useLayoutEffect, useRef } from "react";
import { DASHBOARD_HIGHLIGHTS } from "@/lib/data/dashboardHighlights";
import { Card, CardContent } from "@/components/ui/card";
import { Folder, Image, LucideIcon, Users, Calendar, HardDrive, Star, Clock, Camera } from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  image: Image,
  folder: Folder,
  users: Users,
  calendar: Calendar,
  star: Star,
  clock: Clock,
  camera: Camera,
};

const dummyStats = {
  photos: 1280,
  albums: 48,
  photographers: 5,
  bookings: 92,
  storage: "3.6GB",
  galleries: 12,
  approvals: 4,
  sessions: 3,
};

export default function DashboardClient() {
  const cardsRef = useRef<HTMLDivElement[]>([]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
      {DASHBOARD_HIGHLIGHTS.map((item, idx) => {
        const Icon = iconMap[item.icon] ?? Folder;
        return (
          <Card key={item.title} className="shadow-md hover:shadow-lg transition-all">
            <CardContent className="p-5 flex items-center gap-4">
              <div className={`p-3 rounded-full ${item.bg} text-white`}>
                <Icon className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">{item.title}</p>
                <p className="text-lg font-semibold text-foreground">{dummyStats[item.countKey as keyof typeof dummyStats]}</p>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
