const assert = require('assert');
const User = require('../src/user');


describe('Reading users out of the database', () => {
    let joe, maria, alex, zach; //to make sure Joe is accessible everywhere.

    beforeEach((done) => {
        alex = new User({name: 'Alex'});
        joe = new User({name: 'Joe'}); 
        maria = new User({name: 'Maria'});
        zach = new User({name: 'Zach'});
        
        Promise.all([alex.save(), joe.save(), maria.save(), zach.save()])
            .then(() => done());
    });

    it('finds all users with a name of joe', (done) =>{
        User.find({ name: 'Joe'})//User model-Everything that User db includes/
            .then((users) => { //USERS
                assert(users[0]._id.toString() === joe.id.toString());
                done();
            });
    });

    it('finds a user with a id', (done) => {
        User.findOne({_id: joe._id})
            .then((user) => { //A SINGULAR user because this function returns one user!
                assert(user.name === 'Joe')
                   done();
            });

    });

    it('can skip and limit the result set', (done) => {
        User.find({})
        .sort({ name: 1 })
        .skip(1) //skips over.
        .limit(2) //limits what you get back.
        //Query Modifiers.
        .then((users) => {
            assert(users.length === 2);
            console.log(users);
            assert(users[0].name === 'Joe');
            assert(users[1].name === 'Maria');
            done();

            //*THIS TEST DOESN'T PASS DUE TO DIFFERENT SAVE TIMES*//
        })
    });
});