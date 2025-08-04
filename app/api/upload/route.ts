// app/api/upload/route.ts
import { NextRequest, NextResponse } from "next/server";
import { supabaseServerClient } from "@/app/utils/supabaseServerClient";
import sharp from "sharp";
import { v4 as uuid } from "uuid";

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const file = formData.get("file") as File;
  const folder = formData.get("folder") as string;

  if (!file || !folder) {
    return NextResponse.json({ error: "Missing file or folder" }, { status: 400 });
  }

  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  const webpBuffer = await sharp(buffer).webp().toBuffer();

  const filename = `sections/hero/${uuid()}.webp`;

  const supabase = supabaseServerClient();
  const { error } = await supabase.storage.from("public-assets").upload(filename, webpBuffer, {
    contentType: "image/webp",
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const { data: urlData } = supabase.storage.from("public-assets").getPublicUrl(filename);
  return NextResponse.json({ url: urlData.publicUrl });
}
