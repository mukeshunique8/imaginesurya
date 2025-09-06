"use client";

import { ParallaxScroll } from "@/components/ui/aceternity/parallax-scroll";

export function ParallaxScrollDemo() {
  return <ParallaxScroll images={images} />;
}

const images = ["/landing/scroller/scroller1.jpg", "/landing/scroller/scroller1.jpg", "/landing/scroller/scroller1.jpg"];
