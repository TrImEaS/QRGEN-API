import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

export function generateAccessToken (user) {
  return jwt.sign(user, process.env.SECRET, {expiresIn: '60m'} )
}

export function validateToken(req, res, next){
  const accessToken = req.headers['Authorization'];
  if (!accessToken) {
    return res.status(401).send('Access denied');
  }

  jwt.verify(accessToken, process.env.SECRET, (err, user) => {
    if (err) {
      return res.status(403).send('Access denied, token expired or incorrect');
    } else {
      next();
    }
  });
}