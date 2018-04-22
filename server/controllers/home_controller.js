const posts = require('../models/blogpost');
const jwt = require('jsonwebtoken');

module.exports = {
    getAllPosts(req, res){
        posts.find({})
        .then(function(postData){
            res.status(200).json({
                message: 'success get posts',
                data: postData
            })
        })
        .catch(function(err){
            message: err
        })
    },
    addPost(req, res){
        res.status(200).json({
            message: 'success add post'
        })
    }
}