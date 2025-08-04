"use client";

import { useState, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { HeroSection, heroSectionSchema } from "@/lib/validators/schemas/hero";
import { showSuccess, showError } from "@/lib/helpers/swalHelper";

export default function EditHeroSection({ existing }: { existing?: HeroSection }) {
  const [uploading, setUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(existing?.image || "");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const form = useForm<HeroSection>({
    resolver: zodResolver(heroSectionSchema),
    defaultValues: {
      title: existing?.title || "",
      subtitle: existing?.subtitle || "",
      image: existing?.image || "",
    },
  });

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isDirty },
  } = form;

  async function onSubmit(data: HeroSection) {
    setUploading(true);

    try {
      let imageUrl = data.image;

      // Only upload if new file is selected
      if (selectedFile) {
        setValue("image", "uploading...", { shouldValidate: false });

        const formData = new FormData();
        formData.append("file", selectedFile);
        formData.append("folder", "hero");

        const uploadRes = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        if (!uploadRes.ok) {
          const { error } = await uploadRes.json();
          throw new Error(error || "Image upload failed");
        }

        const { url } = await uploadRes.json();
        imageUrl = url;
      }

      // Validate we have an image URL before proceeding
      if (!imageUrl || imageUrl === "uploading...") {
        throw new Error("Image is required");
      }

      const updateRes = await fetch("/api/hero/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, image: imageUrl }),
      });

      if (!updateRes.ok) {
        const { error } = await updateRes.json();
        throw new Error(error || "Failed to update hero section");
      }

      showSuccess("Hero section updated successfully!");
      reset({ ...data, image: imageUrl });
      setSelectedFile(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (err) {
      showError(err instanceof Error ? err.message : "Something went wrong");
      console.error(err);
    } finally {
      setUploading(false);
    }
  }

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      showError("Only image files are allowed");
      return;
    }

    setSelectedFile(file);
    setPreviewUrl(URL.createObjectURL(file));
  }

  function handleRemoveImage() {
    setSelectedFile(null);
    setPreviewUrl("");
    setValue("image", "", { shouldValidate: true });
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-xl">
      <div>
        <Label>Title *</Label>
        <Input {...register("title")} />
        {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
      </div>

      <div>
        <Label>Subtitle *</Label>
        <Textarea {...register("subtitle")} />
        {errors.subtitle && <p className="text-red-500 text-sm mt-1">{errors.subtitle.message}</p>}
      </div>

      <div>
        <Label>Image *</Label>
        <Input type="file" accept="image/*" onChange={handleImageChange} ref={fileInputRef} />
        {errors.image && <p className="text-red-500 text-sm mt-1">{errors.image.message}</p>}

        {previewUrl ? (
          <div className="mt-2 relative group">
            <img src={previewUrl} alt="Preview" className="w-full h-auto rounded-md shadow max-h-60 object-cover" />
            <button type="button" onClick={handleRemoveImage} className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded hover:bg-red-600 transition">
              Remove
            </button>
          </div>
        ) : existing?.image ? (
          <div className="mt-2 relative group">
            <img src={existing.image} alt="Current" className="w-full h-auto rounded-md shadow max-h-60 object-cover" />
            <div className="text-xs mt-1 text-gray-500">Current image (will be kept if no new image is selected)</div>
          </div>
        ) : null}
      </div>

      <Button type="submit" disabled={uploading || !isDirty} className="mt-4">
        {uploading ? "Saving..." : "Save Changes"}
      </Button>
    </form>
  );
}
