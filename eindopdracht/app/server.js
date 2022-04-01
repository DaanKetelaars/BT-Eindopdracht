// Requires
const express = require('express');
const path = require('path');
require('dotenv').config()
const bodyParser = require('body-parser')

const app = express();


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser({
    extended: false
}))
app.use(bodyParser.json())

let match = {}
let matches = []
let id = Math.random() * 10;
let newMatch = {}
let test = {}



app.post('/', (req, res) => {
    newMatch = req.body.newMatch;
    matches.push({
        match: Object.assign({}, newMatch),
        id: id
    });
    res.redirect("/");
});
app.get("/", (req, res) => {
    res.render('home', {
        matches: matches,
    });
});


app.get('/match/:id', (req, res) => {
    res.render('match', {
        title: 'Detail',
        matches: matches
    })
})


app.post('/match/:id', (req, res) => {
    newMatch = req.body.newMatch;

    bestaandeShit = JSON.parse(informatie.json);

    bestaandeShit.includes(vetteFnc => {
        if (id = id)
    })
    matches.push({
        match: Object.assign({}, newMatch),
        id: id
    });
})

app.get('/matches', (req, res) => {
    res.render('matches', {
        title: 'Matches',
        matches: matches
    })
})





module.exports = app;