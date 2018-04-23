const chai = require('chai')
const should = chai.should()
const assert = require('mocha');
const app = require('../app');
const chaiHttp  = require('chai-http')
const expect = chai.expect;

chai.use(chaiHttp)

let token = '';
let fake_token = 'asfljabflouahgaoivhanvhaoihaoijgauiwajfaoieghalknvaohbaoipvjavjWBVPOUAQEOHWAPEGIHPOUIAAISHVOIHphiohvaoisvhia'



//Register new user
// describe('POST /index/register', function() {
//     it('success register', function(done) {        
//         this.timeout(10000);
//         chai.request(app)
//         .post('/index/register')
//         .type('form')
//         .send({
//             'firstname': 'Tom',
//             'lastname': 'Tommy',
//             'username': 'tom@mail.com',
//             'password': '123456a',
//         })
//         .end((err, res) => {
//             expect(err).to.be.null
//             expect(res).to.have.status(200)
//             expect(res.body).to.haveOwnProperty('message', 'success register a new user')
//             done()
//         })
//     })
// })

// Login User
describe('login user', function() {
    it('Success login', function(done) {
        this.timeout(5000);
        chai.request(app)
        .post('/index/login')
        .type('form')
        .send({
            username: 'tom@mail.com',
            password: '123456a',
        })
        .end((err, res) => {
            expect(err).to.be.null
            expect(res.body).to.have.property('token')
            expect(res).to.have.status(200)
            token = res.body.token
            done();
        })
    })
})

//Create post
// describe('posting a new post' , () => {
//     before(function(done){
//         this.timeout(5000);
//         chai.request(app)
//         .post('/index/login')
//         .type('form')
//         .send({
//             username: 'tom@mail.com',
//             password: '123456a',
//         })
//         .end((err, res) => {
//             token = res.body.token
//             done();
//         })
//     })
//     it('successfully added a new post', function (done) {
//         this.timeout(5000);
//         chai.request(app)
//         .post('/home/post')
//         .type('form')
//         .send({
//             header: 'First Post!',
//             postText: 'Hello Testing new post!'
//         })
//         .set('token', token)
//         .end((err, res) => {
//             expect(err).to.be.null
//             expect(res).to.have.status(200)
//             expect(res.body).to.haveOwnProperty('response').to.be.an('object')
//             expect(res.body).to.haveOwnProperty('message').be.a('string')
//             expect(res.body).to.haveOwnProperty('message', 'Success added new post!')
//             done()
//         })
//     })
// })

//Get all posts
describe('Get posts', () => {
    before(function(done){
        this.timeout(5000);
        chai.request(app)
        .post('/index/login')
        .type('form')
        .send({
            username: 'tom@mail.com',
            password: '123456a',
        })
        .end((err, res) => {
            token = res.body.token
            done();
        })
    })
    it('Successfully return posts', (done) => {
        chai.request(app)
            .get('/home/show')
            .end((err, res) => {
                expect(err).to.be.null
                expect(res).to.have.status(200)
                console.log(res.body)
                expect(res.body).to.have.property('message', 'success get posts');
                done()
            })
    })
})

//update post
describe('update post', () => {
    before(function(done){
        this.timeout(5000);
        chai.request(app)
        .post('/index/login')
        .type('form')
        .send({
            username: 'tom@mail.com',
            password: '123456a',
        })
        .end((err, res) => {
            token = res.body.token
            done();
        })
    })
    it('Successfully updated post', (done) => {
        chai.request(app)
        //testing with a certain post id
        .put('/home/update/5adc8ec27503b9447a465ab3')
        .type('form')
        .set('token', token)
        .send({
            header: 'Update Post!',
            postText: 'Hello Testing update the new post!'
        })
        .end((err, res) => {
            expect(err).to.be.null
            expect(res).to.have.status(200)
            expect(res.body).to.haveOwnProperty('message', 'Success update post')
            expect(res.body).to.haveOwnProperty('response')
            done()
        })
    })
})

//delete post
describe('delete post', () => {
    before(function(done){
        this.timeout(5000);
        chai.request(app)
        .post('/index/login')
        .type('form')
        .send({
            username: 'tom@mail.com',
            password: '123456a',
        })
        .end((err, res) => {
            token = res.body.token
            done();
        })
    })
    it('Successfully deleted a post', (done) => {
        chai.request(app)
        .delete('/home/delete/5adc8fa4044efe453001762c')
        .set('token', token)
        .end((err, res) => {
            expect(err).to.be.null
            expect(res).to.have.status(200)
            expect(res.body).to.haveOwnProperty('message', 'Successfully deleted a post!')
            expect(res.body).to.haveOwnProperty('response')
            done()
        })
    })
})