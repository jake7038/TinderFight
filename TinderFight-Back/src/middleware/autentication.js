const jwt = require("jsonwebtoken");

function autenticarToken(req, res, next) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1]; // Bearer <token>

  if (!token) {
    return res.status(401).json({ mensagem: "Token não fornecido." });
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = payload;
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
        return res.status(401).json({ mensagem: "Token expirado." });
    }
    return res.status(403).json({ mensagem: "Token Inválido." });
  }
}

module.exports = autenticarToken;
