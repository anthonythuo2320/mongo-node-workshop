const fs = require('fs');
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
router.use(bodyParser.json());
const mongoConnection = process.env.MONGODB_URI || 'mongodb://localhost:27017/profile';


router.get('/students', (req, res) => {
    MongoClient.connect(mongoConnection, (err, db) => {
        const cursor = db.collection('student').find({});
        cursor.toArray((error, students) => {
            db.close();
            res.json(students);
        });
    });
});


router.get('/students/:id', (req, res) => {
    const studentId = req.params.id;
    MongoClient.connect(mongoConnection, (err, db) => {
        const cursor = db.collection('students').find(ObjectID(studentId));
        cursor.toArray((error, students) => {
            db.close();
            res.json(students);
        });
    });
});

router.get('/posts', (req, res, next) => {
    const mongoConnection = 'mongodb://localhost:27017/profile';

    MongoClient.connect(mongoConnection, (err, db) => {
        const cursor = db.collection('posts').find({});
        cursor.toArray((error, posts) => {
            db.close();
            res.json(posts);
        });
    });
});
router.get('/posts/:id', (req, res) => {
    const postId = req.params.id;
    const mongoConnection = 'mongodb://localhost:27017/profile';
    MongoClient.connect(mongoConnection, (err, db) => {
        const cursor = db.collection('posts').find(ObjectID(postid));
        cursor.toArray((error, posts) => {
            db.close();
            res.json(posts);
        });
    });
});

router.post('/posts', (req, res) => {
    console.log(req.body);
    res.status(500).send('not implemented');
});

module.exports = router;