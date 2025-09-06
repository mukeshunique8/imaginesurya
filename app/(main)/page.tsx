"use client";
import HeroSection from "@/components/user/home/HeroSection";
import { HeroScroll } from "@/components/user/home/HeroScroll";
import { TabsDemo } from "@/components/user/home/TabsDemo";
import { CarouselDemo } from "@/components/user/home/CarouselDemo";

export default function Hero() {
  return (
    <div className="overflow-x-hidden">
      <HeroSection />
      <CarouselDemo />
      <TabsDemo />
      <HeroScroll />
    </div>
  );
}
