const express = require('express');
const Datastore = require('nedb');
const db = new Datastore();
const app = express(); // 
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

module.exports = {app};