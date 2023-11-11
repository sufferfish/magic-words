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
    .eq('active', 'true')
    .order('created_at', { ascending: true });

    let word = data[0]['word']
    let id = data[0]['id']
    let winner = data[0]['winner']

    if (error == null) {
        console.log("Retrieved data");
        console.log(`Returning: ${id} | ${word} | ${winner}`);
        return [word, id, winner];
    } else {
        console.log(error);
    }
}

async function postWinner(winner, id) {
    const supabase = supa.createClient(process.env.api, process.env.service);
    console.log(`Attempting to update with winner as ${winner} and id as ${id}.`)
    const { error } = await supabase
    .from('gamewords')
    .update({
        is_guessed: true, 
        winner: winner})
    .eq('id', id);

    if (error != null) {
        console.log(`Failed to post winner for id: ${id}`);
        console.log(error)
    } else {
        console.log(`Succeeded in posting winner for id: ${id}`);
    }
}

functions.http('gameHandler', async (req, res) => {
    let guess = req.query.word;
    let player = req.query.player;
    let [word, id, winner] = await getWord();

    console.log(`Word pulled from url: ${guess}`);
    console.log(`Player pulled from url: ${player}`);

    if (guess === undefined) {
        res.send('Guess the secret word by using !guess followed by the word you want to submit. Ex: !guess Trevor');
    } else if (word === null && id === null && winner === null) {
        res.send(`Sorry ${player} but ${winner} has already guessed the word of the day.`)
    } else if (guess !== undefined && guess.toLowerCase() === word) {
        console.log("Updating database...");
        postWinner(player, id)
        res.send(`You guessed the word ${player}! It was ${guess}.`);
    } else {
        res.send(`Sorry ${player}, the word ${guess} is not correct.`)
    }
});