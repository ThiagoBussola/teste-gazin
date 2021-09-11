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
    const developers = await developersService.list(100, 0)
    res.status(200).send(developers)
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
