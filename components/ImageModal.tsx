"use client";
import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";

export function ImageModal({ imageUrl }: { imageUrl: string }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <img src={imageUrl} className="cursor-zoom-in hover:scale-105 transition-all duration-300 rounded-lg shadow" onClick={() => setOpen(true)} alt="" />
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="p-0 max-w-4xl bg-transparent shadow-none">
          <img src={imageUrl} className="w-full h-auto rounded-lg" alt="modal" />
        </DialogContent>
      </Dialog>
    </>
  );
}
