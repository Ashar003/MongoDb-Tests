const assert = require('assert');
const User = require('../src/user');

describe('Validating records', () => {
    it('require a user\'s name', () => {
        const Mike = new User({ name: undefined });
        const validationResult = Mike.validateSync();
        const { message } = validationResult.errors.name; //To access the error message property.
        assert( message === 'Name is required.');
});

    it('require a user\'s name', () => {
        const Mike = new User({ name: 'Mi' });
        const validationResult = Mike.validateSync();
        const { message } = validationResult.errors.name; //To access the error message property.
        assert( message === 'Name must be longer than 2 characters.');
    });

    it('disallows invalid records from being saved', (done) => {
        const Mike = new User({ name: 'Mi' });
        Mike.save()
            .catch((validationResult) => {
                const { message } = validationResult.errors.name;

                assert( message === 'Name must be longer than 2 characters.');
                done();
                
            });
});
});