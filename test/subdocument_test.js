const assert = require('assert');
const User = require('../src/user');

describe('Subdocuments', () => {
      it('can create a subdocument', (done) => {
        const joe = new User({
            name: 'Joe',
            posts: [{ title: 'PostTitle' }]
            });

    joe.save()
      .then(() => User.findOne({ name: 'Joe' }))
      .then((user) => {
        assert(user.posts[0].title === 'PostTitle');
        done();
      });
  });

     it('can add subdocuments to an exisiting record', (done) => {
        
        const joe = new User({
            name: 'Joe', 
            posts: []
        });

        joe.save()
            .then(() => /*returned */User.findOne({name: 'Joe'})) 
                 .then((user) => { /*not returned because of curly braces*/
                    user.posts.push({ title: 'New Post'}); //Array.push to append to your array.
                    return user.save();//which is why we return this here to attach more promises. 
                    //Saving the entire user model because we can save individual documents.
                  })
                  .then(() => User.findOne({ name: 'Joe'}))
                     .then((user) => {
                        assert(user.posts[0].title === 'New Post');
                     done();
                  });
             });

        it('can remove an existing subdocument', (done) => {
            const joe = new User ({
                name: 'Joe',
                posts: [{ title: 'New Title'}]
            });

            joe.save()
                .then(() => User.findOne({ name: 'Joe'}))
                .then((user) => {
                    user.posts[0].remove();
                    return user.save();
                })
                .then(() => User.findOne({ name: 'Joe'}))
                .then((user) => {
                    assert(user.posts.length === 0);
                    done();
                })

        });

});