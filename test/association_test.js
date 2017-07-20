const mongoose = require('mongoose');
const assert = require('assert');
const User = require('../src/user'); //A class
const Comment = require('../src/comment'); //A class
const BlogPost = require('../src/blogPost'); //A class

describe('Associations', () => {
    let joe, blogPost, comment; //Instances that's why lowercase.
    
    beforeEach((done) => {
        joe = new User({ name: 'Joe'});
        blogPost = new BlogPost({ title: 'JS is Great', content:'Yep it really is'});
        comment = new Comment({ content: 'Congrats on great post'});
        //NEW INSTANCES HERE.

        joe.blogPosts.push(blogPost);
        blogPost.comments.push(comment); 

        //Pushing the whole model into an array.
        comment.user = joe;

        Promise.all([ joe.save(), blogPost.save(),comment.save()]) //Takes an array of promises, and combines them into 1 big promise.
            .then(() => done());
    });

    it('saves a relation between a user and a blogpost', (done) => {
        User.findOne({ name: 'Joe'})
            .populate('blogPosts') //matches the property.
            .then((user) => {
                assert(user.blogPosts[0].title === 'JS is Great');
                done();
            });
    });

    it('saves a full relation graph', (done) => {
        User.findOne({ name: 'Joe' })
            .populate({
                path: 'blogPosts', //look into the user object and load that in.
                populate:{ //look inside the blogPosts and try to load inthe comments.
                    path: 'comments',
                    model: 'comment',
                    populate: {
                        path: 'user',
                        model: 'user'
                    }
                }
            })
                .then((user) => {
                    assert(user.name === 'Joe');
                    assert(user.blogPosts[0].title === 'JS is Great' );
                    assert(user.blogPosts[0].comments[0].content === 'Congrats on great post')
                    assert(user.blogPosts[0].comments[0].user.name === 'Joe');
                    done();
                })
    });

});