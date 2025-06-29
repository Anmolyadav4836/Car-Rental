import Booking from "../models/Booking.js";
import Car from "../models/Car.js";


//Function to check car availability for a given date
export const checkAvailability = async (car,pickupDate,returnDate)=>{
    const booking = await Booking.find({
        car,
        pickupDate: {$lte:returnDate},
        returnDate: {$gte:pickupDate},
    })
    return booking.length === 0;
}

//Api to check Availability of cars for the given Date and location
export const checkAvailabilityForCar = async (req, res) => {
    try {
        const { pickupDate, returnDate, location } = req.body;
        // Find all available cars in the location
        const cars = await Car.find({ location, isAvailable: true });
        if (!cars || cars.length === 0) {
            return res.status(400).json({ success: false, message: 'No cars found' });
        }

        // Check each car's availability for the given dates
        const availableCars = (
            await Promise.all(
                cars.map(async (car) => {
                    const isAvailable = await checkAvailability(car._id, pickupDate, returnDate);
                    return isAvailable ? { ...car._doc, isAvailable } : null;
                })
            )
        ).filter(car => car !== null);

        return res.status(200).json({ success: true, availableCars });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ success: false, message: 'Error in checking availability' });
    }
}

//Api to Create a booking for a car
export const createBooking = async (req, res) => {
    try {
        const { _id } = req.user; // This is the user's ID
        const { car, pickupDate, returnDate } = req.body;

        // Check if the car exists
        const carData = await Car.findById(car);
        if (!carData) {
            return res.status(404).json({ success: false, message: 'Car not found' });
        }

        // Check if the car is available for the given dates
        const isAvailable = await checkAvailability(car, pickupDate, returnDate);
        if (!isAvailable) {
            return res.status(400).json({ success: false, message: 'Car is not available for the given dates' });
        }

        // Calculate price based on pickup and return date
        const picked = new Date(pickupDate);
        const returned = new Date(returnDate);
        const noOfDays = Math.ceil((returned - picked) / (1000 * 60 * 60 * 24));
        const price = carData.pricePerDay * noOfDays;

        // Create a booking for the car
        await Booking.create({
            user: _id, // Store user ID in 'user' field
            car,
            owner: carData.owner,
            pickupDate,
            returnDate,
            price,
        });

        return res.status(200).json({ success: true, message: 'Booking created successfully' });

    } catch (error) {
        console.log(error.message);
        res.status(500).json({ success: false, message: 'Error in creating booking' });
    }
}

//Api to get bookings for a user
export const getUserBookings = async (req,res)=>{
    try{
        const {_id} = req.user;
        const bookings = await Booking.find({user:_id}).populate('car').sort({createdAt:-1});

        return res.status(200).json({success:true,bookings})
    }catch(error){
        console.log(error.message)
        res.status(500).json({success:false,message:'Error in getting bookings'})
    }
}

// Api to get booking details for a owner
export const getOwnerBookings = async (req, res) => {
    try {
        if (req.user.role !== 'owner') { 
            return res.status(401).json({ success: false, message: 'Unauthorized' });
        }

        const { _id } = req.user;
        // Find bookings where the owner is the current user, populate car and user details, sort by newest first
        const bookings = await Booking.find({ owner: _id })
            .populate('car')
            .populate('user', '-password')
            .sort({ createdAt: -1 });

        // Optional: check if no bookings found
        // if (!bookings || bookings.length === 0) {
        //     return res.status(404).json({ success: false, message: 'No bookings found' });
        // }

        return res.status(200).json({ success: true, bookings });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ success: false, message: 'Error in getting bookings' });
    }
}
//Api to change the status of a booking only for owner
export const changeBookingStatus = async (req,res)=>{
    try{
        if(req.user.role !== 'owner'){ 
            return res.status(401).json({success:false,message:'Unauthorized'})
        }

        const {_id} = req.user;
        const {bookingId,status} = req.body;

        const booking = await Booking.findById(bookingId);
        if(!booking){
            return res.status(400).json({success:false,message:'Booking not found'})
        }
        if(booking.owner.toString() !== _id.toString()){
            return res.status(401).json({success:false,message:'Unauthorized'})
        }

        await Booking.findByIdAndUpdate(bookingId,{status});

        return res.status(200).json({success:true,message:'Booking status changed successfully'})

    }catch(error){ 
        console.log(error.message)
        res.status(500).json({success:false,message:'Error in changing booking status'})
    }
}

