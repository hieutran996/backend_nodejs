var ObjectID = require('mongodb').ObjectID;

module.exports = function(app, db) {
    app.get('/'),(req, res) => {
        if (err) { 
            res.send({ 'error': 'An error has occurred' }); 
        } else { 
            res.send('Hello World'); 
        }
    }
    // GET
    app.get('/users/:id', (req, res) => { 
        const id = req.params.id; 
        const params = { "_id": new ObjectID(id) };
        db.collection('users').findOne(params, (err, result) => { 
            if (err) { 
                res.send({ 'error': 'An error has occurred' }); 
            } else { 
                res.send(result); 
            } 
        }); 
    });
    // POST
    app.post('/users', (req, res) => { 
        const params = { name: req.body.name, age: req.body.age };
        db.collection('users').insert(params, (err, result) => { 
            if (err) { 
                res.send({ 'error': 'An error has occurred' }); 
            } else { 
                res.send(result.ops[0]); 
            } 
        }); 
    });
    // PUT
    app.put('/users/:id', (req, res) => { 
        const id = req.params.id; 
        const paramsID = { "_id": new ObjectID(id) };
        const paramsPUT = { name: req.body.name, age: req.body.age };
        db.collection('users').update(paramsID,paramsPUT, (err, result) => { 
            if (err) { 
                res.send({ 'error': 'An error has occurred' }); 
            } else { 
                res.send(paramsPUT);
            } 
        }); 
    });
    // DELETE
    app.delete('/users/:id', (req, res) => { 
        const id = req.params.id; 
        const params = { "_id": new ObjectID(id) };
        db.collection('users').remove(params, (err, result) => { 
            if (err) { 
                res.send({ 'error': 'An error has occurred' }); 
            } else { 
                res.send('Note ' + id + ' deleted!');
            } 
        }); 
    });
};
