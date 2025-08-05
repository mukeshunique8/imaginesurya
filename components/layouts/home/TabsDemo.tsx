"use client";

import { Tabs } from "@/components/ui/aceternity/tabs";

export function TabsDemo() {
  const tabs = [
    {
      title: "Weddings",
      value: "weddings",
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-[var(--primary)] to-[color-mix(in_oklab,var(--primary)_80%,black)]">
          <p>Wedding Moments</p>
          <DummyContent src="https://images.unsplash.com/photo-1523413651479-597eb2da0ad6" />
        </div>
      ),
    },
    {
      title: "Bridal Shoots",
      value: "bridal",
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-[var(--primary)] to-[color-mix(in_oklab,var(--primary)_80%,black)]">
          <p>Elegant Bridal Portraits</p>
          <DummyContent src="https://images.unsplash.com/photo-1589987607627-07fbd3dbe6b3" />
        </div>
      ),
    },
    {
      title: "Outdoor",
      value: "outdoor",
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-[var(--primary)] to-[color-mix(in_oklab,var(--primary)_80%,black)]">
          <p>Natural Outdoor Scenes</p>
          <DummyContent src="https://images.unsplash.com/photo-1504198458649-3128b932f49b" />
        </div>
      ),
    },
    {
      title: "Events",
      value: "events",
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-[var(--primary)] to-[color-mix(in_oklab,var(--primary)_80%,black)]">
          <p>Corporate & Cultural Events</p>
          <DummyContent src="https://images.unsplash.com/photo-1520813792240-56fc4a3765a7" />
        </div>
      ),
    },
    {
      title: "Studio",
      value: "studio",
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-[var(--primary)] to-[color-mix(in_oklab,var(--primary)_80%,black)]">
          <p>Studio Portrait Sessions</p>
          <DummyContent src="https://images.unsplash.com/photo-1495567720989-cebdbdd97913" />
        </div>
      ),
    },
  ];

  return (
    <div className="h-[40rem] md:h-[40rem] [perspective:1000px] relative flex flex-col max-w-5xl mx-auto w-full items-start justify-start my-40 overflow-hidden">
      <Tabs tabs={tabs} />
    </div>
  );
}

const DummyContent = ({ src }: { src: string }) => {
  return <img src={src} alt="dummy image" width="1000" height="1000" className="object-cover object-left-top h-[60%]  md:h-[90%] absolute -bottom-10 inset-x-0 w-[90%] rounded-xl mx-auto" />;
};
