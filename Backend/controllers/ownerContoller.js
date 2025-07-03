import User from "../models/User.js";
import Car from "../models/Car.js";
import Booking from "../models/Booking.js";
import fs from 'fs';
import imageKit from '../config/imageKit.js';
//API to change user role to owner
export const changeRoleToOwner = async (req,res)=>{
    try{
        const {_id} = req.user;
        const user = await User.findById(_id);
        user.role = 'owner';
        await user.save();
        return res.status(200).json({success:true,message:'User role changed to owner'})
        
    }catch(error){
        console.log(error.message)
        res.status(500).json({success:false,message:'Error in changing user role'})
    }
}

//add new car
export const addCar = async (req,res)=>{
    try{
        const {_id} = req.user;
        let car = JSON.parse(req.body.cardata);

        const imageFile = req.file;

        //Upload image to imagekit
        const fileBuffer = fs.readFileSync(imageFile.path);
        const response = await imageKit.upload({
            file: fileBuffer,
            fileName: imageFile.originalname,
            folder: "/cars",
        })
        
        
        // optimization through imageKit Urltransformation
        var optimizedImageUrl = imageKit.url({
            path : response.filePath,
            transformation : [
                {width : '1280'}, //width resize
                {quality: 'auto'}, //Auto compression
                {format: 'webp'}, //convert to modern formate
            ]
        });

        const image = optimizedImageUrl;
        await Car.create({...car,image,owner:_id});

        return res.status(200).json({success:true,message:'Car added successfully'})

    }catch(error){
        console.log(error.message)
        res.status(500).json({success:false,message:'Error in adding car'})
    }
}

//API to get all List Owener Cars

export const getOwnerCars = async (req,res)=>{
    try{
        const {_id} = req.user;
        const cars = await Car.find({owner:_id});
        return res.status(200).json({success:true,cars})
    }catch(error){
        console.log(error.message)
        res.status(500).json({success:false,message:'Error in getting owner cars'})
    }
}

//Api to Toggle Car Availability
export const toggleCarAvailability = async (req,res)=>{
    
    try{
        const {_id} = req.user;
        const {carId} = req.body;
        const car = await Car.findById(carId);

        //checking is car belongs to user or not 
        if(car.owner.toString() !== _id.toString()){
            return res.status(400).json({success:false,message:'Car does not belong to user'})
        }

        car.isAvailable = !car.isAvailable;
        await car.save();
        return res.status(200).json({success:true,message:'Car availability toggled successfully'})

    }catch(error){
        console.log(error.message)
        res.status(500).json({success:false,message:'Error in toggling car availability'})
    }
}

//Api to delete a car
export const deleteCar = async (req,res)=>{
    
    try{
        const {_id} = req.user;
        const {carId} = req.body;
        const car = await Car.findById(carId);

        //checking is car belongs to user or not 
        if(car.owner.toString() !== _id.toString()){
            return res.status(400).json({success:false,message:'Car does not belong to user'})
        }

        // car.owner = null;
        car.isAvailable = false; //we'll not delete the car from imagekit as it had been used by other users
        await car.save();
        return res.status(200).json({success:true,message:'Car deleted successfully'})
    }catch(error){
        console.log(error.message)
        res.status(500).json({success:false,message:'Error in deleting '})
    }
}

//Api to get dashboard data
export const getDashboardData = async (req,res)=>{
    try{
        const {_id, role} = req.user;
        if(role !== 'owner'){
            return res.status(400).json({success:false,message:'User does not have owner role'})
        }

        const cars = await Car.find({owner:_id});
        const bookings = await Booking.find({owner:_id}).populate('car').sort({createdAt:-1});

        const pendingBookings = bookings.filter(b => b.status === 'pending');
        const completedBookings = bookings.filter(b => b.status === 'confirmed');

        // Calculate monthly revenue from completed bookings
        const monthlyRevenue = completedBookings.reduce((acc, booking) => acc + booking.price, 0);

        const dashboardData = {
            totalCars:cars.length,
            totalBookings:bookings.length,
            pendingBookings:pendingBookings.length,
            completedBookings:completedBookings.length,
            recentBookings:bookings.slice(0,3),
            monthlyRevenue
        };
        return res.status(200).json({success:true,cars,dashboardData})


        
    }catch(error){
        console.log(error.message)
        res.status(500).json({success:false,message:'Error in getting dashboard data'})
    }
}

//api to update user image
export const updateUserImage = async (req,res)=>{
    try{
        const {_id} = req.user;
        const imageFile = req.file;

        //Upload image to imagekit
        const fileBuffer = fs.readFileSync(imageFile.path);
        const response = await imageKit.upload({
            file: fileBuffer,
            fileName: imageFile.originalname,
            folder: "/users",
        })
        
        
        // optimization through imageKit Urltransformation
        var optimizedImageUrl = imageKit.url({
            path : response.filePath,
            transformation : [
                {width : '400'}, //width resize
                {quality: 'auto'}, //Auto compression
                {format: 'webp'}, //convert to modern formate
            ]
        });

        const image = optimizedImageUrl;
        await User.findByIdAndUpdate(_id,{image});

        return res.status(200).json({success:true,message:'User image updated successfully'})
    }catch(error){
        console.log(error.message)
        res.status(500).json({success:false,message:'Error in updating user image'})
    }
}