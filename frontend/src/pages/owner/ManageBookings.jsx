import React, { useEffect, useState } from 'react'
import Title from '../../components/owner/Title'
import { useAppContext } from '../../context/AppContext'
import toast from 'react-hot-toast'
import { motion, AnimatePresence } from 'framer-motion'

const ManageBookings = () => {

  const {axios} = useAppContext();

  const [bookings , setBookings] = useState([])

  const fetchOwnerBookings = async () => {
    try{
        const {data} = await axios.get('/api/bookings/owner');
        if(data.success){
          setBookings(data.bookings);
        }else{
          console.log(data.message)
        }
    }catch(error){
      console.log(error.message)
    }
  }

  const changeBookingStatus = async (bookingId,status) => {
    try{
      const {data} = await axios.post('/api/bookings/change-status',{bookingId,status});
      if(data.success){
        toast.success(data.message);
        fetchOwnerBookings();
      }else{
        toast.error(data.message)
      }
    }catch(error){
      toast.error(error.message)
    }
  } 

  useEffect(()=>{
    fetchOwnerBookings();
  },[]) 

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 40 }}
      transition={{ duration: 0.7 }}
      className='px-4 pt-10 md:px-10 w-full'
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
      >
        <Title title={"Manage Bookings"} subTitle={"Track all customer bookings, approve or cancel requests, and manage booking statuses"}/>
      </motion.div>

      <div className='max-w-3xl w-full border-borderColor text-left text-sm text-gray-600'>
        <table className='w-full border-collapse text-left text-sm text-gray-600'>
          <thead className='text-gray-500'>
            <tr>
              <th className='p-3 font-medium max-md:hidden'>Car</th>
              <th className='p-3 font-medium'>Date Range</th>
              <th className='p-3 font-medium max-md:hidden'>Total</th>
              <th className='p-3 font-medium'>Payment</th>  
              <th className='p-3 font-medium'>Actions</th>
            </tr>
          </thead>
          <tbody>
            <AnimatePresence>
              {bookings.map((booking, index) => (
                <motion.tr
                  key={index}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 40 }}
                  transition={{ duration: 0.7, delay: 0.2 + index * 0.08 }}
                  className='border-t border-borderColor text-gray-500'
                >
                  <td className='p-3 flex items-center gap-3'>
                    <img src={booking.car.image} alt="car" className='w-12 h-12 aspect-square rounded-md object-cover' />
                    <p className='font-medium max-md:hidden'>{booking.car.brand} {booking.car.model}</p> 
                  </td>

                  <td className='p-3 max-md:hidden'>
                    {booking.pickupDate.split('T')[0]} • {booking.returnDate.split('T')[0]}
                  </td>

                  <td className='p-3'>${booking.price}/day</td>

                  <td className='p-3 max-md:hidden'>
                    <span className={`bg-gray-100 px-3 py-1 rounded-full text-xs `}>
                      offline
                    </span>
                  </td>

                  <td className='p-3'>
                    {booking.status === 'pending' ? (
                      <select value={booking.status} 
                        onChange={(e)=>changeBookingStatus(booking._id,e.target.value)}
                        className='px-2 py-1.5 mt-1 text-gray-500 border border-borderColor rounded-md outline-none'>
                        <option value="confirmed">Confirmed</option>
                        <option value="pending">Pending</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    ) : (
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${booking.status === 'confirmed' ? 'bg-green-100 text-green-500' : 'bg-red-100 text-red-500'}`}>{booking.status}</span>
                    )}
                  </td>
                </motion.tr>
              ))}
            </AnimatePresence>
          </tbody>
        </table>
      </div>
    </motion.div>
  )
}

export default ManageBookings;