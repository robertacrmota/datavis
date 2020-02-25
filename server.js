/*
NEXT: NAVBAR,
      CREATE, EDIT, DELETE VISUALIZATION
*/
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(express.static(__dirname + '/public'));
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

// DB --------------------------------------------------------------
const Visualization = require('./models/visualization');
const seed = require('./seed_db');

// set db configurations
mongoose.set('useNewUrlParser', true);

// connect db
mongoose.connect('mongodb://localhost/datavisApp')
.then(() => {
    console.log("db connection established successfully.");
    seed();
})
.catch((err) => {
    console.log("Error on db connection: " + err.message);
});

// HTTP REQUESTS -------------------------------------------------------
const BookRouter = require('./routes/book');
const ChartRouter = require('./routes/chart');

app.use("/books", BookRouter);
app.use("/vis", ChartRouter);

// app.all('*', function(req, res, next) {
//     res.header('Access-Control-Allow-Origin', '*');
//     res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
//     res.header('Access-Control-Allow-Headers', 'Content-Type');
//     next();
//   });

app.get('/', (req, res) => {
    res.redirect('/vis');
});


// SERVER LISTENER -----------------------------------------------------
app.listen(port, () => console.log(`Server app listening on port ${port}!`));







