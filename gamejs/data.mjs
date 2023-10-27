import { createClient } from '@supabase/supabase-js';
import 'dotenv/config'

const supabase = createClient(process.env.api, process.env.Ckey)
const { word, error } = await supabase
    .from('gamewords')
    .select('*')

if (error == null) {
    console.log(`Retrieved word: ${word}`);
} else {
    console.log(error);
}