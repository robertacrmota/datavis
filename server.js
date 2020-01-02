const mongoose = require('mongoose');
const express = require('express');
const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

// DB --------------------------------------------------------------
const Visualization = require('./models/visualization');
const seed = require('./seed_db');

// set db configurations
mongoose.set('useNewUrlParser', true);

// connect db
mongoose.connect('mongodb://localhost/datavisApp')
.then(() => {
    console.log("db connection established successfully.");

    // seed db
    seed();
})
.catch((err) => {
    console.log("Error on db connection: " + err.message);
});

// HTTP REQUESTS -------------------------------------------------------
app.all('*', function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
  });

app.get('/', (req, res) => {
    // retrieve all visualizations from the db
    Visualization.find({}, (err, visualizations) => {
        if (err) {console.log(err); res.redirect("back");}
        else {
            res.render('home', {visualizations: visualizations});
        }
    })
    
});

// SERVER LISTENER -----------------------------------------------------
app.listen(port, () => console.log(`Server app listening on port ${port}!`));







