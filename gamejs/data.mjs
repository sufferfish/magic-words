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
    .update({
        is_guessed: true,
        winner: "sufferinfish"
    })
    .eq('id', 3)

// let info = data[0];
if (error == null) {
    console.log('Successfully posted.');
    console.log(data);
} else {
    console.log(error);
}