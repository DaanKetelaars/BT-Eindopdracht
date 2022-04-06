// Requires
import express from 'express'
import fs from 'fs';
import methodOverride from 'method-override'
import 'dotenv/config'
import bodyParser from "body-parser";
import {
    v4 as uuidv4
} from 'uuid';

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



app.post('/', (req, res) => {
    let id;
    let newMatch = req.body.newMatch
    let match;

    let matches = [];
    const game = ({
        match: newMatch,
        id: uuidv4()
    })
    const matchesStr = fs.readFileSync('data.json', 'utf8');
    matches = JSON.parse(matchesStr)

    const duplicateMatches = matches.filter((game) => game.match === match);

    if (duplicateMatches.length === 0) {
        matches.push(game);
        fs.writeFileSync('data.json', JSON.stringify(matches, null, 4))
    }
    res.redirect('/')
})

app.get("/", (req, res) => {
    const data = fs.readFileSync('data.json', 'utf8');
    const newData = JSON.parse(data)
    console.log(newData);
    res.render('home', {
        newData,
        title: 'Home',
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
        title: 'Testing',
        newItem: newItem
    })
})


app.put('/match/:id', (req, res) => {
    let {
        id
    } = req.params;
    let newItem = []
    let updateData = []

    const data = fs.readFileSync('data.json', 'utf8');
    const newData = JSON.parse(data);

    updateData = newData;
    const foundIndex = updateData.findIndex(x => x.id == id);
    updateData[foundIndex].match = req.body.newMatch;

    fs.writeFileSync('data.json', JSON.stringify(updateData, null, 4))
    console.log(id);

    res.redirect(`/match/${id}`)
})



app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})