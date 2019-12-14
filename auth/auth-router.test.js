const server = require('../api/server.js')
const request = require('supertest')
const db = require('../database/dbConfig.js')

describe('root', () => {
    it('environment should be testing', () => {
        expect(process.env.DB_ENV).toBe('testing')
    })

    it('should return 404 bad request', async () => {
        const res = await request(server).get('/')
        expect(res.status).toBe(404) //don't have a server.get('/')
    })

    it('should be html', async () => { //again don't have dont have server.get('/') route extablished. RETURN WILL BE THE STUPID "CAN'T POST HERE CUS MUUUUUUUH"
        const res = await request(server).get('/')
        expect(res.type).toBe('text/html')
    })
})

describe('users register', () => {
    it('should return 500 error', async () => { //500 because I'm not posting an object
        const res = await request(server).post('/api/auth/register')
        expect(res.status).toBe(500)
    })

    it('should be application/json', async () => {
        const res = await request(server)
            .post('/api/auth/register')
            .send({
                "username": "yo",
                "password":"yoyo"
            })
        expect(res.type).toBe('application/json')

    })

    it('should be return 201 success', async () => {
        const res = await request(server)
            .post('/api/auth/register')
            .send({
                "username": "yo",
                "password":"yoyo"
            })
        expect(res.status).toBe(201)
        
    })

    beforeEach(async () => {
        await (db('users').truncate())
    })
})

describe('users login', () => {
    it('should return 200 success', async () => {
        const res = await request(server)
            .post('/api/auth/login')
            .send({
                "username": "yo",
                "password":"yoyo"
            })
        expect(res.status).toBe(200)
    })

    it('should return type of application/json', async () => {
        const res = await request(server)
            .post('/api/auth/login')
            .send({
                "username": "yo",
                "password":"yoyo"
            })
        expect(res.type).toBe('application/json')
    })

    it('should return 500 error', async () => {
        const res = await request(server).post('/api/auth/login')
        expect(res.status).toBe(500)
    })
    
})