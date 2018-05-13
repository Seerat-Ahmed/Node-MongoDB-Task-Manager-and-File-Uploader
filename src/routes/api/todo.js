const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Todo = require('../../model/Todo');
const formidable = require('formidable');
const path = require('path');
const jwt = require('jsonwebtoken');
const fs = require('fs');


/**
 * Verify Token
 */
function verifyToken(req, res, next) {

    const bearerHeader = req.headers['authorization'];

    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        req.token = bearerToken;
        next();
    }
    else {
        res.status(403);
        res.end('forbidden');
    }
}

/**
 * Creating Todo
 */
router.post('/api/todo', verifyToken, (req, res) => {
    console.log(req.token)
    jwt.verify(req.token, 'key', (error, data) => {
        if (!error) {
            Todo.create(req.body, (error, todo) => {
                if (error) {
                    res.status(400);
                    res.end(error);
                }
                else {
                    res.status(201);
                    res.send(JSON.stringify(todo));
                    res.end('todo');
                }
            });
        }
        else {
            res.status(403);
            res.end();
            console.log(error.message);
        }
    });

});



/**
 * List
 */
router.get('/api/todo', verifyToken, (req, res) => {
    jwt.verify(req.token, 'key', (error, data) => {
        if (!error) {
            Todo.find({})
                .then((todos) => {
                    res.status(200);
                    res.end(JSON.stringify(todos));
                })
                .catch((error) => {
                    res.end(error);
                });
        }
        else {
            res.status(403);
            res.end();
            console.log(error.message);
        }
    });

});



/**
 * Retrieve
 */
router.get('/api/todo/:todoId', verifyToken, (req, res) => {
    if (!error)
        Todo.findById(req.params.todoId)
            .then((todo) => {
                res.status(200);
                res.send(JSON.stringify(todo));
                res.end();
            })
            .catch((error) => {
                res.status(500);
                res.send(error.message);
                res.end();
            });
    else {
        res.status(200);
        res.end();
        console.log(error);
    }
});



/**
 * Update
 */
router.put('/api/todo/:todoId', verifyToken, (req, res) => {
    jwt.verify(req.token, 'key', (error, data) => {
        if (!error) {
            let id = req.params.todoId;
            let data = req.body;
            let opts = { new: true };

            Todo.findByIdAndUpdate(id, data, opts, (error, todo) => {
                if (error) {
                    res.status(500);
                    res.send(error.message);
                    res.end();
                }
                else {
                    res.status(200);
                    res.send(JSON.stringify(todo));
                    res.end();
                }
            });
        } else {
            res.status(403);
            res.end();
        }
    });

});


/**
 * Remove Document
 */
router.delete('/api/todo', verifyToken, (req, res) => {
    jwt.verify(req.token, 'key', (error, data) => {
        if (!error) {
            Todo.remove()
                .then((success) => {
                    res.status(200);
                    res.send('successfullt deleted all the todos');
                    res.end();
                })
                .catch((error) => {
                    res.send(500, error.message);
                    res.end();
                });
        } else {
            res.status(403);
            res.end();
        }
    })
});


/**
 * Delete a specific todo
 */

router.delete('/api/todo/:todoId', verifyToken, (req, res) => {
    jwt.verify(req.token, 'key', (error, data) => {
        if (!error) {
            Todo.findByIdAndRemove({ _id: req.params.todoId })
                .then(() => {
                    res.status(200);
                    res.send('successfully deleted the todo');
                    res.end();
                })
                .catch((error) => {
                    res.status(500);
                    res.send(error.message);
                    res.end();
                });
        } else {
            res.status(403);
            res.end();
        }
    });
});





/**
 * Test route
 */
router.get('/todo', (req, res) => {
    res.end('Todo Api');
});

module.exports = router;








