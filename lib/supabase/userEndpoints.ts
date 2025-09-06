import { supabasePublicClient } from "@/app/utils/supabasePublicClient";
import { fallbackNavbar } from "../data/fallback";

export async function getNavbarConfig() {
  const { data, error } = await supabasePublicClient.from("navbar_config").select("*").order("created_at", { ascending: false }).limit(1).single();

  if (error || !data) {
    console.warn("Using fallback navbar:", error?.message);
    return fallbackNavbar;
  }

  return {
    logo: data.logo || fallbackNavbar.logo,
    menuItems: data.menu_items || fallbackNavbar.menuItems,
  };
}
