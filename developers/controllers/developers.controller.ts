import express from 'express'

import developersService from '../services/developers.service'

class DeveloperController {
  async createDeveloper (req: express.Request, res: express.Response) {
    const developer = await developersService.create(req.body)
    res.status(201).send(developer)
  }

  async getDeveloperById (req: express.Request, res: express.Response) {
    const developer = await developersService.readById(req.body._id)
    res.status(200).send(developer)
  }

  async listDevelopers (req: express.Request, res: express.Response) {
    try {
      const nome = req.query['nome'] as string
      const sexo = req.query['sexo'] as string
      // we are accepting number as a string as it will be passed by the request parameter
      const idade = req.query['idade'] as string
      const hobby = req.query['hobby'] as string

      const developers = await developersService.listDevelopers(100, 0, nome, sexo, idade, hobby)
      res.status(200).send(developers)

    } catch(err) {

    }

  }

  async putDeveloper (req: express.Request, res: express.Response) {
    const updatedDeveloper = await developersService.putById(req.body._id, req.body)
    res.status(200).send(updatedDeveloper)
  }

  async removeDeveloper (req: express.Request, res: express.Response) {
    const removedDeveloper = await developersService.deleteById(req.body._id)
    res.status(204).send(removedDeveloper)
  }
}

export default new DeveloperController()
 