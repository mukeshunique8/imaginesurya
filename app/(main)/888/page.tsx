"use client";
import HeroSection from "@/components/user/home/HeroSection";
import { HeroScroll } from "@/components/user/home/HeroScroll";
import { ImagesSliderDemo } from "@/components/user/home/ImagesSliderDemo";
import { TabsDemo } from "@/components/user/home/TabsDemo";
import { CarouselDemo } from "@/components/user/home/CarouselDemo";
import { FaqSectionComponent } from "@/components/user/home/FAQ";

export default function Hero() {
  return (
    <div className="overflow-x-hidden">
      <HeroSection />
      <TabsDemo />
      <CarouselDemo />
      <HeroScroll />
      <FaqSectionComponent />
    </div>
  );
}
