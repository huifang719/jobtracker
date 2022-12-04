import { createClient } from '@supabase/supabase-js'

// Create a single supabase client for interacting with your database
const supabase = createClient('https://odftmhqaowgjjzvtkhfv.supabase.co', process.env.REACT_APP_SUPABASE_API_KEY)

export default supabase