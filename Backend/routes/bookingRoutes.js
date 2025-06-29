import express from 'express';
import {checkAvailabilityForCar,createBooking, getUserBookings,getOwnerBookings,changeBookingStatus} from '../controllers/bookingController.js';
import {protect} from '../middlewares/Auth.js';
const bookingRouter = express.Router();


bookingRouter.post('/checkAvailability',checkAvailabilityForCar);
bookingRouter.post('/create', protect, createBooking);
bookingRouter.get('/user', protect, getUserBookings);
bookingRouter.get('/owner', protect, getOwnerBookings);
bookingRouter.post('/change-status', protect, changeBookingStatus);




export default bookingRouter;