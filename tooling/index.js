const functions = require('@google-cloud/functions-framework');
const supabase = require('@supabase/supabase-js');
require('dotenv').config();

async function postWord(word, hint, active) {
    const sb = createClient(process.env.URL, process.env.SERVICE);

    const { error } = await sb
        .from('gamewords')
        .insert([
            { word: word, hint: hint, active: active},
        ]);
    
    if (error === null) {
        return true;
    } else {
        return false;
    }
}

functions.http('newword', async (req, res) => {
    let word = req.body.word;
    let hint = req.body.hint;
    let active = req.body.active;
});