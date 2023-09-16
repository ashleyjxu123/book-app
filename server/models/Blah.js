const mongoose = require('mongoose');
const BlahSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    num: {
        type: Number,
        require: true
    },
});

const Blah = new mongoose.model('blah', BlahSchema, 'blah');
module.exports = { Blah };