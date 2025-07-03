import React, { useState, useEffect } from 'react'
import Title from './Title'
import { assets } from '../assets/assets'
import CarCard from './CarCard'
import { useNavigate } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'
import { motion } from 'framer-motion'
import Loader from './Loader'

const FeaturedSection = () => {
  const { cars } = useAppContext();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading if cars are fetched asynchronously
    if (cars && cars.length > 0) {
      setLoading(false);
    } else {
      setLoading(true);
    }
  }, [cars]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 , ease: "easeOut" }}
      className="flex flex-col items-center py-24 px-6 md:px-16 lg:px-24 xl:px-32"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 1 }}
      >
        <Title title='Featured Vehicles' subTitle='Explore our selection of premium vehicles available for your next adventure.' />
      </motion.div>

      {loading ? (
        <div className="w-full flex justify-center items-center min-h-[200px]">
          <Loader />
        </div>
      ) : (
        <motion.div
          initial={{opacity:0 , y:100}}
          whileInView={{opacity:1 , y:0}}
          transition={{delay:0.5, duration:1}}
          className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-18'
        >
          {
            cars.slice(0, 6).map((car, index) => (
              <motion.div
                key={car._id || index}
                initial={{ opacity: 0, scale: 0.95}}
                animate={{ opacity: 1, scale: 1, }}
                transition={{ duration: 0.4, ease:"easeOut" }}
              >
                <CarCard car={car} />
              </motion.div>
            ))
          }
        </motion.div>
      )}

      <motion.button
        className='flex items-center justify-center gap-2 px-6 py-2 border border-borderColor hover:bg-gray-50 rounded-md mt-12 cursor-pointer'
        initial={{opacity:0, y:20}}
        whileInView={{opacity:1, y:0}}
        transition={{delay:0.6, duration:0.4}}
        whileHover={{ scale: 1.05 }}
        onClick={() => {
          navigate('/cars');
          window.scrollTo(0, 0);
        }}
      >
        Explore all cars <img src={assets.arrow_icon} alt="arrow" style={{ transform: "scaleX(-1)" }} />
      </motion.button>
    </motion.div>
  )
}

export default FeaturedSection