const users = require('../models/user');
const jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
const saltRounds = 10;

module.exports = {
  doLogin(req, res){
    users.findOne({
      username: req.body.username
    })
    .then(function(userData){
      if(!userData){
        res.status(400).json({
          message: 'Username not found!'
        })
      }else{
        let correct = bcrypt.compareSync(req.body.password, userData.password)
        if (!correct) {
          res.status(400).json({
            message: 'incorrect username or password',
          })
        } else {
          let token = jwt.sign({id: userData._id, username: userData.username}, process.env.SECRET)
          res.status(200).json({
              message: 'Success login',
              token: token,
              username: userData.username,
              firstname: userData.firstname,
              lastname: userData.lastname
          })
        }
      }
    })
    .catch (function (err) {
      res.status(500).json({
        err: err,
      })
    })
  },
  doRegister(req, res){
    var regexUsername = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    let password = req.body.password;
    let letter = /[a-zA-Z]/; 
    let number = /[0-9]/;
    let goodPassword = letter.test(password) && number.test(password);
    if(password.length < 6){
        res.json({
            message: 'Password too short!'
        })
    }else if(!goodPassword){
        res.json({
            message: 'Password must be alphanumeric'
        })
    }else if(!regexUsername.test(req.body.username)){
        res.json({
            message: 'Username must be email'
        })
    }else{
      users.findOne({
          username: req.body.username
      })
      .then(function(userData){
        if(userData != null){
          res.status(400).json({
              message: "username has been taken!",
          })
        }else{
          let salt = bcrypt.genSaltSync(saltRounds)
          let hash = bcrypt.hashSync(password, salt);
            users
            .create({
                username: req.body.username,
                password: hash,
                firstname: req.body.firstname,
                lastname: req.body.lastname
            })
            .then(function(result){
              let token = jwt.sign({id: result._id, username: result.username}, process.env.SECRET)
                res.status(200).json({
                    message: "success register a new user",
                    result: result,
                    token: token,
                    username: result.username,
                    firstname: result.firstname,
                    lastname: result.lastname
                })
            })
          }
        })
      .catch(function(err){
        res.status(500).json({
            message: err
        })
      }) 
    }
  },
  findAllUsers(req, res){
    users.find({})
    .then(function(userData){
      res.status(200).json({
        message: 'Success get all users',
        data: userData
      })
    })
    .catch(function(err){
      req.status(500).json({
        message: 'error while getting user data',
        err: err
      })
    })
  }
}