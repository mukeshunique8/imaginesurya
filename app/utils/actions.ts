// app/actions/hero/updateHeroSection.ts
"use server";

import { HeroSection, heroSectionSchema } from "@/lib/validators/schemas/hero";
import { supabaseServerClient } from "./supabaseServerClient";

export async function updateHeroSection(data: HeroSection) {
  const supabase = supabaseServerClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError) throw new Error("Failed to fetch user");
  // console.log(user);
  if (!user || user.role !== "authenticated") throw new Error("Unauthorized");

  const parsed = heroSectionSchema.safeParse(data);
  if (!parsed.success) throw new Error("Invalid data");

  const { error } = await supabase.from("homepage_sections").upsert([{ type: "hero", data }], { onConflict: "type" });

  if (error) throw new Error(error.message);
}
