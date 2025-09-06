import { MacbookScroll } from "@/components/ui/aceternity/macbook-scroll";
import EmojiScroller from "@/components/ui/framer/EmojiScroller";
import React from "react";

export function HeroScroll() {
  return (
    <div className="w-full relative overflow-hidden">
      <aside className="hidden xl:block absolute top-0 left-[1%]">
        <EmojiScroller />
      </aside>
      <aside className="hidden xl:block absolute top-0 right-[1%]">
        <EmojiScroller />
      </aside>
      <MacbookScroll
        title={
          <span>
            Every Event Captured with Soul. <br />
            Delivered with Timeless Quality.
          </span>
        }
        badge={<a href="https://mukesh888.vercel.app/">{/* <Badge className="h-10 w-10 -rotate-12 transform" /> */}</a>}
        src={`/landing/scroller/scroller1.jpg`}
        showGradient={true}
      />
    </div>
  );
}
