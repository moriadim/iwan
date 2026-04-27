"use server";

import { createClient } from "@/lib/supabase/server";

const ALLOWED_TYPES = ["application/pdf", "image/jpeg", "image/png", "image/webp"];
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

/**
 * Server Action for secure file upload (Mission 1 Compliance)
 * Validates file type and size before interacting with Supabase Storage (Unstructured Data)
 */
export async function uploadIdDocument(formData: FormData) {
  const supabase = await createClient();
  const file = formData.get("file") as File;

  if (!file) {
    return { error: "No file provided" };
  }

  // 1. Validate File Type (Mission 1 Security)
  if (!ALLOWED_TYPES.includes(file.type)) {
    return { error: "Invalid file type. Only PDF and Images are allowed." };
  }

  // 2. Validate File Size
  if (file.size > MAX_FILE_SIZE) {
    return { error: "File too large. Maximum size is 5MB." };
  }

  const { data: userData, error: userError } = await supabase.auth.getUser();
  if (userError || !userData.user) {
    return { error: "Unauthorized access" };
  }

  const userId = userData.user.id;
  const fileName = `${userId}/${Date.now()}_${file.name}`;

  // 3. Upload to Supabase Storage (Unstructured Data)
  const { data, error } = await supabase.storage
    .from("id-documents")
    .upload(fileName, file);

  if (error) {
    return { error: `Upload failed: ${error.message}` };
  }

  return { success: true, path: data.path };
}
