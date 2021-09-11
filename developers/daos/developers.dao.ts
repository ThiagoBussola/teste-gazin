import { CreateDeveloperDto } from '../dto/create.developer.dto'
import { PutDeveloperDto } from '../dto/put.developer.dto'
import DeveloperModel from '../model/developer.model'

import { v4 as uuid4 } from 'uuid'
import debug from 'debug'

const log: debug.IDebugger = debug('app:in-memory-dao')

class DevelopersDao {
  constructor () {
    log('Created new instance of DevelopersDao')
  }

  async addDeveloper (developerFields: CreateDeveloperDto) {
    const developerId = uuid4()
    const developer = await DeveloperModel.Developer.create({
      _id: developerId,
      ...developerFields
    })

    return developer.save()
  }

  async getDeveloperById (developerId: string) {
    return DeveloperModel.Developer.findById({ _id: developerId }).exec()
  }

  async getDevelopers (nome: string, sexo: string, idade: string, hobby: string, limit = 25, page = 0) {
    let filter = {}

    if (nome) {
      filter = {
        ...filter,
        nome: new RegExp(nome, 'gim')
      }
    }
    if (sexo) {
      filter = {
        ...filter,
        sexo: new RegExp(sexo, 'gim')
      }
    }

    if (idade) {
      filter = {
        ...filter,
        idade
      }
    }

    if (hobby) {
      filter = {
        ...filter,
        hobby: new RegExp(hobby, 'gim')
      }
    }

    return DeveloperModel.Developer.find(filter)
      .limit(limit)
      .skip(limit * page)
      .exec()
  }

  async updateDeveloperById (developerId: string, developerFields: PutDeveloperDto) {
    const existingDeveloper = await DeveloperModel.Developer.findByIdAndUpdate(developerId,
      { $set: developerFields },
      { new: true }
    ).exec()

    return existingDeveloper
  }

  async removeDeveloperById (developerId: string) {
    return DeveloperModel.Developer.findByIdAndDelete(developerId).exec()
  }
}

export default new DevelopersDao()
