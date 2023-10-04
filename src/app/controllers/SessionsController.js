import * as Yup from "yup"
import jwt from "jsonwebtoken"
import User from "../models/User"

import authConfig from "../../config/auth"

/*
store => Cadastrar / Adicionar
index => Listar vários
show => Listar um único
update => Alterar
delete => Deletar

Apenas um método por controller
*/

class SessionController {
  async store(req, res) {
    const schema = Yup.object().shape({
      email: Yup.string().email().required(),
      password: Yup.string().required(),
    })

    const userEmailOrPasswordIncorret = () => {
      return res
        .status(401)
        .json({ error: "Make sure your email or password is correct" })
    }

    if (!(await schema.isValid(req.body))) userEmailOrPasswordIncorret()

    const { email, password } = req.body

    const user = await User.findOne({ where: { email } })

    if (!user) userEmailOrPasswordIncorret()

    if (!(await user.checkPassword(password))) userEmailOrPasswordIncorret()

    return res.json({
      id: user.id,
      email,
      name: user.name,
      admin: user.admin,
      token: jwt.sign({ id: user.id, name: user.name }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    })
  }
}

export default new SessionController()
