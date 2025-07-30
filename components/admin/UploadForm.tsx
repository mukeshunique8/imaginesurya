"use client";

import { useState, useRef } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Swal from "sweetalert2";

export default function UploadForm({ userId }: { userId: string }) {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const sanitizeFilename = (filename: string) => {
    return filename
      .replace(/[^\w.-]/g, "_")
      .replace(/\s+/g, "_")
      .replace(/_{2,}/g, "_");
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    setFile(selectedFile);

    // Create image preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(selectedFile);
  };

  const clearSelection = () => {
    setFile(null);
    setPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    setLoading(true);
    const now = new Date();
    const formattedDate = now.toISOString().slice(0, 10).replace(/-/g, "");
    const sanitizedFilename = sanitizeFilename(file.name);
    const filePath = `photos/${formattedDate}_${Date.now()}-${sanitizedFilename}`;

    try {
      const { error } = await supabase.storage.from("photos").upload(filePath, file);

      if (error) throw error;

      await Swal.fire({
        title: "Success!",
        text: "Image uploaded successfully",
        icon: "success",
        confirmButtonText: "OK",
      });

      clearSelection();
    } catch (error) {
      await Swal.fire({
        title: "Upload Failed",
        text: error instanceof Error ? error.message : "An error occurred",
        icon: "error",
        confirmButtonText: "OK",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-4 max-w-sm">
      <Input type="file" accept="image/*" ref={fileInputRef} onChange={handleFileChange} />

      {preview && (
        <div className="relative mt-2">
          <img src={preview} alt="Preview" className="rounded-md max-h-60 object-contain border" />
          <Button variant="ghost" size="sm" className="absolute top-2 right-2 bg-red-600" onClick={clearSelection}>
            ✕ Clear
          </Button>
        </div>
      )}
      {file && (
        <Button onClick={handleUpload} disabled={loading || !file} className="w-full">
          {loading ? "Uploading..." : "Upload Photo"}
        </Button>
      )}
    </div>
  );
}
