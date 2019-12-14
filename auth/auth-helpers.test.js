const Users = require('./auth-helpers')
const db = require('../database/dbConfig.js')

describe('unit helpers', () => {
    describe('addUser', () => {
        it('adds the user to the database', async () => {
            await Users.addUser({
                "username":"sup",
                "password":"supyo"
            })

            const users = await db('users')
            expect(users).toHaveLength(1)
        })

        it('should return the id of the inserted user', async () => {
            let user1 = await Users.addUser({
                "username":"sup",
                "password":"supyo"
            })

            expect(user1[0]).toBe(1) //returns the id of the user.
        })

        beforeEach(async () => {
            await (db('users').truncate())
        })
    })
})