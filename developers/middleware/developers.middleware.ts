import express from 'express'
import developersService from '../services/developers.service'

class DevelopersMiddleware {
  async validateDeveloperExists (req: express.Request, res: express.Response, next: express.NextFunction) {
    const developer = await developersService.readById(req.params.developerId)
    if (developer) {
      res.locals.developer = developer
      next()
    } else {
      res.status(404).send({
        errors: [`Developer ${req.params.developerId} not found`]
      })
    }
  }

  async extractDeveloperId (req: express.Request, res: express.Response, next: express.NextFunction) {
    req.body._id = req.params.developerId
    next()
  }
}

export default new DevelopersMiddleware()
