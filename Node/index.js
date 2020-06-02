// to run: navigate to folder > "node index.js"

var express = require('express');
var app = express();

var Animal = require('./Animal.js');
var Toy = require('./Toy.js');

/*
app.use('/', (req, res) => {
	res.json({ msg : 'It works!' });
});
*/

app.use('/findToy', (req, res) => {
    var id = req.query.id;
    Toy.findOne({id: id}, (err, toy) => {
        if (err) {
            res.status(500);
            res.json({error: err});
        } else if (toy) {
            res.status(200);
            res.json(toy);
        } else {
            res.status(200);
            res.json({});
        }
    });
});

app.use('/findAnimals', (req, res) => {
    var query = {};
    if (req.query.species) query.species = req.query.species;
    if (req.query.trait) query.traits = req.query.trait;
    if (req.query.gender) query.gender = req.query.gender;
    Animal.find(query, (err, animals) => {
        if (err) {
            res.status(500);
            res.json({error: err});
        } else if (Object.keys(query).length > 0) {
            res.status(200);
            res.json(animals.map(animal => ({
                name: animal.name,
                species: animal.species,
                breed: animal.breed,
                gender: animal.gender,
                age: animal.age
            })));
        } else {
            res.status(200);
            res.json([]);
        }
    });
});

app.use('/animalsYoungerThan', (req, res) => {
    var age = (req.query.age && !isNaN(req.query.age)) ? req.query.age : -1;
    Animal.find({age: {$lt: age}}, (err, animals) => {
        if (err) {
            res.status(500);
            res.json({error: err});
        } else if (animals.length > 0) {
            res.status(200);
            res.json({
                count: animals.length,
                names: animals.map(animal => animal.name)
            });
        } else if (age !== -1) {
            res.status(200);
            res.json({count: 0});
        } else {
            res.status(200);
            res.json({});
        }
    });
});

app.use('/calculatePrice', (req, res) => {
    var id = req.query.id;
    var qty = req.query.qty;
    var total_qty = {};
    if (id && qty && id.length === qty.length) {
        for (var i = 0; i < id.length; i++) {
            if (!isNaN(qty[i])) {
                if (total_qty.hasOwnProperty(id[i])) {
                    total_qty[id[i]] += parseInt(qty[i]);
                } else {
                    total_qty[id[i]] = parseInt(qty[i]);
                }
            }
        }
        Toy.find({id: {$in: Object.keys(total_qty)}}, (err, toys) => {
            if (err) {
                res.status(500);
                res.json({error: err});
            } else {
                var items = toys.map(toy => ({
                    item: toy.id,
                    qty: total_qty[toy.id],
                    subtotal: total_qty[toy.id] * toy.price
                }));
                var totalPrice = 0;
                items.forEach(item => {
                    totalPrice += item.subtotal;
                });
                res.status(200);
                res.json({
                    totalPrice: totalPrice,
                    items: items
                });
            }
        });
    } else {
        res.status(200);
        res.json({});
    }
});

app.listen(3000, () => {
	console.log('Listening on port 3000');
});



// Please do not delete the following line; we need it for testing!
module.exports = app;