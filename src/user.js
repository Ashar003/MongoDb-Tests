const mongoose = require('mongoose');
const PostSchema = require('./post');
const Schema = mongoose.Schema;

const UserSchema = new Schema ({ //A schema.
    name: {
        type: String,
        validate: {
            validator: (name) => name.length > 2,
            message: 'Name must be longer than 2 characters.'
        },
        required: [true, 'Name is required.']
    },
    posts: [PostSchema], //Since it's an array, mongoose knows it contains records, nested documents/sub-documents.
    likes: Number,
    blogPosts: [{
        type: Schema.Types.ObjectId,
        ref: 'blogPost'
    }]
});

UserSchema.virtual('postCount').get(function(){ //ES6 GETTER
        return this.posts.length;
});

UserSchema.pre('remove', function (next){ //runs before the user remove event. 
    const BlogPost = mongoose.model('blogPost'); //TO prevent cyclical loading;Multiple loadings
        //this === joe
        BlogPost.remove({ _id: { $in: this.blogPosts }})
            .then(() => next());
});

const User = mongoose.model('user', UserSchema); //Represents all the data collection, not one user. Model declaration.

module.exports = User;