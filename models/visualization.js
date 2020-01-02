const mongoose = require('mongoose');

let visualizationSchema = new mongoose.Schema({
    title: String,
    thumbnail_url: String,
    url: String,
    description: String,
    date:  { type: Date, default: Date.now }
});

let Visualization = mongoose.model('Visualization', visualizationSchema);

module.exports = Visualization;
