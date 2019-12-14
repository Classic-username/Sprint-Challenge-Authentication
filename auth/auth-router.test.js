const server = require('../api/server.js')
const request = require('supertest')

describe('root', () => {
    it('environment should be testing', () => {
        expect(process.env.DB_ENV).toBe('testing')
    })
})