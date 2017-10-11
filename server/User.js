const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.Promise = require('bluebird');
const userSchema = new Schema({
    Username: { type: String, required: true },
    FirstName: { type: String, required: true},
    LastName: { type: String, required: true },
    Password: { type: String, required: true }
});

const User = mongoose.model('User', userSchema);

module.exports = User;