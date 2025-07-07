import {agregarProductoAlCarrito, obtenerCarritoDeUsuario, actualizarCantidadProducto, eliminarProductoDelCarrito} from '../services/carrito.service.js'

export const agregarAlCarrito = (req, res) => {
  const { email, producto } = req.body
  const respuesta = agregarProductoAlCarrito(email, producto)
  res.status(respuesta.status).json({ msg: respuesta.msg })
}

export const obtenerCarrito = (req, res) => {
  const { email } = req.params
  const respuesta = obtenerCarritoDeUsuario(email)

  if (respuesta.status === 404) {
    return res.status(404).json({ msg: 'Usuario no encontrado' })
  }

  res.json(respuesta.carrito)
}

export const actualizarCantidad = (req, res) => {
  const { email, productoId, cantidad } = req.body;
  const respuesta = actualizarCantidadProducto(email, parseInt(productoId), cantidad);
  res.status(respuesta.status).json({ msg: respuesta.msg });
};

export const eliminarDelCarrito = (req, res) => {
  const { email, productoId } = req.params;
  const respuesta = eliminarProductoDelCarrito(email, parseInt(productoId));
  res.status(respuesta.status).json({ msg: respuesta.msg });
};