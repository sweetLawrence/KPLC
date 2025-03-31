const jwt = require('jsonwebtoken')
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY

function tokenize (id, email, role) {
  return jwt.sign({ id, email, role }, JWT_SECRET_KEY, { expiresIn: '24h' })
}

module.exports = {
  tokenize
}
