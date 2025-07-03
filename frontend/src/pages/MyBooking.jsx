import React, { useEffect, useState } from 'react'
import { assets } from '../assets/assets';
import Title from '../components/Title';
import { useAppContext } from '../context/AppContext';
import toast from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';

const MyBooking = () => {

    const { axios, user } = useAppContext();
    const [bookings, setBookings] = useState([]);

    const fetchMyBookings = async () => {
        try {
            const { data } = await axios.get('/api/bookings/user');
            if (data.success) {
                setBookings(data.bookings);
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    useEffect(() => {
        user && fetchMyBookings();
    }, [user])

    useEffect(() => {
        // For debugging
        console.log("bookings data", bookings);
    }, [bookings]);

    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.7 }}
            className="px-6 md:px-16 lg:px-24 xl:px-32 2xl:px-48 mt-16 text-sm max-w-7xl"
        >
            <Title title="My Bookings" subTitle="View and manage your car bookings" align="left" />

            <div>
                <AnimatePresence>
                    {bookings.map((booking, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 40 }}
                            transition={{ duration: 0.7, delay: 0.2 + index * 0.08 }}
                            className='grid grid-cols-1 md:grid-cols-4 gap-6 p-6 border border-borderColor rounded-lg mt-5 first:mt-12'
                        >
                            {/* car image and Info*/}
                            <div className='md:col-span-1'>
                                <div className='rounded-lg overflow-hidden mb-3'>
                                    {booking.car ? (
                                        <img src={booking.car.image} alt="" className='w-full h-auto aspect-video object-cover' />
                                    ) : (
                                        <div className="w-full h-32 bg-gray-100 flex items-center justify-center text-gray-400">
                                            No Car Data
                                        </div>
                                    )}
                                </div>
                                <p className='text-lg font-medium mt-2'>
                                    {booking.car ? `${booking.car.brand} ${booking.car.model}` : 'Unknown Car'}
                                </p>
                                <p className='text-gray-500'>
                                    {booking.car ? `${booking.car.year} • ${booking.car.category} • ${booking.car.location}` : ''}
                                </p>
                            </div>

                            {/* booking info */}
                            <div className='md:col-span-2'>
                                <div className='flex items-center gap-2'>
                                    <p className='px-3 py-1.5 bg-light rounded'>Booking #{index + 1}</p>
                                    <p className={`px-3 py-1 text-xs rounded-full ${booking.status === 'confirmed' ? 'bg-green-400/15 text-green-600' : booking.status === 'pending' ? 'bg-yellow-400/15 text-yellow-600' : 'bg-red-400/15 text-red-600'}`}>{booking.status}</p>
                                </div>

                                <div className='flex items-start gap-2 mt-3'>
                                    <img src={assets.calendar_icon_colored} alt="calendar icon" className='h-4 w-4 mt-1' />
                                    <div>
                                        <p className='text-gray-500'>Rental Period</p>
                                        <p className=''>{booking.pickupDate.split('T')[0]} - {booking.returnDate}</p>
                                    </div>
                                </div>

                                <div className='flex items-start gap-2 mt-3'>
                                    <img src={assets.location_icon_colored} alt="calendar icon" className='h-4 w-4 mt-1' />
                                    <div>
                                        <p className='text-gray-500'>Pick-up Location</p>
                                        <p className=''>
                                            {booking.car ? booking.car.location : 'No Car Data'}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* price */}
                            <div className='md:col-span-1 flex flex-col justify-between gap-6'>
                                <div className='text-sm text-gray-500 text-right'>
                                    <p>Total Price</p>
                                    <h1 className='text-2xl font-semibold text-primary'>${booking.price}</h1>
                                    <p>Booked on {booking.createdAt.split('T')[0]}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </motion.div>
    )
}

export default MyBooking;