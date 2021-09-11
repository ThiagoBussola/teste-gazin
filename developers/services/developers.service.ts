import DevelopersDao from '../daos/developers.dao'
import { CRUD } from '../../common/interfaces/crud.interface'
import { CreateDeveloperDto } from '../dto/create.developer.dto'
import { PutDeveloperDto } from '../dto/put.developer.dto'

class DevelopersService implements CRUD {
  async create (resource: CreateDeveloperDto) {
    return await DevelopersDao.addDeveloper(resource)
  }

  async findById (id: string) {
    return await DevelopersDao.getDeveloperById(id)
  }

  // we are accepting number as a string as it will be passed by the request parameter
  async listDevelopers (nome: string, sexo: string, idade: string, hobby: string, limit: number, page: number) {
    return await DevelopersDao.getDevelopers(nome, sexo, idade, hobby, limit, page)
  }

  async putById (id: string, resource: PutDeveloperDto): Promise<any> {
    return await DevelopersDao.updateDeveloperById(id, resource)
  }

  async deleteById (id: string) {
    return await DevelopersDao.removeDeveloperById(id)
  }
}

export default new DevelopersService()
