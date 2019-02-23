#! /usr/bin/env node

console.log('This script populates the image-post database for testing.');

var async = require('async');
var User = require('../models/user');
var Post = require('../models/post');
var Category = require('../models/category');

var mongoose = require('mongoose');
var mongoDB = 'mongodb+srv://admin:tacocat2@cluster0-zsscr.mongodb.net/image-board?retryWrites=true';
mongoose.connect(mongoDB, { useNewUrlParser: true });
mongoose.Promise = global.Promise;
var db = mongoose.connection;
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));

var users = [];
var posts = [];
var categories = [];

function userCreate(name, cb) {
    var user = new User({ name: name });

    user.save(function(err) {
        if(err) {
            cb(err, null);
            return;
        }
        console.log('New User: ' + user);
        users.push(user);
        cb(null, user);
    });
}

function postCreate(title, image_link, author, category, upvotes, created, cb) {
    var post = new Post({
        title: title,
        image_link: image_link,
        author: author,
        category: category,
        upvotes: upvotes,
        created: created
    });

    post.save(function(err) {
        if(err) {
            cb(err, null);
            return;
        }
        console.log('New Post: ' + post);
        posts.push(post);
        cb(null, post);
    });
}

function categoryCreate(name, cb) {
    var category = new Category({ name: name });

    category.save(function(err) {
        if(err) {
            cb(err, null);
            return;
        }
        console.log('New Category: ' + category);
        categories.push(category);
        cb(null, category);
    });
}

function createUsersCategories(cb) {
    async.parallel([
        function(callback) {
            userCreate("User 1", callback);
        },
        function(callback) {
            userCreate("User 2", callback);
        },
        function(callback) {
            userCreate("User 3", callback);
        },
        function(callback) {
            categoryCreate("Category 1", callback);
        },
        function(callback) {
            categoryCreate("Category 2", callback);
        },
        function(callback) {
            categoryCreate("Category 3", callback);
        }
    ], cb);
}

function createPosts(cb) {
    async.parallel([
        function(callback) {
            postCreate("Post 1", "Link 1", users[0], categories[0], 1, "2001-01-01", callback);
        },
        function(callback) {
            postCreate("Post 2", "Link 2", users[1], categories[1], 2, "2002-02-02", callback);
        },
        function(callback) {
            postCreate("Post 3", "Link 3", users[2], categories[2], 3, "2003-03-03", callback);
        }
    ], cb);
}

async.series([
    createUsersCategories,
    createPosts,
    ],
    function(err, results) {
        if(err) {
            console.log('FINAL ERR: ' + err);
        } else {
            console.log('Posts: ' + posts);
        }
    mongoose.connection.close();
});