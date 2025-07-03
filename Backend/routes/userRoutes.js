import express from 'express';
import {registerUser,loginUser, getUserData, getCars, updateUserProfile } from '../controllers/userController.js';
import { protect } from '../middlewares/Auth.js';

const userRouter = express.Router();

userRouter.post('/register',registerUser)
userRouter.post('/login',loginUser)
userRouter.get('/data',protect,getUserData)
userRouter.get('/cars',getCars)
userRouter.post('/update-profile',protect,updateUserProfile)

export default userRouter;