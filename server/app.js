require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost/blog-test');
mongoose.connect(`mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@ds147469.mlab.com:47469/blog-proj-ph2`);

const homeRoute = require('./routers/home_route.js')
const indexRoute = require('./routers/index_route.js');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));

app.use('/index', indexRoute);

app.use('/home', homeRoute)

app.use(cors());

app.listen(port, () => {
    console.log(`listening on port ${port}`);
})

module.exports=app;