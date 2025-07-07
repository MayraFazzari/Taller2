import express from 'express'
import {agregarAlCarrito, obtenerCarrito, actualizarCantidad, eliminarDelCarrito} from '../controller/carrito.controller.js'

const router = express.Router()

router.post('/carrito/agregar', agregarAlCarrito)
router.get('/carrito/:email', obtenerCarrito)
router.put('/carrito/cantidad', actualizarCantidad)
router.delete('/carrito/:email/:productoId', eliminarDelCarrito) 

export default router