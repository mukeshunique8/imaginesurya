// components/HeroSection.tsx
"use client";

import { useEffect, useState } from "react";
import { supabasePublicClient } from "@/app/utils/supabasePublicClient";

export default function HeroSection() {
  const [hero, setHero] = useState<any>(null);

  useEffect(() => {
    const fetchHero = async () => {
      const { data } = await supabasePublicClient.from("homepage_sections").select("*").eq("type", "hero").single();
      setHero(data?.data);
    };

    fetchHero();
  }, []);

  if (!hero)
    return (
      <>
        <p className="bg-red-400">asdbaosdoasb d</p>
      </>
    );

  return (
    <section className="py-12 text-center">
      <h1 className="text-4xl font-bold">{hero.title}</h1>
      <p className="text-lg text-muted-foreground mt-2">{hero.subtitle}</p>
      {hero.image && <img src={hero.image} alt="Hero" className="mx-auto mt-6 w-full max-w-3xl rounded-lg" />}
    </section>
  );
}
