// Your project's address and public (publishable) key from Supabase → Settings → API Keys
const SUPABASE_URL = "https://ufziathygtqlbjapwkrn.supabase.co";
const SUPABASE_KEY = "sb_publishable_Ss4cLwL-E-TAi9flBL_PLg_ACx49RlI";

// The connection every other file will use
const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

console.log("Supabase connected:", supabaseClient);