import { createClient } from '@supabase/supabase-js';
import 'dotenv/config'

const supabase = createClient(process.env.api, process.env.Ckey)
const { data, error } = await supabase
    .from('gamewords')
    .select('id, word, winner')
    .eq('is_guessed', 'false')
    .order('created_at', { ascending: true })

let info = data[0];
if (error == null) {
    console.log(info)
} else {
    console.log(error);
}