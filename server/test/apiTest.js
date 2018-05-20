const chai = require('chai')
const should = chai.should()
const assert = require('mocha');
const app = require('../app');
const chaiHttp  = require('chai-http')
const expect = chai.expect;
const mongoose = require('mongoose')
const users = require('../models/user')
const blogpost = require('../models/blogpost')

chai.use(chaiHttp)

let token = ''
let postId = ''
let fake_token = 'asfljabflouahgaoivhanvhaoihaoijgauiwajfaoieghalknvaUAQEOHWAPEGIHPOUIAAISHVOIHphiohvaoisvhia'
let userId = ''

// Register new user
describe('POST /index/register', function() {
  before(function(done) {
    users.remove({}, function(err) {
    })
    done()
  })
  it('success register', function(done) {        
    this.timeout(10000);
    chai.request(app)
    .post('/index/register')
    .type('form')
    .send({
      'firstname': 'Tom',
      'lastname': 'Tommy',
      'username': 'tom@mail.com',
      'password': '123456a',
    })
    .end((err, res) => {
      userId = res.body.result._id
      expect(err).to.be.null
      expect(res).to.have.status(200)
      expect(res.body).to.haveOwnProperty('message', 'success register a new user')
      done()
    })
  })
})

// Login User
describe('POST /index/login', function() {
  it('wrong username', function (done) {
    this.timeout(10000)
    chai.request(app)
    .post('/index/login')
    .type('form')
    .send({
      'username': 'something@mail.com',
      'password': 'abca'
    })
    .end((err, res) => {
      expect(err).to.be.null
      expect(res).to.have.status(401)
      expect(res.body).to.be.an('object')
      expect(res.body).to.haveOwnProperty('message', 'Username not found!')
      done()
    })
  })
  it('wrong password', function (done) {
    this.timeout(10000)
    chai.request(app)
    .post('/index/login')
    .type('form')
    .send({
      'username': 'tom@mail.com',
      'password': 'abca'
    })
    .end((err, res) => {
      expect(err).to.be.null
      expect(res).to.have.status(401)
      expect(res.body).to.be.an('object')
      expect(res.body).to.haveOwnProperty('message', 'incorrect username or password')
      done()
    })
  })
  it('Success login', function(done) {
    this.timeout(10000);
    chai.request(app)
    .post('/index/login')
    .type('form')
    .send({
        'username': 'tom@mail.com',
        'password': '123456a'
    })
    .end((err, res) => {
        expect(err).to.be.null
        expect(res).to.have.status(200)
        expect(res.body).to.be.an('object')
        expect(res.body).to.have.property('token')
        token = res.body.token
        done();
    })
  })
})

//Create post
describe('posting a new post' , () => {
  beforeEach(function(done) {
    blogpost.remove({})
    .then(function(err){})
    done()
  })
  it('error jwt not found when adding new post', function (done) {
    this.timeout(5000)
    chai.request(app)
    .post('/home/post')
    .type('form')
    .send({
      header: 'First Post!',
      postText: 'Hello Testing new post!',
      img: ''
    })
    .end((err, res) => {
      expect(res).to.have.status(400)
      expect(res.body).to.haveOwnProperty('err').to.be.an('object')
      expect(res.body).to.haveOwnProperty('message', 'jwt must be provided')
      done()
    })
  })
  it('error wrong jwt token adding new post', function (done) {
    this.timeout(5000)
    chai.request(app)
    .post('/home/post')
    .type('form')
    .send({
      header: 'First Post!',
      postText: 'Hello Testing new post!',
      img: ''
    })
    .set('token', fake_token)
    .end((err, res) => {
      expect(res).to.have.status(400)
      expect(res.body).to.haveOwnProperty('err')
      expect(res.body).to.haveOwnProperty('message', 'jwt malformed')
      done()
    })
  })
  it('successfully added a new post', function (done) {
    this.timeout(5000);
    chai.request(app)
    .post('/home/post')
    .type('form')
    .send({
      header: 'First Post!',
      postText: 'Hello Testing new post!',
      img: ''
    })
    .set('token', token)
    .end((err, res) => {
      postId = res.body.response._id
      expect(err).to.be.null
      expect(res).to.have.status(200)
      expect(res.body).to.haveOwnProperty('response').to.be.an('object')
      expect(res.body).to.haveOwnProperty('message').be.a('string')
      expect(res.body).to.haveOwnProperty('message', 'Success added new post!')
      done()
    })
  })
})

