"use client";
import HeroSection from "@/components/layouts/home/HeroSection";
import { HeroScroll } from "@/components/layouts/home/HeroScroll";
import { ImagesSliderDemo } from "@/components/layouts/home/ImagesSliderDemo";
import { TabsDemo } from "@/components/layouts/home/TabsDemo";
import { ParallaxScrollDemo } from "@/components/layouts/home/ParallaxScrollDemo";

export default function Hero() {
  return (
    <div className="overflow-x-hidden">
      <HeroSection />
      <ImagesSliderDemo />
      <ParallaxScrollDemo />
      <TabsDemo />
      <HeroScroll />
    </div>
  );
}
