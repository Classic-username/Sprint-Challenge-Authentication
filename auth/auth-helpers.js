const db = require('../database/dbConfig.js')

function addUser(users) {
    return db('users')
        .insert(users)
        .then(res => {
            return res
        })
}

function getUsersBy(filter){
    const user = db('users')
    .where(filter)
    .first()
    
    console.log(filter)
    return user
        
}

function getAllUsers() {
    return db('users')
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
