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

module.exports = {app};