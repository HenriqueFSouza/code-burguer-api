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
      "postgresql://postgres:A*GF2DccE6cBa31EEFedB-GGa4-b36e2@monorail.proxy.rlwy.net:46591/railway",
    )
    models
      .map((model) => model.init(this.connection))
      .map(
        (model) => model.associate && model.associate(this.connection.models),
      )
  }

  mongo() {
    this.mongoConnection = mongoose.connect(
      "mongodb://mongo:AaFCAg1A3466Dgh4fHbgFC4hc1bACg2C@roundhouse.proxy.rlwy.net:23464",
      {
        useNewUrlParser: true,
      },
    )
  }
}

export default new Database()
