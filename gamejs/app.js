const functions = require('@google-cloud/functions-framework');

functions.http('gameHandler', (req, res) => {
    let g = req.query.word
    let w = "puff"

    if (g === w.toLowerCase()) {
        res.send(`You guessed the word! It was ${g}.`);
    } else if (g === "") {
        res.send("This is a test mode.")
    } else {
        res.send(`Sorry. The word ${g} is not correct.`)
    }
});