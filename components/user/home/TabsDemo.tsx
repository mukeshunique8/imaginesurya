"use client";

import { Tabs } from "@/components/ui/aceternity/tabs";

export function TabsDemo() {
  const tabs = [
    {
      title: "Weddings",
      value: "weddings",
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-foreground bg-background">
          <p>Wedding Moments</p>
          <DummyContent src="/landing/scroller/scroller1.jpg" />
        </div>
      ),
    },
    {
      title: "Bridal Shoots",
      value: "bridal",
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-foreground bg-background">
          <p>Elegant Bridal Portraits</p>
          <DummyContent src="/landing/scroller/scroller1.jpg" />
        </div>
      ),
    },
    {
      title: "Outdoor",
      value: "outdoor",
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-foreground bg-background">
          <p>Natural Outdoor Scenes</p>
          <DummyContent src="/landing/scroller/scroller1.jpg" />
        </div>
      ),
    },
    {
      title: "Events",
      value: "events",
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-foreground bg-background">
          <p>Corporate & Cultural Events</p>
          <DummyContent src="/landing/scroller/scroller1.jpg" />
        </div>
      ),
    },
    {
      title: "Studio",
      value: "studio",
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-foreground bg-background">
          <p>Studio Portrait Sessions</p>
          <DummyContent src="/landing/scroller/scroller1.jpg" />
        </div>
      ),
    },
  ];

  return (
    <div className="h-[20rem] md:h-[40rem] [perspective:1000px] relative  flex flex-col max-w-5xl mx-auto w-full  items-start justify-start my-20">
      <Tabs tabs={tabs} />
    </div>
  );
}

const DummyContent = ({ src }: { src: string }) => {
  return <img src={src} alt="dummy image" width="1000" height="1000" className="object-cover object-left-top  h-auto  md:h-[90%] absolute -bottom-10 inset-x-0 w-[90%] rounded-xl mx-auto" />;
};
