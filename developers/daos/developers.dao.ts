import { CreateDeveloperDto } from '../dto/create.developer.dto'
import { PutDeveloperDto } from '../dto/put.developer.dto'

import mongooseService from '../../common/services/mongoose.service'

import shortid from 'shortid'
import debug from 'debug'

const log: debug.IDebugger = debug('app:in-memory-dao')

class DevelopersDao {
  Schema = mongooseService.getMongoose().Schema

  developerSchema = new this.Schema({
    _id: String,
    nome: String,
    sexo: String,
    idade: Number,
    hobby: String,
    datanascimento: Date
  },
  { id: false, timestamps: true })

  Developer = mongooseService.getMongoose().model('Developers', this.developerSchema)

  constructor () {
    log('Created new instance of DevelopersDao')
  }

  async addDeveloper (developerFields: CreateDeveloperDto) {
    const developerId = shortid.generate()
    const developer = new this.Developer({
      _id: developerId,
      ...developerFields
    })

   return await developer.save()
  }

  async getDeveloperById (developerId: string) {
    return this.Developer.findById({ _id: developerId }).exec()
  }

  async getDevelopers (limit = 25, page = 0, nome: string, sexo: string, idade: string, hobby: string) {

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

    return this.Developer.find(filter)
      .limit(limit)
      .skip(limit * page)
      .exec()
  }

  async updateDeveloperById (developerId: string, developerFields: PutDeveloperDto) {
    const existingDeveloper = await this.Developer.findByIdAndUpdate(developerId,
      { $set: developerFields },
      { new: true }
    ).exec()

    return existingDeveloper
  }

  async removeDeveloperById (developerId: string) {
    return this.Developer.findByIdAndDelete(developerId).exec()
  }
}

export default new DevelopersDao()
