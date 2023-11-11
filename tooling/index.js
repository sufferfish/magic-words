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
    let word = req.body.word;
    let hint = req.body.hint;
    let active = req.body.active;

    if (req.headers.authorization === process.env.tKey) {

        if (word === undefined || hint === undefined || active === undefined) {
            res.sendStatus(400);
        } else {
            console.log(`Received ${word} and "${hint}" and word status: ${active}.`);
            
            let err;

            if (await validateWord(word)) {
                err = postWord(word, hint, active);

                if (!err) {
                    console.log(`Failed to post ${word} with hint to database.`);
                    console.log(err);
                    res.sendStatus(400);
                } else {
                    console.log(`Posted ${word} to database.`);
                    res.sendStatus(200);
                }
            } else {
                console.log(`${word} already exists in table.`);
                res.send(`Yo Tre, "${word}" is already in table.`);
            }

        }
    } else {
        res.sendStatus(401);
    };
});