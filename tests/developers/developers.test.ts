import app from '../../app'
import * as request from 'supertest'
import { v4 as uuid4 } from 'uuid'
import usersDao from '../../users/daos/users.dao'
import developersDao from '../../developers/daos/developers.dao'
import mongoose from 'mongoose'

describe('Developers api endpoint', () => {
  // clear database after test
  afterAll(async () => {
    await usersDao.User.deleteMany({})
    await developersDao.Developer.deleteMany({})
    await mongoose.connection.close()
    app.close()
  })

  let firstDeveloperIdTest = ''
  let secondDeveloperIdTest = ''
  let thirdDeveloperIdTest = ''

  const firstUserBody = {
    email: `thiagobussolaDeveloper+${uuid4()}@hotmail.com`,
    password: 'magistus!23'
  }
  let accessToken = ''

  describe('user auth setup', () => {
    // here we are creating our user to use the application
    it('should allow a POST to /users', async () => {
      const res = await request.default(app).post('/users').send(firstUserBody)

      // asserts
      expect(res.status).toEqual(201)
      expect(res.body._id).toBeDefined()
      firstDeveloperIdTest = res.body._id
    })

    // Now let's authenticate the user so we can make use of all developers routes!
    it('should allow a POST to /auth', async () => {
      const res = await request.default(app).post('/auth').send(firstUserBody)

      // asserts
      expect(res.status).toEqual(201)
      expect(res.body.accessToken).toBeDefined()
      accessToken = res.body.accessToken
    })
  })

  describe('/develpers endpoint', () => {
    it('should allow a POST to /developers', async () => {
      // arrange

      const developerArrange = {
        nome: 'Thiago Bussola da Silva Teste',
        sexo: 'M',
        idade: 22,
        hobby: 'ler, ler e ler',
        datanascimento: '09/12/1998'
      }

      // action
      const res = await request.default(app).post('/developers').set('Authorization', `Bearer ${accessToken}`).send(developerArrange)

      const fidedCreatedDeveloper = await developersDao.Developer.findOne({ nome: 'Thiago Bussola da Silva Teste' })

      // asserts
      expect(res.status).toEqual(201)
      expect(res.body._id).toBeDefined()
      expect(res.body.nome).toBe(fidedCreatedDeveloper.nome)
      expect(res.body.sexo).toBe(fidedCreatedDeveloper.sexo)
      expect(res.body.idade).toBe(fidedCreatedDeveloper.idade)
      expect(res.body.datanascimento).toBe(fidedCreatedDeveloper.datanascimento.toISOString())
      firstDeveloperIdTest = res.body._id
    })

    /// let's create two more users using the route so we can filter them later
    it('should allow a POST to /developers (creating another user for the tests)', async () => {
      // arrange

      const developerArrange = {
        nome: 'Matheus Bussola da Silva Teste',
        sexo: 'M',
        idade: 22,
        hobby: 'ler, ler e ler',
        datanascimento: '09/12/1998'
      }

      // action
      const res = await request.default(app).post('/developers').set('Authorization', `Bearer ${accessToken}`).send(developerArrange)

      const fidedCreatedDeveloper = await developersDao.Developer.findOne({ nome: 'Matheus Bussola da Silva Teste' })

      // asserts
      expect(res.status).toEqual(201)
      expect(res.body._id).toBeDefined()
      expect(res.body.nome).toBe(fidedCreatedDeveloper.nome)
      expect(res.body.sexo).toBe(fidedCreatedDeveloper.sexo)
      expect(res.body.idade).toBe(fidedCreatedDeveloper.idade)
      expect(res.body.datanascimento).toBe(fidedCreatedDeveloper.datanascimento.toISOString())
      secondDeveloperIdTest = res.body._id
    })

    it('should allow a POST to /developers (creating another user for the tests)', async () => {
      // arrange

      const developerArrange = {
        nome: 'Heloisa Bussola da Silva Teste',
        sexo: 'F',
        idade: 16,
        hobby: 'Comer e dormir',
        datanascimento: '12/09/2005'
      }

      // action
      const res = await request.default(app).post('/developers').set('Authorization', `Bearer ${accessToken}`).send(developerArrange)

      const fidedCreatedDeveloper = await developersDao.Developer.findOne({ nome: 'Heloisa Bussola da Silva Teste' })

      // asserts
      expect(res.status).toEqual(201)
      expect(res.body._id).toBeDefined()
      expect(res.body.nome).toBe(fidedCreatedDeveloper.nome)
      expect(res.body.sexo).toBe(fidedCreatedDeveloper.sexo)
      expect(res.body.idade).toBe(fidedCreatedDeveloper.idade)
      expect(res.body.datanascimento).toBe(fidedCreatedDeveloper.datanascimento.toISOString())
      thirdDeveloperIdTest = res.body._id
    })

    it('should allow a GET from /developers/:developerId with an access token', async () => {
      // action
      const res = await request.default(app).get(`/developers/${firstDeveloperIdTest}`).set('Authorization', `Bearer ${accessToken}`).send()

      // database developer to compare if the route brought everything correctly
      const findedDeveloper = await developersDao.Developer.findOne({ nome: 'Thiago Bussola da Silva Teste' })

      // asserts
      expect(res.status).toEqual(200)
      expect(res.body._id).toBeDefined()
      expect(res.body._id).toBe(findedDeveloper._id)
      expect(res.body.nome).toBe(findedDeveloper.nome)
      expect(res.body.sexo).toBe(findedDeveloper.sexo)
      expect(res.body.idade).toBe(findedDeveloper.idade)
      expect(res.body.datanascimento).toBe(findedDeveloper.datanascimento.toISOString())
    })

    it('should allow a GET from /users', async () => {
      const res = await request.default(app).get('/developers').set('Authorization', `Bearer ${accessToken}`).send()

      // asserts
      expect(res.status).toEqual(200)
      expect(res.body).toHaveLength(3)
    })

    describe('testing the filter parameters', () => {
      it('should allow a GET from /users fiter by age', async () => {
        const res = await request.default(app).get('/developers').query({ idade: 22 }).set('Authorization', `Bearer ${accessToken}`).send()

        // asserts
        expect(res.status).toEqual(200)
        expect(res.body).toHaveLength(2)
        expect(res.body[0]._id).toBe(firstDeveloperIdTest)
        expect(res.body[1]._id).toBe(secondDeveloperIdTest)
      })

      it('should allow a GET from /users filter by age', async () => {
        const res = await request.default(app).get('/developers').query({ idade: 16 }).set('Authorization', `Bearer ${accessToken}`).send()

        // asserts
        expect(res.status).toEqual(200)
        expect(res.body).toHaveLength(1)
        expect(res.body[0]._id).toBe(thirdDeveloperIdTest)
      })

      it('should allow a GET from /users filter by age and name', async () => {
        const res = await request.default(app).get('/developers').query({ idade: 22, nome: 'Mat' }).set('Authorization', `Bearer ${accessToken}`).send()

        // asserts
        expect(res.status).toEqual(200)
        expect(res.body).toHaveLength(1)
        expect(res.body[0]._id).toBe(secondDeveloperIdTest)
      })
    })

    it('should disallow a PUT to /developers/:developerId with an nonexistent ID', async () => {
      const res = await request.default(app).put('/developers/i-do-not-exist').set('Authorization', `Bearer ${accessToken}`)
        .send({
          email: firstUserBody.email,
          password: firstUserBody.password,
          firstName: 'Matheus',
          lastName: 'Silva'
        })

      // asserts
      expect(res.status).toEqual(404)
    })

    it('should allow a PUT to /developers/:developerId to change name, sex, age, hobby and birth date', async () => {
      // action
      const res = await request.default(app)
        .put(`/developers/${thirdDeveloperIdTest}`)
        .set('Authorization', `Bearer ${accessToken}`)
        .send({
          nome: 'Julio Cesar da Silva',
          sexo: 'M',
          hobby: 'Trabalhar',
          datanascimento: '05/06/1978'
        })

      // asserts

      const findUpdatedDeveloper = await developersDao.Developer.findById(thirdDeveloperIdTest)

      expect(res.status).toEqual(200)
      expect(res.body.nome).toBe(findUpdatedDeveloper.nome)
      expect(res.body.sexo).toBe(findUpdatedDeveloper.sexo)
      expect(res.body.hobby).toBe(findUpdatedDeveloper.hobby)
      expect(res.body.datanascimento).toBe(findUpdatedDeveloper.datanascimento.toISOString())
    })

    it('should allow a DELETE from /developers/:userId', async () => {
      const res = await request.default(app)
        .delete(`/developers/${firstDeveloperIdTest}`)
        .set('Authorization', `Bearer ${accessToken}`)
        .send()
      expect(res.status).toEqual(204)
    })
  })
})
