import { createClient } from '@supabase/supabase-js';
import 'dotenv/config'

const supabase = createClient(process.env.api, process.env.service)
// const { data, error } = await supabase
//     .from('gamewords')
//     .select('id, word, winner')
//     .eq('is_guessed', 'false')
//     .order('created_at', { ascending: true })

const { data, error } = await supabase
    .from('gamewords')
    .select(`count`)
    .eq('word', 'goboingo');

// let info = data[0];
if (error == null) {
    console.log(data[0].count);
} else {
    console.log(error);
}