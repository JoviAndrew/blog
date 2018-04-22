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
describe('POST /index/login', function() {
    it('Success login', function(done) {
        this.timeout(10000);
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
            done();
            token = res.body.token
            console.log(res.body)
        })
    })
})

//Create post
describe('POST /home/post' , () => {
    it('successfully added a new post', (done) => {
        chai.request(app)
            .post('/home/post')
            .type('form')
            .send({
                header: 'First Post!',
                
            })
    })
})

//Get all items
describe('GET /home/show', () => {
    it('Successfully return posts', (done) => {
        chai.request(app)
            .get('/home/show')
            .end((err, res) => {
                expect(err).to.be.null
                expect(res).to.have.status(200)
                expect(res.body).to.have.property('token')
                expect(res.body).to.have.property('message').equals.to('success get posts');
                done()
            })
    })
})