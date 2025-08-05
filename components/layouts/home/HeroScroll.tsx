import { MacbookScroll } from "@/components/ui/aceternity/macbook-scroll";
import EmojiScroller from "@/components/ui/framer/EmojiScroller";
import React from "react";

export function HeroScroll() {
  return (
    <div className="w-full relative overflow-hidden">
      <aside className="hidden xl:block  absolute top-0 left-[5%]">
        <EmojiScroller />
      </aside>
      <aside className="hidden xl:block  absolute top-0 right-[5%]">
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
        src={`https://images.unsplash.com/photo-1482189349482-3defd547e0e9?q=80&w=2848&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D`}
        showGradient={true}
      />
    </div>
  );
}
