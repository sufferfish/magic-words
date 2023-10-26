import { createClient } from '@supabase/supabase-js';
import 'dotenv/config'

const supabase = createClient(process.env.api, process.env.Ckey)

const { data, error } = await supabase
    .from('gamewords')
    .select('*')

if (error == null) {
    console.log(data)
} else {
    console.log(error)
}