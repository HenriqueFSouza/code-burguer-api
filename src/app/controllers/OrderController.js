import * as Yup from "yup"
import Products from "../models/Products"
import Category from "../models/Category"
import Order from "../schemas/Order"
import User from "../models/User"

/*
store => Cadastrar / Adicionar
index => Listar vários
show => Listar um único
update => Alterar
delete => Deletar

Apenas um método por controller
*/

class OrderController {
  async store(req, res) {
    const schema = Yup.object().shape({
      products: Yup.array()
        .required()
        .of(
          Yup.object().shape({
            id: Yup.number().required(),
            quantity: Yup.number().required(),
          }),
        ),
    })

    try {
      await schema.validateSync(req.body, { abortEarly: false })
    } catch (err) {
      return res.status(400).json({ error: err.errors })
    }

    const productsId = req.body.products.map((product) => product.id)

    const updatedPorducts = await Products.findAll({
      where: {
        id: productsId,
      },
      include: [
        {
          model: Category,
          as: "category",
          attributes: ["name"],
        },
      ],
    })

    const editedProduct = updatedPorducts.map((product) => {
      const productIndex = req.body.products.findIndex(
        (reqProduct) => reqProduct.id === product.id,
      )

      const newProduct = {
        id: product.id,
        name: product.name,
        price: product.price,
        category: product.category.name,
        url: product.url,
        quantity: req.body.products[productIndex].quantity,
      }

      return newProduct
    })

    const order = {
      user: {
        id: req.userId,
        name: req.userName,
      },
      products: editedProduct,
      status: "Pedido realizado",
    }

    const orderResponse = await Order.create(order)

    return res.status(201).json(orderResponse)
  }

  async index(req, res) {
    const orders = await Order.find()

    return res.json(orders)
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      status: Yup.string().required(),
    })

    try {
      await schema.validateSync(req.body, { abortEarly: false })
    } catch (err) {
      return res.status(400).json({ error: err.errors })
    }

    const { admin: isAdmin } = await User.findByPk(req.userId)

    if (!isAdmin) {
      return res.status(401).json()
    }
    const { id } = req.params
    const { status } = req.body

    try {
      await Order.updateOne({ _id: id }, { status })
    } catch (err) {
      return res.status(400).json({ error: err.message })
    }

    return res.json({ message: "Status was updated successfully" })
  }
}

export default new OrderController()
