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

export function registerService({ email, password, nombre, apellido, direccion }) {
  if (!email || !password || !nombre || !apellido || !direccion) {
    return { status: 400, msg: 'Faltan datos' }
  }

  const emailValido = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
  if (!emailValido.test(email)) {
    return {
      status: 400,
      msg: 'El email debe ser una cuenta válida de Gmail (ej: nombre@gmail.com)'
    };
  }

 
  const contraseñaSegura = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
  if (!contraseñaSegura.test(password)) {
    return {
      status: 400,
      msg: 'La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula y un número.'
    };
  }

  const usuarios = leerUsuarios();
  const yaExiste = usuarios.find(u => u.email === email);
  if (yaExiste) {
    return { status: 400, msg: 'El mail ya está registrado' };
  }

  const nuevoUsuario = { email, password, nombre, apellido, direccion };
  usuarios.push(nuevoUsuario);
  guardarUsuarios(usuarios);

  return { status: 201, msg: 'Usuario registrado con éxito' };
}

export function loginService({ email, password }) {
  if (!email || !password) {
    return { status: 400, msg: 'Faltan datos' }
  }

  const usuarios = leerUsuarios()
  const usuario = usuarios.find(u => u.email === email && u.password === password)

  if (!usuario) {
    return { status: 401, msg: 'Credenciales incorrectas' }
  }

  return {
    status: 200,
    msg: 'Login exitoso',
    usuario: {
      email: usuario.email,
      nombre: usuario.nombre,
      apellido: usuario.apellido,
      direccion: usuario.direccion,
      carrito: usuario.carrito || []
    }
  }
}
