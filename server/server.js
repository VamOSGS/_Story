const
    express = require('express'),
    path = require('path'),
    BodyParser = require('body-parser'),
    db = require('./Utils'),
    app = express();


db.listen(app)
db.setUpConnection();

app.use(express.static('../build/'))
app.use(BodyParser.json())
app.get('/', function (req, res) {
    res.sendFile(path.resolve('../build/index.html'))
});

app.post('/register', (req, res) => {
    db.AddUser(req.body).then(data => res.send(data))
})
app.get('/login/:username', (req, res) => {
    db.LogIn(req.params.username).then(data => {
        res.send(data)
    })
})
app.post('/content', (req, res) => {
    db.ContentAdding(req.body).then(data => res.send(data))
})
app.get('/content', (req, res) => {
    db.getPosts().then(data => {
        res.send(data)
    })
})


app.put('/comment', function (req, res) {
    db.Comment(req.body).then(data => {
        res.send(data)
    })
});
app.put('/like', function (req, res) {
    db.Like(req.body).then(data => {
        res.send(data)
    })
});
app.put('/unlike', function (req, res) {
    db.unLike(req.body).then(data => {
        res.send(data)
    })
});
