import React, { useState, useEffect } from 'react'
import { assets } from '../../assets/assets'
import Title from '../../components/owner/Title'
import { useAppContext } from '../../context/AppContext'
import { motion, AnimatePresence } from 'framer-motion'
import toast from 'react-hot-toast'

const Dashboard = () => {

  const { isOwner, axios } = useAppContext();

  const [data, setData] = useState({
    totalCars: 0,
    totalBookings: 0,
    pendingBookings: 0,
    completedBookings: 0,
    recentBookings: [],
    monthlyRevenue: 0
  })

  const dashboardCard = [
    { title: "Total Cars", value: data.totalCars, icon: assets.carIconColored },
    { title: "Total Bookings", value: data.totalBookings, icon: assets.listIconColored },
    { title: "Pending", value: data.pendingBookings, icon: assets.cautionIconColored },
    { title: "Confirmed", value: data.completedBookings, icon: assets.listIconColored },
  ]

  const fetchDashboardData = async () => {
    try {
      const res = await axios.get('/api/owner/dashboard');
      if (res.data.success) {
        setData(res.data.dashboardData);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (isOwner) {
      fetchDashboardData();
    }
  }, [isOwner])

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 40 }}
      transition={{ duration: 0.7 }}
      className="px-4 pt-10 md:px-10 flex-1"
    >

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
      >
        <Title title="Admin Dashboard" subTitle="Monitor overall platform performance including total cars, bookings, revenue, and recent activities" align="left" />
      </motion.div>

      <motion.div
        className='grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 my-8 max-w-3xl'
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: 0.12
            }
          }
        }}
      >
        {dashboardCard.map((card, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 + index * 0.08 }}
            className="flex gap-2 items-center justify-between p-4 rounded-md border border-borderColor"
          >
            <div>
              <h1 className='text-xs text-gray-500'>{card.title}</h1>
              <p className='text-lg font-semibold'>{card.value}</p>
            </div>
            <div className='flex items-center justify-center w-10 h-10 rounded-full bg-primary/10'>
              <img src={card.icon} alt="car-icon" className='h-4 w-4' />
            </div>
          </motion.div>
        ))}
      </motion.div>

      <div className='flex flex-wrap items-start gap-6 mb-8 w-full'>

        {/* Recent Bookings */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className='p-4 md:p-6 border border-borderColor rounded-md max-w-lg w-full'
        >
          <h1 className="text-lg font-medium">Recent Bookings</h1>
          <p className="text-gray-500">Latest customer bookings</p>

          <AnimatePresence>
            {data.recentBookings.map((booking, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 40 }}
                transition={{ duration: 0.7, delay: 0.2 + index * 0.08 }}
                className='mt-4 flex items-center justify-between'
              >
                <div className='flex items-center gap-2'>
                  <div className='hidden md:flex items-center justify-center w-12 h-12 rounded-full bg-primary/10'>
                    <img src={assets.listIconColored}
                      alt='icon' className='h-5 w-5'
                    />
                  </div>
                  <div>
                    <p>{booking.car.brand} {booking.car.model}</p>
                    <p className='text-sm text-gray-500'>{booking.createdAt.split('T')[0]}</p>
                  </div>
                </div>
                <div className='flex items-center gap-2 font-medium'>
                  <p className='text-sm text-gray-500'>${booking.price}</p>
                  <p className='px-3 py-0.5 border border-borderColor rounded-full text-sm'>{booking.status}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Monthly Revenue */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className='p-4 md:p-6 mb-6 border border-borderColor rounded-md w-full md:max-w-xs'
        >
          <h1 className="text-lg font-medium">Monthly Revenue</h1>
          <p className="text-gray-500">Revenue for current month</p>
          <p className="text-3xl mt-6 font-semibold text-primary">${data.monthlyRevenue}</p>
        </motion.div>

      </div>

    </motion.div>
  )
}

export default Dashboard;