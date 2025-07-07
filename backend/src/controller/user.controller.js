import {  registerService, loginService} from "../services/user.service.js";

export const register = (req, res) => {
  const respuesta = registerService(req.body);
  return res.status(respuesta.status).json({ msg: respuesta.msg });
};

export const login = (req, res) => {
  const respuesta = loginService(req.body);
 return res.status(respuesta.status).json({ msg: respuesta.msg, usuario: respuesta.usuario });

};