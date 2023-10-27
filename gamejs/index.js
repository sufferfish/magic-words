const functions = require('@google-cloud/functions-framework');
const supa = require('@supabase/supabase-js');
require('dotenv').config();


async function getWord() {
    if (process.env.api === undefined || process.env.cKey === undefined) {
        throw supa.AuthApiError;
    }

    const supabase = supa.createClient(process.env.api, process.env.cKey);
    const { word, error } = await supabase
        .from('gamewords')
        .select('word')

    if (error == null) {
        console.log(`Retrieved word: ${word}`);
        return word;
    } else {
        console.log(error);
    }
}

functions.http('gameHandler', (req, res) => {
    let g = req.query.word;
    let w = getWord();

    console.log(w);

    if (g === w) {
        res.send(`You guessed the word! It was ${g}.`);
    } else if (g === undefined) {
        res.send("This is a test mode.")
    } else {
        res.send(`Sorry. The word ${g} is not correct.`)
    }
});