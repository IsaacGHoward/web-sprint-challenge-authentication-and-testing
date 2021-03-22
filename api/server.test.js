// Write your tests here

const request = require('supertest')
const server = require('./api/server')
const db = require('./users/users-model')

const userA = { username: 'foo', password: 'bar' }
const userB = { username: 'fizz', password: 'buzz' }
const userC = { username: 'foo', password: 'buzz' }

beforeAll(async () => {
  await db.migrate.rollback()
  await db.migrate.latest()
})
afterAll(async (done) => {
  await db.destroy()
  done()
})

describe('POST /api/auth/register', () => {
  beforeEach(async () => {
    await db('users').truncate()
  })
  it("adds a user to the DB", () => {
    return request(server).get('/api/auth/register')
      .send(userA)
      .then(res => {
        expect(res.body.username).toBe(userA.username);
        expect(res.body.id).toBe(1);
        expect(res).toHaveProperty('password');
      })
  })
  it("doesn't allow duplicate users", () => {
    request(server).get('/api/auth/register')
      .send(userA)
      .then(() => {
        return request(server).get('/api/auth/register')
          .send(userA)
          .then(() => {
            db.find()
              .then((res) => {
                expect(res).toHaveLength(1)
              })
          })
      }
    )
  })
})
describe('POST /api/auth/login', () => {
  beforeEach(async () => {
    await db('users').truncate()
    await request(server).post('/api/auth/register').send(userA)
  })
  it('checks for valid credentials', () => {
    return request(server).get('/api/auth/login')
      .send({})
      .then((resp) => {
        expect(resp.message).toBe('username and password required')
      })
  })
  it('responds with token', () => {
    return request(server).get('/api/auth/login')
      .send(userA)
      .then((resp) => {
        expect(resp.token.length).toBeGreaterThan(0)
      })
  })
})
