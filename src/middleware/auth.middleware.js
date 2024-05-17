import  jwt from 'jsonwebtoken';
import userModel from '../../DB/models/user.model.js';


const checkAuth = async (req, res , next) => 
{
    const { authorization } = req.headers;
    if (!(authorization.startsWith(process.env.BEARER_TOKEN))) {
        return res.json({ message: "not authorized user" });
    }
    const token = authorization.split(process.env.BEARER_TOKEN)[1];
    if (!token) {
        return res.json({ message: "not authorized user" });
    }
        const decode = await jwt.verify(token, process.env.LOG_IN_SIGN);
        const { id } = decode;
        const authorizedUser =  await userModel.findById(id).select("userName");// userName and the id will be returned in the authorizedUser object 
        req.authUser = authorizedUser;
        next(); 
};


export default checkAuth;