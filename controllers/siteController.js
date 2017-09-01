const fs = require('fs');
const express = require('express');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const dbClient = require('../helpers/dbClient')
const mongoConnection = process.env.MONGODB_URI || 'mongodb://localhost:27017/profile;'

router.get('/', (req, res) => {
    const callback = (error, posts) => {
        res.render('index', {
            title: "Anthony's profile",
            subheading: "A Great Website driven by a database",
            posts: posts
        });
    };
    dbClient.getPosts({}, callback);
});

router.get('/post-:postId', (req, res) => {
    const postId = req.params.postId;

    const callback = (error, posts) => {

        res.render('single-post', {
            title: posts[0].title,
            subheading: "A Great Website driven by a database",
            post: posts[0]
        });
    }
    dbClient.getPosts({
        _id: ObjectID(postId)
    }, callback);
});


router.get('/my-cv', function (req, res) {
    res.render('my-cv');
});

router.get('/admin', function (req, res) {
    res.render('admin');
});

router.get('/contact', function (req, res) {
    res.render('contact');
});

module.exports = router;