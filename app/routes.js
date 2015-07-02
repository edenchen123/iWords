var Word = require('./models/word');

function getWords(res) {
    Word.find(function (err, words) {
        if (err)
            res.send(err)
        res.json(words);
    });
};

function checkAuth(req, res, next) {
    if (!req.session.user_id) {
        res.status(403).send('Permission Denied!');
    } else {
        next();
    }
}

module.exports = function (app) {
    app.post('/login', function (req, res) {
        var post = req.body;
        if ((post.username === 'eden' && post.password === '4321') || (post.username === 'susie' && post.password === '4321')) {
            req.session.user_id = post.username;
            res.redirect('/iwords');
        } else {
            res.redirect('/iwords/login');
        }
    });
    app.get('/logout', function (req, res) {
        delete req.session.user_id;
        res.redirect('/iwords/login');
    });

    app.get('/api/words/:word', checkAuth, function (req, res) {
        Word.find({$or:[{
            word:  new RegExp('.*'+req.params.word+'.*', "i")
        },{
            explain:  new RegExp('.*'+req.params.word+'.*', "i")
        }]}, function (err, word) {
            if (err)
                res.send(err);
            res.json(word);
        });
    });

    app.get('/api/words',checkAuth, function (req, res) {
        getWords(res);
    });

    app.post('/api/word', checkAuth,function (req, res) {
        Word.create({
            word: req.body.word,
            explain: req.body.explain,
            type: req.body.type,
            groupId : req.body.groupId,
            user : req.body.user
        }, function (err, word) {
            if (err)
                res.send(err);
            getWords(res);
        });

    });

    // delete a todo
    app.delete('/api/todos/:todo_id', function (req, res) {
        Todo.remove({
            _id: req.params.todo_id
        }, function (err, todo) {
            if (err)
                res.send(err);

            getTodos(res);
        });
    });

    app.get('/iwords/login', function(req, res) {
        res.sendfile('./public/login.html'); // load the single view file (angular will handle the page changes on the front-end)
    });
};