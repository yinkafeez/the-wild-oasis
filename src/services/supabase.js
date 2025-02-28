import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://ldelngkjuvfaipopkypg.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxkZWxuZ2tqdXZmYWlwb3BreXBnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzgwNzQ5NDgsImV4cCI6MjA1MzY1MDk0OH0.t0RbhAPbtfz1Me4NFJpTv_VYqU1LncKzVNEbQQXl318";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
