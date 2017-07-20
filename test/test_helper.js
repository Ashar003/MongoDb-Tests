const mongoose = require('mongoose');

mongoose.Promise = global.Promise; //Mongoose's promise is set equal to Es6 promise.

before((done) => { //Before to happen 1 time .
    mongoose.connect('mongodb://localhost/users_test');
    mongoose.connection 
        .once('open', () => {done();})
        .on('error', (error) => {
            console.warn('Warning', error);
        });

});



        //Delete all records.
    beforeEach((done) => { //A HOOK. Runs before each test. DONE callback.
        const { users, comments, blogposts } = mongoose.connection.collections;
            users.drop(() => {
                    comments.drop(() => {
                        blogposts.drop(() => {
                            done();
                        });
                    });
        }); 
    });