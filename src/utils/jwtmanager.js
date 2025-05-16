import jwt from 'jsonwebtoken';
import { config } from 'dotenv';
config()
const SECRET_KEY = process.env.JWT_SECRET_KEY


class JwtTokenManager {
  generateToken(payload, expiresIn = process.env.EXPIRES_IN) { // geneating token
    return jwt.sign(payload, SECRET_KEY, { expiresIn });
  }

  verifyToken(token) {
    try {
      return jwt.verify(token, SECRET_KEY);       // verifytoken
    } catch (error) {
      throw new Error('Invalid or expired token');
    }
  }
}

export default new JwtTokenManager();
