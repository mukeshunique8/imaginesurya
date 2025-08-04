// lib/validators/schemas/hero.ts
import { z } from "zod";

export const heroSectionSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  subtitle: z.string().min(3, "Subtitle must be at least 3 characters"),
  image: z.union([
    z.string().url("Must be a valid URL"), // For existing images
    z.literal("uploading..."), // Temporary state during upload
  ]),
});

export type HeroSection = z.infer<typeof heroSectionSchema>;
