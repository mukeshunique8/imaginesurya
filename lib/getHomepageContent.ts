// lib/getHomepageContent.ts
import { getPublicImageURL } from "./storage";
import { supabase } from "./supabaseClient";

export const getHomepageContent = async () => {
  const { data, error } = await supabase.from("homepage_content").select("*").order("created_at", { ascending: false }).single(); // assuming only 1 record

  if (error) throw new Error(error.message);

  const imageUrl = getPublicImageURL("photos", data.image_path);
  return { ...data, imageUrl };
};
