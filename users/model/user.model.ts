import mongooseService from '../../common/services/mongoose.service'

class UserModel {
  Schema = mongooseService.getMongoose().Schema

  userSchema = new this.Schema({
    _id: String,
    email: String,
    password: { type: String, select: false },
    name: String
  },
  { id: false, timestamps: true })

  User = mongooseService.getMongoose().model('Users', this.userSchema)
}

export default new UserModel()