//Get all posts
describe('Get posts', () => {
  it('no jwt found', (done) => {
    chai.request(app)
    .get('/home/show')
      .set('token', '')
      .end((err, res) => {
        expect(res).to.have.status(400)
        expect(res.body).to.haveOwnProperty('message', 'jwt must be provided')
        done()
      })
  })
  it('incorrect jwt', (done) => {
    chai.request(app)
      .get('/home/show')
      .set('token', fake_token)
      .end((err, res) => {
        expect(res).to.have.status(400)
        expect(res.body).to.haveOwnProperty('message', 'jwt malformed')
        done()
      })
  })
  it('Successfully return posts', (done) => {
    chai.request(app)
      .get('/home/show')
      .set('token', token)
      .end((err, res) => {
        expect(err).to.be.null
        expect(res).to.have.status(200)
        expect(res.body).to.have.property('message', 'success get posts');
        done()
      })
  })
})

//update post
describe('update post', () => {
  it('no jwt found', (done) => {
    chai.request(app)
      .put(`/home/update/${postId}`)
      .type('form')
      .set('token', '')
      .send({
          header: 'Update Post!',
          postText: 'Hello Testing update the new post!',
          img: ''
      })
      .end((err, res) => {
        expect(res).to.have.status(400)
        expect(res.body).to.haveOwnProperty('message', 'jwt must be provided')
        done()
      })
  })
  it('incorrect jwt', (done) => {
    chai.request(app)
      .put(`/home/update/${postId}`)
      .type('form')
      .set('token', fake_token)
      .send({
          header: 'Update Post!',
          postText: 'Hello Testing update the new post!',
          img: ''
      })
      .end((err, res) => {
        expect(res).to.have.status(400)
        expect(res.body).to.haveOwnProperty('message', 'jwt malformed')
        done()
      })
  })
  it('Successfully updated post', (done) => {
    chai.request(app)
    .put(`/home/update/${postId}`)
    .type('form')
    .set('token', token)
    .send({
        header: 'Update Post!',
        postText: 'Hello Testing update the new post!',
        img: ''
    })
    .end((err, res) => {
      expect(err).to.be.null
      expect(res).to.have.status(200)
      expect(res.body).to.haveOwnProperty('message', 'Success update post')
      expect(res.body).to.haveOwnProperty('response').be.an('object')
      done()
    })
  })
})

//finding articles by author
describe('get articles by authors', () => {
  it('successfully get all posts', function (done) {
    chai.request(app)
    .get(`/home/show/${userId}`)
    .end((err, res) => {
      expect(err).to.be.null
      expect(res).to.have.status(200)
      expect(res.body).to.haveOwnProperty('message', 'Success get posts')
      done()
    })
  })
})

//delete post
describe('delete post', () => {
  after(function(done) {
    users.remove({}, function(err) {
    })
    done()
  })
  it('no jwt found', (done) => {
    chai.request(app)
      .delete(`/home/delete/${postId}`)
      .set('token', '')
      .end((err, res) => {
        expect(res).to.have.status(400)
        expect(res.body).to.haveOwnProperty('message', 'jwt must be provided')
        done()
      })
  })
  it('incorrect jwt', (done) => {
    chai.request(app)
      .delete(`/home/delete/${postId}`)
      .set('token', fake_token)
      .end((err, res) => {
        expect(res).to.have.status(400)
        expect(res.body).to.haveOwnProperty('message', 'jwt malformed')
        done()
      })
  })
  it('Successfully deleted a post', function (done) {
    this.timeout(5000);
    chai.request(app)
    .delete(`/home/delete/${postId}`)
    .set('token', token)
    .end((err, res) => {
      expect(err).to.be.null
      expect(res).to.have.status(200)
      expect(res.body).to.be.an('object')
      expect(res.body).to.haveOwnProperty('message', 'Successfully deleted a post!')
      expect(res.body).to.haveOwnProperty('response')
      done()
    })
  })
})
