import express from 'express';
import { changeRoleToOwner } from '../controllers/ownerContoller.js';
import { protect } from '../middlewares/Auth.js';
const ownerRouter = express.Router();

ownerRouter.post('/change-role', protect,changeRoleToOwner)

export default ownerRouter;