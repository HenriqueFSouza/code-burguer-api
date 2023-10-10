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
      "postgresql://postgres:wfEtke0mPtMT7YZerPx7@containers-us-west-182.railway.app:5912/railway",
    )
    models
      .map((model) => model.init(this.connection))
      .map(
        (model) => model.associate && model.associate(this.connection.models),
      )
  }

  mongo() {
    this.mongoConnection = mongoose.connect(
      "mongodb://mongo:106kxarktIzKXLYtlcfg@containers-us-west-31.railway.app:6291",
      {
        useNewUrlParser: true,
      },
    )
  }
}

export default new Database()
