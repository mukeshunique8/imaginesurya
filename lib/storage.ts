import { supabase } from "./supabaseClient";

export async function listImagesFromBucket(bucket: string, folder = "") {
  const { data, error } = await supabase.storage.from(bucket).list(folder, {
    limit: 100,
    offset: 0,
    sortBy: { column: "name", order: "asc" },
  });

  if (error) throw new Error(error.message);
  return data?.filter((item) => item.metadata && item.name) || [];
}

export function getImageURL(bucket: string, path: string) {
  return supabase.storage.from(bucket).getPublicUrl(path).data.publicUrl;
}
export function getPublicImageURL(bucket: string, path: string) {
  return supabase.storage.from(bucket).getPublicUrl(path).data.publicUrl;
}

export async function getRandomImageURL(bucket: string, folder = "") {
  const images = await listImagesFromBucket(bucket, folder);
  if (!images.length) return null;
  const random = images[Math.floor(Math.random() * images.length)];
  return getPublicImageURL(bucket, folder ? `${folder}/${random.name}` : random.name);
}
