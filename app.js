const express = require('express');
const Datastore = require('nedb');
const db = new Datastore();
const app = express(); // 
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

// createProduct function
createProduct = (pName, pDescription, pPrice) => {

    let product = {
        name: pName,
        description: pDescription,
        price: pPrice
    };

    return product;
}

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

// CREATE
app.post('/newProduct', (req, res) => {

    let newProduct = createProduct(req.body.name, req.body.description, req.body.price)

    // let newProduct = {
    //     name: req.body.name,
    //     description: req.body.description,
    //     price: req.body.price
    // };

    db.insert(newProduct, (err, product) => {

        if (err) res.send(err);
        
        res.status(200).send(product);

        console.log(`Adding product:\n`);
        console.log(product);

    });


});

// DELETE one - RESTful DELETE
app.delete('/product/delete/:id', (req, res) => {
    
    let prodId = req.params.id;

    console.log(`Deleting product by id: ${prodId} \n`);

    db.remove({_id: prodId}, (err, product)=> {
        if (err) res.send(err);

        res.sendStatus(204);
        console.log("Successfully deleted")
    })
});

// UPDATE - RESTful UPDATE
app.put('/product/update/:id', (req, res) => {
    
    let prodId = req.params.id;

    let updatedProduct = {
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        _id: prodId
    };

    console.log(`Updating product by id: ${prodId} \n`);

    db.update({_id: prodId}, updatedProduct, (err, product)=> {
        if (err) res.send(err);

        res.sendStatus(200).send(updatedProduct);
        console.log("Successfully updated");
    })
});


module.exports = {app, createProduct};