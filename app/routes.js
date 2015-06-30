var Word = require('./models/word');

function getWords(res) {
    Word.find(function (err, words) {
        if (err)
            res.send(err)
        res.json(words);
    });
};

module.exports = function (app) {
    app.get('/api/words/:word', function (req, res) {
        Word.find({
            word:  new RegExp('.*'+req.params.word+'.*', "i")
        }, function (err, word) {
            if (err)
                res.send(err);
            res.json(word);
        });
    });

    app.get('/api/words', function (req, res) {
        getWords(res);
    });

    app.post('/api/word', function (req, res) {
        Word.create({
            word: req.body.word,
            explain: req.body.explain,
            type: req.body.type,
            groupId : req.body.groupId
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
};