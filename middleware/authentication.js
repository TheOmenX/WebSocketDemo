const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();
const jwt_secret = process.env.JWT_SECRET;

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
  
    if (token == null) return res.sendStatus(401)
  
    jwt.verify(token, jwt_secret, (err, user) => {  
      if (err) return res.sendStatus(403)
  
      req.user = user
  
      next()
    })
}

module.exports = { authenticateToken };