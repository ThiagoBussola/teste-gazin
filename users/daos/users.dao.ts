import { CreateUserDto } from '../dto/create.user.dto'
import { PatchUserDto } from '../dto/patch.user.dto'
import { PutUserDto } from '../dto/put.user.dto'
import UserModel from '../model/user.model'

import { v4 as uuid4 } from 'uuid'
import debug from 'debug'

const log: debug.IDebugger = debug('app:in-memory-dao')
class UsersDao {
  constructor () {
    log('Created new instance of UsersDao')
  }

  async addUser (userFields: CreateUserDto) {
    const userId = uuid4()
    const user = await UserModel.User.create({
      _id: userId,
      ...userFields
    })

    // as we are going to return the entire user in the route the select false doesn't work in .save(),
    // so we are doing the search for the newly created user and returning it without the password
    const findNewUSer = await this.getUserById(user._id)

    return findNewUSer
  }

  async getUserByEmail (email: string) {
    return UserModel.User.findOne({ email: email }).exec()
  }

  // this function is necessary to have the password as we are inhibiting the user from searching the password in any route
  // through mongoose and filters in searches.
  async getUserByEmailWithPassword (email: string) {
    return UserModel.User.findOne({ email: email }).select('_id email +password')
  }

  async getUserById (userId: string) {
    return UserModel.User.findById({ _id: userId }).exec()
  }

  async getUsers (limit = 25, page = 0) {
    return UserModel.User.find()
      .limit(limit)
      .skip(limit * page)
      .exec()
  }

  async updateUserById (userId: string, userFields: PatchUserDto | PutUserDto) {
    const existingUser = UserModel.User.findByIdAndUpdate(userId,
      { $set: userFields },
      { new: true }
    ).exec()

    return existingUser
  }

  async removeUserById (userId: string) {
    return UserModel.User.findByIdAndDelete(userId).select('-password').exec()
  }
}

export default new UsersDao()
