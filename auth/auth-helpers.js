const db = require('../database/dbConfig.js')

function addUser(users) {
    return db('users')
        .insert(users)
        .then(res => {
            const id = res [0]
            return db('users')
                .where({id})
                .first()
        })
}

function getUsersBy(filter){
    return db('users')
        .where({filter})
        .first()
}

function getAllUsers() {
    return db('units')
}

function delUser(id) {
    return db('users')
        .where({id})
        .del()
}

module.exports = {
    addUser,
    getAllUsers,
    getUsersBy,
    delUser
}