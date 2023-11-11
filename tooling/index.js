const functions = require('@google-cloud/functions-framework');
const supabase = require('@supabase/supabase-js');
require('dotenv').config();


async function validateWord(word) {
    const sb = supabase.createClient(process.env.URL, process.env.SERVICE);

    const { data, error } = await sb
        .from('gameword')
        .select(`count`)
        .eq('word', word);

    if (error === null) {
        return data[0].count === 0;
    } else {
        console.log('Unable to verify if word is already in table.');
        return false;
    }
}

async function postWord(word, hint, active) {
    const sb = supabase.createClient(process.env.URL, process.env.SERVICE);

    const { error } = await sb
        .from('gamewords')
        .insert([
            { word: word, hint: hint, active: active },
        ]);

    console.log(error);
    if (error !== null) {
        return true;
    } else {
        return false;
    }
}

functions.http('newWord', async (req, res) => {
    if (req.headers.authorization !== process.env.tKey) {
        res.sendStatus(401);
        return;
    }
    
    const { word, hint, active } = req.body;
    
    if (word === undefined || hint === undefined || active === undefined) {
        res.sendStatus(400);
        return;
    }
    
    console.log(`Received ${word} and "${hint}" and word status: ${active}.`);
    
    try {
        if (await validateWord(word)) {
            await postWord(word, hint, active);
            console.log(`Posted ${word} to the database.`);
            res.sendStatus(200);
        } else {
            console.log(`${word} already exists in the table.`);
            res.send(`Yo Tre, "${word}" is already in the table.`);
        }
    } catch (err) {
        console.error(`Failed to post ${word} with hint to the database.`);
        console.error(err);
        res.sendStatus(400);
    }
});