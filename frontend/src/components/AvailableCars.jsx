import React, { useEffect, useState } from 'react'
import Title from './Title'
import { assets } from '../assets/assets'
import CarCard from './CarCard'
import { useSearchParams } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import toast from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';

const AvailableCars = () => {
    const [searchParams] = useSearchParams();
    const pickupLocation = searchParams.get('pickupLocation');
    const pickupDate = searchParams.get('pickupDate');
    const returnDate = searchParams.get('returnDate');

    const { cars, axios } = useAppContext();

    const isSearchData = pickupLocation && pickupDate && returnDate;

    const [searchTerm, setSearchTerm] = useState('');
    const [filteredCars, setFilteredCars] = useState([]);

    const searchCarsAvailable = async () => {
        try {
            const { data } = await axios.post('/api/bookings/checkAvailability', { pickupDate, returnDate, location: pickupLocation });
            if (data.success) {
                setFilteredCars(data.availableCars);
                if (data.availableCars.length === 0) {
                    toast("No cars found");
                }
            } else {
                console.log(data.message)
            }
        } catch (error) {
            console.log(error.message)
        }
    }

    const applyFilter = () => {
        if (searchTerm === '') {
            setFilteredCars(cars)
            return;
        }

        const filtered = (cars || []).filter((car) => {
            return car.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
                car.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
                car.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                car.transmission.toLowerCase().includes(searchTerm.toLowerCase())
        })
        setFilteredCars(filtered)
    }

    useEffect(() => {
        if (isSearchData) searchCarsAvailable();
        else setFilteredCars(cars || []);
        // eslint-disable-next-line
    }, [cars, isSearchData, pickupLocation, pickupDate, returnDate]);

    useEffect(() => {
        if (cars && !isSearchData) applyFilter();
        // eslint-disable-next-line
    }, [searchTerm, cars]);

    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.7 }}
        >
            <div className='flex flex-col items-center py-20 bg-light max-md:px-4'>
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                >
                    <Title title="Available Cars" subTitle="Browse our selection of premium vehicles available for your next adventure" />
                </motion.div>

                {/* search components */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3, duration: 0.4 }}
                    className='flex items-center bg-white px-4 mt-6 max-w-140 w-full h-12 rounded-full shadow'
                >
                    <motion.img
                        src={assets.search_icon}
                        alt='search'
                        className="w-4.5 h-4.5 mr-2"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4, duration: 0.3 }}
                    />
                    <motion.input
                        placeholder="Search by make, model, or features"
                        className="w-full h-full outline-none text-gray-500"
                        type="text"
                        onChange={(e) => setSearchTerm(e.target.value)}
                        value={searchTerm}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5, duration: 0.3 }}
                    />
                    <motion.img
                        src={assets.filter_icon}
                        alt='filter'
                        className='w-4.5 h-4.5 ml-2'
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.6, duration: 0.3 }}
                    />
                </motion.div>
            </div>

            <div className="px-6 md:px-16 lg:px-24 xl:px-32 mt-10">
                <motion.p
                    className="text-gray-500 xl:px-20 max-w-7xl mx-auto"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.4 }}
                >
                    Showing {filteredCars.filter(car => car.isAvailable).length} Cars
                </motion.p>

                <motion.div
                    className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-4 xl:px-20 max-w-7xl mx-auto'
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
                    <AnimatePresence>
                        {filteredCars
                            .filter(car => car.isAvailable)
                            .map((car, index) => (
                                <motion.div
                                    key={car._id || index}
                                    initial={{ opacity: 0, y: 40 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 40 }}
                                    transition={{ duration: 0.7, delay: 0.2 + index * 0.08 }}
                                    whileHover={{ scale: 1.03, boxShadow: "0 8px 24px rgba(0,0,0,0.08)" }}
                                >
                                    <CarCard car={car} />
                                </motion.div>
                            ))}
                    </AnimatePresence>
                </motion.div>
            </div>
        </motion.div>
    )
}

export default AvailableCars;