import { Router } from "express"
import multer from "multer"
import multerConfig from "./config/multer"

import UserController from "./app/controllers/UserController"
import SessionsController from "./app/controllers/SessionsController"
import ProductController from "./app/controllers/ProductController"
import authMiddleware from "./app/middlewares/auth"
import CategoryController from "./app/controllers/CategoryController"
import OrderController from "./app/controllers/OrderController"

const routes = new Router()

const upload = multer(multerConfig)

routes.post("/users", UserController.store)

routes.post("/sessions", SessionsController.store)

routes.use(authMiddleware) // Será chamado por todas as rotas abaixo
routes.post("/products", upload.single("file"), ProductController.store)
routes.get("/products", ProductController.index)
routes.put("/products/:id", upload.single("file"), ProductController.update)

routes.post("/categories", upload.single("file"), CategoryController.store)
routes.get("/categories", CategoryController.index)
routes.put("/categories/:id", upload.single("file"), CategoryController.update)

routes.post("/orders", OrderController.store)
routes.put("/orders/:id", OrderController.update)
routes.get("/orders", OrderController.index)

export default routes
