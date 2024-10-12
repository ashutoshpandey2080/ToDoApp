import { validationResult } from 'express-validator';
import { jsonGenerate } from '../utils/helper.js';
import { statusCodes } from '../utils/constants.js';
import bcrypt from 'bcrypt';
import User from '../models/user.js';
import JWT  from 'jsonwebtoken';

const Login = async (req, res) => {
    const errors = validationResult(req);
    if(errors.isEmpty()){
        const {username, password} = req.body;
        const user = await User.findOne({username : username});
        if(!user){
            return res.send(jsonGenerate(statusCodes.UNAUTHORIZED, "User Not Found", user));
        }
        const verified = await bcrypt.compare(password, user.password);

            if(!verified){
                return res.send(jsonGenerate(statusCodes.UNAUTHORIZED, "Incorrect Password", user));
            }
            const token = JWT.sign({userId : user._id}, process.env.JWT_SECRET, {expiresIn : "7d"});
            return res.json(jsonGenerate(statusCodes.OK, "Login Successful", {userId : user._id, token : token}));
    }
    return res.send(jsonGenerate(statusCodes.BAD_REQUEST, "Incorrect/Incomplete Credentials", errors));
}

export default Login;