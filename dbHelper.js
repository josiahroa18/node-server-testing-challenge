const db = require('./data/dbConfig');

module.exports = {
    getUsers,
    addUser,
    deleteUser
}

function getUsers(){
    return db('users')
}

function addUser(user){
    return db('users')
        .insert(user, 'id')
        .then(id => {
            return getById(id[0]);
        })
}

function deleteUser(id){
    return db('users')
        .where({ id })
        .del();
}

function getById(id){
    return db('users')
        .where({ id })
        .first();
}