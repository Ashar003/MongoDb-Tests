const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BlogPostSchema = new Schema({
    title: String,
    content: String,
    comments: [{
        type: Schema.Types.ObjectId, //Passing a reference to another model.
        ref: 'comment' //const User = mongoose.model('Comment', UserSchema); 
    }]
});

const BlogPost = mongoose.model('blogPost', BlogPostSchema);

module.exports = BlogPost;