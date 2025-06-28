import User from "../models/User.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import 'dotenv/config';

//Generate token
const generateAuthToken = (userId)=>{
    const payload = {userId};
    return jwt.sign(payload,process.env.JWT_SECRET,{expiresIn:'1h'});
}

//regiter user
export const registerUser = async (req,res)=>{
    try{
            const {name,email,password} = req.body;

            if(!name || !email || !password || password.length<6){
                return res.status(400).json({
                    success:false,
                    message:'Please provide all the details or choose strong password'})
            }

            const userExists = await User.findOne({email});
            if(userExists){
                return res.status(400).json({
                    success:false,
                    message:'User already exists'})
            }

            const hashedPassword = await bcrypt.hash(password,10);
            const user = new User({name,email,password:hashedPassword});
            await user.save();

            //generate token
            const token = generateAuthToken(user._id.toString());

            return res.status(200).json({
                success:true,
                token,
                message:'User registered successfully',
                user
            })
    }catch(error){
        console.log(error.message)
        res.status(500).json({message:'Error in registering user'})
    }
}

//login user
export const loginUser = async (req,res)=>{
    try{
        const {email,password}=req.body;
        if(!email || !password){
            return res.status(400).json({success:false,message:'Please provide email and password'})
        }
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({success:false,message:'User not found'})
        }
        const isPasswordMatched = await bcrypt.compare(password,user.password);
        if(!isPasswordMatched){
            return res.status(400).json({success:false,message:'Invalid password'})
        }
        //generate token
        const token = generateAuthToken(user._id.toString());
        return res.status(200).json({
            success:true,
            token,
            message:'User logged in successfully',
            user
        })
    }catch(error){
        console.log(error.message)
        res.status(500).json({message:'Error in logging in user'})
    }
}

//Get User data using token(JWT)
export const getUserData = async (req,res)=>{
    try{
        const {user} = req;
        res.status(200).json({success:true,user})
    }catch(error){
        console.log(error.message)
        res.status(500).json({message:'Error in getting user data'})
    }
}