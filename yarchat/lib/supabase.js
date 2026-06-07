import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://tpeidrgkqcozxhsuyezs.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRwZWlkcmdrcWNvenhoc3V5ZXpzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA4MjE4OTYsImV4cCI6MjA5NjM5Nzg5Nn0.QPOmFN8jgbMfTL2SxfNawsXyHhIJHA-I6dcV5WPPZbk";

export const supabase = createClient(supabaseUrl, supabaseKey);