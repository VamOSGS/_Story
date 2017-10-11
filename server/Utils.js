const dbInfo = require('../config/db');
const User = require('./User');
const Content = require('./Content');
const mongoose = require('mongoose');
module.exports = {
    setUpConnection: function () {
        mongoose.connect(dbInfo.url, {
            useMongoClient: true
        })
    },
    getPosts: function () {
        return Content.find()
    },
    ContentAdding: function (data) {
        const newCont = new Content({
            User: data.User,
            Date: data.Date,
            Color: data.Color,
            Title: data.Title,
            Comments: data.Comments,
            Like: data.Like,
            Text: data.Text,
            Image: data.Image
        })
        return newCont.save();
    },
    LogIn: function (username) {
        const details = {'Username': username};
        return User.findOne(details);
    },
    Comment: function (data) {
        const details = { '_id': data.id };
        return Content.findOneAndUpdate(details, { $push: { Comments: {user: data.user, comment: data.comment}}})
    },
    Like: function (data) {
        const details = { '_id': data.id };
        return Content.findOneAndUpdate(details, { $push: { Like:  data.user }})
    },
    unLike: function (data) {
        const details = data.id;
        return Content.findByIdAndUpdate( details,  { $pull: { Like : {  _id: data.user._id } } });
    },
    AddUser: function (data) {
        const user = new User({
            Username: data.Username,
            FirstName: data.FirstName,
            LastName: data.LastName,
            Password: data.Password
        })
        return user.save();
    },
    listen: function (app) {
        app.listen(process.env.PORT || 3000, function () {
            console.log(`listening on ${process.env.PORT || 3000}`)
        })
    }
}