const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());
const port = 3000;

const poke_list = require('../mockDB/pokemon_list.js');
console.log(poke_list);



app.listen(port, () => {
    console.log(`Server is listening to the port ${port}`)
})

app.get('/pokemons', (req, res) => {
    res.send(poke_list);
})


app.get('/pokemon', (req, res) => {

    try {
        const result = poke_list.filter(pokemon => {
            return pokemon.name.japanese === req.query.pname;
        });

        if (result.length > 0) {
            res.json(result);
        } else {
            res.status(404).json({ error: 'Pokemon not found' });
        }

    }
    catch (err) {
        console.log(err);
        res.status(500).send('Server Error');
    }
})
