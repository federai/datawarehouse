const jwt = require("jsonwebtoken");
const sequelize = require("../database/connection");
const jwtPass = "password";

const hashPassword= (req, res,next) => {
  let contrasenia= req.body.contrasenia;
  req.body.contrasenia= md5(contrasenia);
  next();
}
const autenticarUsuario = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    console.log(token)
    const verificartoken = jwt.verify(token, jwtPass);
    if (verificartoken) {
      req.usuario = verificartoken;
      return next();
    }
  } catch (err) {
    res.json({
      error: "Error validad usuario",
    });
  }
};

const isAdmin = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const verificartoken = jwt.verify(token, jwtPass);
    console.log(verificartoken.admin)
    if (verificartoken.admin === '1') {
      return next();
    }
    throw new Error();
  } catch (err) {
    res.status(403).json({ message: "Forbidden" });
  }
};

module.exports = {hashPassword,autenticarUsuario,isAdmin
};
