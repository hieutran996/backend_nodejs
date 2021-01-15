//lets require/import the mongodb native drivers.
var mongodb = require('mongodb');
const express = require('express');
const db = require('./config/db');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

//We need to work with "MongoClient" interface in order to connect to a mongodb server.
var MongoClient = mongodb.MongoClient;

MongoClient.connect(db.url, (err, database) => { 
    if (err) return console.log(err) 

    const data = database.db('database_nodejs') 

    require('./app/routes')(app, data);

    app.listen(process.env.PORT || 3000, function(){
        console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
    });
})
