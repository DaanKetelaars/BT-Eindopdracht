// Requires
const express = require('express');
const path = require('path');
require('dotenv').config()
const bodyParser = require('body-parser')
const {
    v4: uuidv4
} = require('uuid');

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
let id;
let newMatch = {}
let newArr;
let newItem = []




app.post('/', (req, res) => {
    newMatch = req.body.newMatch;
    id = uuidv4()
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
    newItem = matches.find(item => item.id === id)
    res.render('match', {
        title: 'Testing',
        newItem: newItem
    })
})


app.post('/match/:id', (req, res) => {
    const newMatch = req.body.newMatch
    console.log(typeof newItem);
    newArr = Object.keys(newItem).map(object => {
        if (object.id == id) {
            return {
                ...object,
                match: newMatch
            };
        }
        return object;
    });
})

app.get('/matches', (req, res) => {
    res.render('matches', {
        title: 'Matches',
        matches: newArr
    })
})





module.exports = app;