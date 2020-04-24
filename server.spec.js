const request = require('supertest');
const server = require('./server');
const db = require('./data/dbConfig');

// Clear out database before each test
beforeEach(async () => {
    await db('users').truncate();
});

describe('server', () => {
    it('Testing enviornment', () => {
        expect(process.env.NODE_ENV).toBe('test');
    })
    it('Server running', async done => {
        const res = await request(server).get('/')
        expect(res.status).toBe(200);
        done();
    })
})

describe('users', () => {
    it('GET /users - response 201', async done => {
        const res = await request(server).get('/users');
        expect(res.status).toBe(201);
        done();
    })
    it('GET /users - Length of users to be 0', async done => {
        const res = await request(server).get('/users');
        expect(res.body).toHaveLength(0);
        done();
    })
    it('POST /users - response 201', async done => {
        const res = await request(server)
        .post('/users')
        .send({
            username: "Josiah",
            email: "test"
        });
        expect(res.status).toBe(201);
        done();
    })
    it('POST /users - Length of users to be 1', async done => {
        let res = await request(server)
        .post('/users')
        .send({
            username: "Josiah",
            email: "test"
        });
        expect(res.status).toBe(201);

        res = await request(server).get('/users');
        expect(res.body).toHaveLength(1);
        done();
    })
})