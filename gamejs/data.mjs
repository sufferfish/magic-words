import { createClient } from '@supabase/supabase-js';
import 'dotenv/config'

const supabase = createClient(process.env.api, process.env.Ckey)
const { data, error } = await supabase
    .from('gamewords')
    .select('id, word')
    .eq('is_guessed', 'false')
    .order('created_at', { ascending: true })

if (error == null) {
    console.log(data)
} else {
    console.log(error);
}