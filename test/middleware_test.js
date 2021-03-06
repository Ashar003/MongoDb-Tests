const mongoose = require('mongoose');
const assert = require('assert');
const User = require('../src/user');
const BlogPost = require('../src/blogPost');

describe('Middleware', () => {
    let joe, blogPost;

    beforeEach((done) => {
        joe = new User({ name: 'Joe'});
        blogPost = new BlogPost({ title: 'JS is Great', content:'Yep it really is'});
        //NEW INSTANCES HERE.

        joe.blogPosts.push(blogPost);

        //Pushing the whole model into an array.

        Promise.all([ joe.save(), blogPost.save()]) //Takes an array of promises, and combines them into 1 big promise.
            .then(() => done());
    });

    it('users clean up dangling blogposts on remove', (done) => {
        joe.remove()
            .then(() => BlogPost.count())
            .then((count) => {
                assert(count === 0);
                done();
            })
    });


});