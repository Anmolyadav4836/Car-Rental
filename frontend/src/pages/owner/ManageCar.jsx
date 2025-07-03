import React, { useEffect, useState } from 'react'
import { assets } from '../../assets/assets'
import Title from '../../components/owner/Title'
import { useAppContext } from '../../context/AppContext'
import { toast } from 'react-hot-toast'
import { motion, AnimatePresence } from 'framer-motion'

const ManageCar = () => {

  const { axios, isOwner } = useAppContext();
  const [cars, setCars] = useState([])

  const fetchOwnerCars = async () => {
    try {
      const { data } = await axios.get('/api/owner/cars');
      if (data.success) {
        setCars(data.cars);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  }

  const toggleCarAvailability = async (carId) => {
    try {
      const { data } = await axios.post('/api/owner/toggle-car', { carId });
      if (data.success) {
        toast.success(data.message);
        fetchOwnerCars();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  }

  const deleteCar = async (carId) => {
    try {
      const confirm = window.confirm("Are you sure you want to delete this car?");
      if (!confirm) return;
      const { data } = await axios.post('/api/owner/delete-car', { carId });
      if (data.success) {
        toast.success(data.message);
        fetchOwnerCars();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  }

  useEffect(() => {
    isOwner && fetchOwnerCars();
  }, [isOwner])

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
        <Title title={"Manage Cars"} subTitle={"View all listed cars, update their details, or remove them from the booking platform"} />
      </motion.div>

      <div className='max-w-3xl w-full border-borderColor text-left text-sm text-gray-600'>
        <table className='w-full border-collapse text-left text-sm text-gray-600'>
          <thead className='text-gray-500'>
            <tr>
              <th className='p-3 font-medium'>Car</th>
              <th className='p-3 font-medium max-md:hidden'>Category</th>
              <th className='p-3 font-medium'>Price</th>
              <th className='p-3 font-medium max-md:hidden'>Status</th>
              <th className='p-3 font-medium'>Actions</th>
            </tr>
          </thead>
          <tbody>
            <AnimatePresence>
              {cars.map((car, index) => (
                <motion.tr
                  key={index}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 40 }}
                  transition={{ duration: 0.7, delay: 0.2 + index * 0.08 }}
                  className='border-t border-borderColor'
                >
                  <td className='p-3 flex items-center gap-3'>
                    <img src={car.image} alt="car" className='w-12 h-12 aspect-square rounded-md object-cover' />
                    <div className='max-md:hidden'>
                      <p className='font-medium'>{car.brand} {car.model}</p>
                      <p className='font-medium'>{car.seating_capacity} Seats • {car.transmission}</p>
                    </div>
                  </td>

                  <td className='p-3 max-md:hidden'>
                    {car.category}
                  </td>

                  <td className='p-3'>${car.pricePerDay}/day</td>

                  <td className='p-3 max-md:hidden'>
                    <span className={`px-3 py-1 rounded-full text-xs ${car.isAvailable ? 'bg-green-100 text-green-500' : 'bg-red-100 text-red-500'}`}>
                      {car.isAvailable ? 'Available' : 'Not Available'}
                    </span>
                  </td>

                  <td className='flex items-center p-3'>
                    <img onClick={() => toggleCarAvailability(car._id)} src={car.isAvailable ? assets.eye_close_icon : assets.eye_icon} alt="eye" className=' cursor-pointer' />
                    <img onClick={() => deleteCar(car._id)} src={assets.delete_icon} alt="delete" className=' cursor-pointer' />
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

export default ManageCar