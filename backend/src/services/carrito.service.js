import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const usuariosPath = path.join(__dirname, '../data/usuarios.json')

function leerUsuarios() {
  const data = fs.readFileSync(usuariosPath, 'utf-8')
  return JSON.parse(data)
}

function guardarUsuarios(usuarios) {
  fs.writeFileSync(usuariosPath, JSON.stringify(usuarios, null, 2))
}

export function agregarProductoAlCarrito(email, producto) {
  const usuarios = leerUsuarios()
  const usuario = usuarios.find(u => u.email === email)

  if (!usuario) {
    return { status: 404, msg: 'Usuario no encontrado' }
  }

  if (!usuario.carrito) {
    usuario.carrito = []
  }

  const existente = usuario.carrito.find(p => p.id === producto.id)
  if (existente) {
    existente.cantidad += producto.cantidad ?? 1 
  } else {
    usuario.carrito.push({ ...producto, cantidad: producto.cantidad ?? 1 })
  }

  guardarUsuarios(usuarios)
  return { status: 200, msg: 'Producto agregado al carrito' }
}

export function obtenerCarritoDeUsuario(email) {
  const usuarios = leerUsuarios()
  const usuario = usuarios.find(u => u.email === email)

  if (!usuario) {
    return { status: 404, msg: 'Usuario no encontrado' }
  }

  return { status: 200, carrito: usuario.carrito || [] }
}

export function actualizarCantidadProducto(email, productoId, cantidad) {
  const usuarios = leerUsuarios()
  const usuario = usuarios.find(u => u.email === email)

  if (!usuario) return { status: 404, msg: 'Usuario no encontrado' }

  const producto = usuario.carrito?.find(p => p.id === productoId)
  if (!producto) return { status: 404, msg: 'Producto no encontrado' }

  producto.cantidad = cantidad
  guardarUsuarios(usuarios)
  return { status: 200, msg: 'Cantidad actualizada' }
}

export function eliminarProductoDelCarrito(email, productoId) {
  const usuarios = leerUsuarios()
  const usuario = usuarios.find(u => u.email === email)

  if (!usuario) return { status: 404, msg: 'Usuario no encontrado' }

  usuario.carrito = usuario.carrito?.filter(p => p.id !== productoId) || []
  guardarUsuarios(usuarios)
  return { status: 200, msg: 'Producto eliminado' }
}