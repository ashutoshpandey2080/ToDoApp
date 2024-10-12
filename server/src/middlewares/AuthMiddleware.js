import { jsonGenerate } from "../utils/helper.js"
import JWT from 'jsonwebtoken';

const AuthMiddleware = (req, res, next) => {
    if(req.headers['auth'] === undefined){
        return res.send(jsonGenerate(401, "Access denied"));
    }
    const token = req.headers['auth'];
    
    try {
        const decoded = JWT.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.userId;
        next();
    } catch (error) {
        return res.send(jsonGenerate(401, "Invalid Token"));
    }
}

export default AuthMiddleware;