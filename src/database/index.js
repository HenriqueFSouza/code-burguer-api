import Sequelize from "sequelize"
import mongoose from "mongoose"

import User from "../app/models/User"
import configDatabase from "../config/database"
import Products from "../app/models/Products"
import Category from "../app/models/Category"

const models = [User, Products, Category]
class Database {
  constructor() {
    this.init()
    this.mongo()
  }
  init() {
    this.connection = new Sequelize(
      "postgresql://postgres:mZHPBSDvuDUwA49p7QO4@containers-us-west-69.railway.app:7074/railway",
    )
    models
      .map((model) => model.init(this.connection))
      .map(
        (model) => model.associate && model.associate(this.connection.models),
      )
  }

  mongo() {
    this.mongoConnection = mongoose.connect(
      "mongodb://mongo:NbRKgK5UkmlzFHlD23Fp@containers-us-west-53.railway.app:5601",
      {
        useNewUrlParser: true,
      },
    )
  }
}

export default new Database()
