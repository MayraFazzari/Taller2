import express from 'express'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const router = express.Router()
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

router.get('/', (req, res) => {
  const productosPath = path.join(__dirname, '../data/productos.json')
  const data = fs.readFileSync(productosPath, 'utf-8')
  const productos = JSON.parse(data)
  res.json(productos)
})

export default router
