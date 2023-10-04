import multer from "multer"
import { v4 } from "uuid"
import { extname, resolve } from "path"

// extname => retorna a extensão do arquivo
export default {
  storage: multer.diskStorage({
    destination: resolve(__dirname, "..", "..", "uploads"),
    filename: (req, file, callback) => {
      return callback(null, v4() + extname(file.originalname))
    },
  }),
}
