// Requires
import express from 'express'
import fs from 'fs';
import methodOverride from 'method-override'
import 'dotenv/config'
import bodyParser from "body-parser";
import {
    v4 as uuidv4
} from 'uuid';
import fetch from 'node-fetch';



const port = process.env.PORT || 3000

const app = express();

app.set('view engine', 'ejs');
app.set('views', './views');

app.use(express.static('public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(methodOverride(function (req, res) {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
        // look in urlencoded POST bodies and delete it
        var method = req.body._method
        delete req.body._method
        return method
    }
}))




app.get("/", (req, res) => {
    res.render('login')
});


app.post('/home', (req, res) => {

    let newMatch = req.body.newMatch
    let newScore = req.body.newScore
    let match;

    let matches = [];
    const game = ({
        match: newMatch,
        score: newScore,
        id: uuidv4()
    })
    const matchesStr = fs.readFileSync('data.json', 'utf8');
    matches = JSON.parse(matchesStr)

    const duplicateMatches = matches.filter((game) => game.match === match);

    if (duplicateMatches.length === 0) {
        matches.push(game);
        fs.writeFileSync('data.json', JSON.stringify(matches, null, 4))
    }
    res.redirect('/home')
})

app.get("/home", (req, res) => {
    const data = fs.readFileSync('data.json', 'utf8');
    const newData = JSON.parse(data)
    res.render('home', {
        newData,
        title: 'Voeg een match toe',
    });
});

app.get('/match/:id', (req, res) => {
    let {
        id
    } = req.params;
    let newItem = []




    const data = fs.readFileSync('data.json', 'utf8');
    const newData = JSON.parse(data);

    for (let index = 0; index < newData.length; index++) {
        newItem = newData.find(item => item.id === id);
    }

    res.render('match', {
        newItem: newItem,
    })
})


app.put('/match/:id', (req, res) => {
    let {
        id
    } = req.params;
    let updateData = []

    const data = fs.readFileSync('data.json', 'utf8');
    const newData = JSON.parse(data);

    updateData = newData;
    const foundIndex = updateData.findIndex(x => x.id == id);
    updateData[foundIndex].match = req.body.newMatch;
    updateData[foundIndex].score = req.body.newScore;

    fs.writeFileSync('data.json', JSON.stringify(updateData, null, 4))
    res.redirect(`/match/${id}`)
})


app.get("/matches", (req, res) => {
    const data = fs.readFileSync('data.json', 'utf8');
    const newData = JSON.parse(data)
    res.render('matches', {
        newData,
        title: 'Matches',
    });
});


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})