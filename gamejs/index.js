const functions = require('@google-cloud/functions-framework');
const supa = require('@supabase/supabase-js');
require('dotenv').config();


async function getWord() {
    if (process.env.api === undefined || process.env.cKey === undefined) {
        throw supa.AuthApiError;
    }

    const supabase = supa.createClient(process.env.api, process.env.cKey);
    const { data, error } = await supabase
    .from('gamewords')
    .select('id, word, winner')
    .eq('is_guessed', 'false')
    .order('created_at', { ascending: true });

    let word = data[0]['word']
    let id = data[0]['id']
    let winner = data[0]['winner']

    if (error == null) {
        console.log(`Retrieved word: ${word}`);
        return [word, id, winner];
    } else {
        console.log(error);
    }
}

async function postWinner(winner, id) {
    const supabase = supa.createClient(process.env.api, process.env.cKey);
    const { error } = await supabase
    .from('gamewords')
    .update({is_guessed: 'true', winner: winner})
    .eq('id', id)

    // TODO: handle the errors
    if (error != null) {
        console.log(`Failed to post winner for id: ${id}`);
    } else {
        console.log(`Succeeded in posting winner for id: ${id}`);
    }
}

functions.http('gameHandler', (req, res) => {
    let g = req.query.word;
    let p = req.query.player;
    let wordandid = getWord();

    console.log(wordandid);

    if (g === undefined) {
        res.send("This is a test mode.")
    } else if (g != undefined && g.toLowerCase() === wordandid[0]) {
        postWinner(p, wordandid[1])
        res.send(`You guessed the word ${p}! It was ${g}.`);
    } else {
        res.send(`Sorry ${p}, the word ${g} is not correct.`)
    }
});