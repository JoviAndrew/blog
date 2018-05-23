# blog

simple blog developed with TDD (API only) and SPA client with Vue

This project is created using `nodejs`, `vue` as the client framework and `express` for the server.

URL to the deployed project: http://n-blog.jovianandrewhari.cf/#/

### Dependencies
#### Server

    @google-cloud/storage
    bcryptjs
    chai
    chai-http
    cors
    dotenv
    express
    jsonwebtoken
    mocha
    mongoose
    morgan
    multer

Dev Dependencies:

    chai-html

#### Client

    axios
    sweetalert
    vue
    vue-router
    vuex
The Client uses `vue-cli`. To run the project, first you must type in `npm run serve` in your respective terminal

## End Point

#### Index
| Action | Path | Description |
|---------|:-----:|:----------:|
|POST|/index/login|Login User|
|POST|/index/register|Register User|
|GET|/index/users|Get Users|

#### Home
| Action | Path | Description |
|---------|:-----:|:----------:|
|GET|/show|Get All articles|
|POST|/post|Post new article|
|PUT|/update/:id|Update an article|
|DELETE|/delete/:id|Delete an article|
|GET|/show/:id|Get article by author|