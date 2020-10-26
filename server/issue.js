const { UserInputError } = require('apollo-server-express');
const { getDB } = require('./db.js');

async function list() {
    const db = getDB();
    return db.collection('issues').find({}).toArray();
}

function validate(issue) {
    const errors = [];
    if (issue.title.length < 3) {
        errors.push('Field "title" must be at least 3 characters long.');
    }
    if (issue.status === 'Assigned' && !issue.owner) {
        errors.push('Field "owner" is required when status is "Assigned"');
    }
    if (errors.length > 0) {
        throw new UserInputError('Invalid input(s)', { errors });
    }
}

async function add(_, { issue }) {
    const db = getDB();
    validate(issue);

    const newIssue = Object.assign({}, issue);
    newIssue.created = new Date();

    const result = await db.collection('issues').insertOne(newIssue);

    return await db.collection('issues').findOne({_id: result.insertedId});
}

module.exports = { list, add };
