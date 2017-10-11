const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.Promise = require('bluebird');
const conentSchema = new Schema({
    User: { type: Object, required: true },
    Comments: { type: Array },
    Like: { type: Array  },
    Date: { type: String, required: true},
    Title: { type: String, required: true },
    Color: { type: String },
    Text: { type: String },
    Image: { type: String }
});

const User = mongoose.model('Content', conentSchema);

module.exports = User;