const assert = require('assert');
const User = require('../src/user');

describe('Creating records', () => {
    it('saves a user', (done) => { //DONE.
        const joe = new User({name: 'Joe'}); //We used the User class to create a new instance-'Joe'. Record has not been saved yet!

        joe.save() //Saves to the db. Takes some amount of time.
            .then(() => {
                //Has Joe been saved successfully?
                assert(!joe.isNew);
                done();
            })
});
    });