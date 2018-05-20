const mongoose = require('mongoose');
const Schema = mongoose.Schema

let blogSchema = mongoose.Schema({
    user: { type: Schema.Types.ObjectId, ref: 'user'},
    username: String,
    header: String,
    post_text: String,
    image: String 
}, {
    timestamps: true
})

let blog = mongoose.model('blog', blogSchema);

module.exports = blog;