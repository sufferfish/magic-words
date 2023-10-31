const functions = require('@google-cloud/functions-framework');
const supa = require('@supabase/supabase-js');
require('dotenv').config();

functions.http('newword', async (req, res) => {
    let word: string = req.body.word;
    let hint: string = req.body.hint;
    let active: boolean = req.body.active;
});