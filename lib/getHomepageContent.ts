// lib/getHomepageContent.ts
import { supabasePublicClient } from "@/app/utils/supabasePublicClient";
import { getPublicImageURL } from "./storage";

export const getHomepageContent = async () => {
  const { data, error } = await supabasePublicClient.from("homepage_content").select("*").order("created_at", { ascending: false }).single(); // assuming only 1 record

  if (error) throw new Error(error.message);

  const imageUrl = getPublicImageURL("photos", data.image_path);
  return { ...data, imageUrl };
};
