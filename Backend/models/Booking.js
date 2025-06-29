import e from 'express';
import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const BookingSchema = new Schema({
    car: {
        type: Schema.Types.ObjectId,
        ref: 'Car',
        required: true,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    pickupDate: {
        type: Date,
        required: true,
    },
    returnDate: {
        type: Date,
        required: true,
    },
    status: {
        type: String,
        enum: ['pending', 'confirmed', 'cancelled'],
        required: true,
        default: 'pending',
    },
    price:{
        type:Number,
        required:true,
    }
}, { timestamps: true });

const Booking = mongoose.model('Booking', BookingSchema);

export default Booking;