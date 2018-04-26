const posts = require('../models/blogpost');
const jwt = require('jsonwebtoken');

module.exports = {
    getAllPosts(req, res){
			const token = req.headers.token
			jwt.verify(token, process.env.SECRET, function(err, result){
					if(err){
						res.send({
							err: err,
							message: 'Something went wrong with jwt'
						})
					}
					else{
						posts.find({
							user: result.id
						})
						.then(function(postData){
								res.status(200).json({
										message: 'success get posts',
										data: postData
								})
						})
						.catch(function(err){
								message: err
						})
					}
			})
    },
    addPost(req, res){
			const token = req.headers.token
			jwt.verify(token, process.env.SECRET, function(err, result){
					if(err){
						res.send({
							err: err,
							message: 'Something went wrong with jwt'
						})
					}
					else{
							posts.create({
								user: result.id,
								header: req.body.header,
								post_text: req.body.postText,
								username: req.body.username
							})
							.then(function(response){
								res.status(200).json({
									message: 'Success added new post!',
									response: response
								})
							})
					}
			})
		},
		updatePost(req, res){
			let id = req.params.id
			const token = req.headers.token
			jwt.verify(token, process.env.SECRET, function(err, result){
				if(err){
					res.send({
						err: err,
						message: 'Something went wrong with jwt'
					})
				}else{
					posts.bulkWrite([{
						updateOne: {
							filter: {
								'_id': id,
								'user': result.id
							},
							update: {
								header: req.body.header,
								post_text: req.body.postText
							}
						}
					}])
					.then(function(response){
						res.status(200).json({
							message: 'Success update post',
							response: response
						})
					})
					.catch(function(err){
						res.status(500).json({
							message:'Error',
							err: err
						})
					})
				}
			})
		},
		deletePost(req, res){
			let id = req.params.id
			const token = req.headers.token
			console.log(token)
			jwt.verify(token, process.env.SECRET, function(err, result){
				if(err){
					res.send({
						err: err,
						message: 'Something went wrong with jwt'
					})
				}else{
					posts.bulkWrite([{
						deleteOne: {
							filter: {
								'_id': id,
								'user': result.id
							}
						}
					}])
					.then(function(response){
						res.status(200).json({
							message: 'Successfully deleted a post!',
							response: response
						})
					})
					.catch(function(err){
						res.status(500).json({
							message: 'Error while deleting a post!',
							err: err
						})
					})
				}
			})
		}
}