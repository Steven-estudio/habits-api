const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    // obtener header
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ message: "No hay token" });
    }

    // formato: Bearer TOKEN
    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Token inválido" });
    }

    // verificar token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // guardar userId en request
    req.userId = decoded.userId;

    next(); // continuar a la ruta
  } catch (error) {
    return res.status(401).json({ message: "Token inválido o expirado" });
  }
};
