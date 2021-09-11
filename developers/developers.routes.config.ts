import { CommonRoutesConfig } from '../common/common.routes.config'
import DevelopersController from './controllers/developers.controller'
import DevelopersMiddleware from './middleware/developers.middleware'
import jwtMiddleware from '../auth/middleware/jwt.middleware'


import express from 'express'

export class DevelopersRoutes extends CommonRoutesConfig {
  constructor (app: express.Application) {
    super(app, 'DevelopersRoutes')
  }

  //only authenticated users can use as features of developer routes
  configureRoutes (): express.Application {
    this.app.route('/developers')
      .get(
        jwtMiddleware.validJWTNeeded,
        DevelopersController.listDevelopers
      )
      .post(        
        jwtMiddleware.validJWTNeeded,
        DevelopersController.createDeveloper
      )

    this.app.param('developerId', DevelopersMiddleware.extractDeveloperId)
    this.app.route('/developers/:developerId')
      .all(
        DevelopersMiddleware.validateDeveloperExists,
        jwtMiddleware.validJWTNeeded,
      )
      .get(DevelopersController.getDeveloperById)
      .delete(DevelopersController.removeDeveloper)

    this.app.put('/developers/:developerId', [
      DevelopersController.putDeveloper
    ])
    return this.app
  }
}
