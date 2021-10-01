const express = require('express');
const Datastore = require('nedb');
const db = new Datastore();
const app = express(); // 
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

// READ (all) - RESTful GET
app.get('/product', (req,res) => {

    db.find({}, (err, products) => {

        if (err) res.send(err);
        
        res.status(200).send(products);

        console.log(`Reading all products:\n`);
        console.log(products);

    });

});

// READ - RESTful GET one product
app.get('/product/:id', (req,res) => {

    let prodId = req.params.id;

    db.find({_id:prodId}, (err, product) => {

        if (err) res.send(err);
        
        res.status(200).send(product);

        console.log(`Reading product:\n`);
        console.log(product);

    });

});

module.exports = {app};