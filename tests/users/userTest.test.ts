import app from '../../app'
import * as request from 'supertest'
import { v4 as uuid4 } from 'uuid'
import UserModel from '../../users/model/user.model'
import mongoose from 'mongoose'

describe('Users api endpoint', () => {
  // clear database after test
  afterAll(async () => {
    await UserModel.User.deleteMany({})
    await mongoose.connection.close()
    app.close()
  })

  let firstUserIdTest = ''
  let refreshToken = ''
  const firstUserBody = {
    email: `thiagobussola+${uuid4()}@hotmail.com`,
    password: 'Top3rSecret!23'
  }
  let accessToken = ''
  const newFirstName2 = 'Paulo'

  it('Hello API Request', async () => {
    const result = await request.default(app).get('/')
    expect(result.text).toEqual('Server running at http://localhost:3000')
    expect(result.statusCode).toEqual(200)
  })

  it('should allow a POST to /users', async () => {
    const res = await request.default(app).post('/users').send(firstUserBody)

    expect(res.status).toEqual(201)
    expect(res.body._id).toBeDefined()
    firstUserIdTest = res.body._id
  })

  it('should allow a POST to /auth', async () => {
    const res = await request.default(app).post('/auth').send(firstUserBody)

    expect(res.status).toEqual(201)
    expect(res.body.accessToken).toBeDefined()
    accessToken = res.body.accessToken
    refreshToken = res.body.refreshToken
  })

  it('should allow a GET from /users/:userId with an access token', async () => {
    const res = await request.default(app).get(`/users/${firstUserIdTest}`).set('Authorization', `Bearer ${accessToken}`).send()

    expect(res.status).toEqual(200)
    expect(res.body._id).toBeDefined()
    expect(res.body._id).toEqual(firstUserIdTest)
    expect(res.body.email).toEqual(firstUserBody.email)
  })

  describe('with a valid access token', () => {
    it('should allow a GET from /users', async () => {
      const res = await request.default(app).get('/users').set('Authorization', `Bearer ${accessToken}`).send()
      expect(res.status).toEqual(200)
    })

    it('should disallow a PUT to /users/:userId with an nonexistent ID', async () => {
      const res = await request.default(app).put('/users/i-do-not-exist').set('Authorization', `Bearer ${accessToken}`)
        .send({
          email: firstUserBody.email,
          password: firstUserBody.password,
          name: 'Matheus'
        })
      expect(res.status).toEqual(404)
    })

    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    it('should allow a POST to /auth/refresh-token', async () => {
      const res = await request.default(app)
        .post('/auth/refresh-token')
        .set('Authorization', `Bearer ${accessToken}`)
        .send({ refreshToken })

      expect(res.status).toEqual(201)
      expect(res.body.accessToken).toBeDefined()
      accessToken = res.body.accessToken
      refreshToken = res.body.refreshToken
    })

    it('should allow a PUT to /users/:userId to change first and last names', async () => {
      const res = await request.default(app)
        .put(`/users/${firstUserIdTest}`)
        .set('Authorization', `Bearer ${accessToken}`)
        .send({
          email: firstUserBody.email,
          password: firstUserBody.password,
          name: newFirstName2
        })

      expect(res.status).toEqual(200)
    })

    it('should allow a GET from /users/:userId and should have a new full name', async () => {
      const res = await request.default(app)
        .get(`/users/${firstUserIdTest}`)
        .set('Authorization', `Bearer ${accessToken}`)
        .send()

      expect(res.status).toEqual(200)
      expect(res.body._id).toBeDefined()
      expect(res.body.name).toEqual(newFirstName2)
      expect(res.body.email).toEqual(firstUserBody.email)
      expect(res.body._id).toEqual(firstUserIdTest)
    })

    it('should allow a DELETE from /users/:userId', async () => {
      const res = await request.default(app)
        .delete(`/users/${firstUserIdTest}`)
        .set('Authorization', `Bearer ${accessToken}`)
        .send()
      expect(res.status).toEqual(200)
    })
  })
})
