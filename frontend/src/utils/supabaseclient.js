import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://qjtodrcavgnvvhbjaexz.supabase.co'
const supabaseKey = 'sb_publishable_BvQYGij0YREiLmS3TTxhVg_07Yfe5qn'

export const supabase = createClient(supabaseUrl, supabaseKey)