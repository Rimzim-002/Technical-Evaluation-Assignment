import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import jwtmanager from '../src/utils/jwtmanager';
dotenv.config();

const SECRET_KEY = process.env.JWT_SECRET ;

class RoleMiddleware {
  authorizeRoles(...roles) {
    return (req, res, next) => {
      const authHeader = req.headers.authorization;

      if (!authHeader ) {
        return res.status(401).json({ message: 'Unauthorized: No token provided' });
      }

      const token = authHeader.split(' ')[1];

      try {
        const decoded = jwtmanager.verifyToken(token, SECRET_KEY);
        req.user = decoded; 

        if (!roles.includes(decoded.role)) {
          return res.status(403).json({ message: 'Forbidden: Access denied' });
        }

        next();
      } catch (err) {
        return res.status(401).json({ message: 'Unauthorized: Invalid token' });
      }
    };
  }
}

export default new RoleMiddleware();
