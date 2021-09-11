import mongooseService from '../../common/services/mongoose.service'

class DeveloperModel {
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
}

export default new DeveloperModel()
