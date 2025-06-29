import express from 'express';
import { changeRoleToOwner , addCar, getOwnerCars, toggleCarAvailability, deleteCar ,getDashboardData, updateUserImage} from '../controllers/ownerContoller.js';
import { protect } from '../middlewares/Auth.js';
import upload from '../middlewares/multer.js';


const ownerRouter = express.Router();

ownerRouter.post('/change-role', protect,changeRoleToOwner)

ownerRouter.post('/add-car',upload.single('image'),protect,addCar)

ownerRouter.get('/cars',protect,getOwnerCars)

ownerRouter.post('/toggle-car',protect,toggleCarAvailability)

ownerRouter.delete('/delete-car,',protect,deleteCar)

ownerRouter.get('/dashboard',protect,getDashboardData)

ownerRouter.post('/update-image',upload.single('image') ,protect,updateUserImage)

export default ownerRouter;