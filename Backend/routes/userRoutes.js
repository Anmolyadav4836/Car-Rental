import express from 'express';
import {registerUser,loginUser, getUserData} from '../controllers/userController.js';
import { protect } from '../middlewares/Auth.js';

const userRouter = express.Router();

userRouter.post('/register',registerUser)
userRouter.post('/login',loginUser)
userRouter.get('/data',protect,getUserData)

export default userRouter;