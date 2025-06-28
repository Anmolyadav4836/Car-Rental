import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import 'dotenv/config';


export const protect = async (req,res,next)=>{
    try{
        const token = req.headers.authorization;
        if(!token){
            return res.status(401).json({message:'No token provided'})
        }
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        req.user = await User.findById(decoded.userId).select("-password");
        next();
    }catch(error){
        console.log(error.message)
        res.status(500).json({
            success:false,
            message:'Not authorized'
        })
    }
}
