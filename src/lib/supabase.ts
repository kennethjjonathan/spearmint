import CONSTANTS from "@/constants/constants";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
export const supabase = createClientComponentClient({supabaseUrl: CONSTANTS.SUPABASE_URL, supabaseKey: CONSTANTS.SUPABASE_ANON_KEY});
