import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import jwtmanager from '../utils/jwtmanager.js';
import Messages from "../utils/messageManager.js"
dotenv.config();

const SECRET_KEY = process.env.JWT_SECRET ;

class RoleMiddleware {
  authorizeRoles(...roles) {
    return (req, res, next) => {
      const authHeader = req.headers.authorization;

      if (!authHeader ) {
        return res.status(401).json({ message:Messages.AUTH.TOKEN_MISSING });
      }

      const token = authHeader.split(' ')[1];

      try {
        const decoded = jwtmanager.verifyToken(token, SECRET_KEY);
        req.user = decoded; 

        if (!roles.includes(decoded.role)) {
          return res.status(403).json({ message:Messages.AUTH.ACCESS_DENIED });
        }

        next();
      } catch (err) {
        return res.status(401).json({ message:Messages.AUTH.TOKEN_INVALID });
      }
    };
  }
}

export default new RoleMiddleware();
