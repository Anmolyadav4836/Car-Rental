import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { assets, dummyCarData } from '../assets/assets';
import { useAppContext } from '../context/AppContext';
import Loader from './Loader';
import toast from 'react-hot-toast';

const Features = [
    "360 Camera", "GPS", "Rear View Mirror", "Bluetooth", "Heated Seats"
]

const CarDetails = () => {

    const {axios , cars,pickupDate, setPickupDate, returnDate, setReturnDate} = useAppContext();
    const navigate = useNavigate();
    const { id } = useParams();

    // const carData = dummyCarData.find(car => car._id === id);
    const [carData, setCarData] = useState(null);

    const handleSubmit = async (e)=>{
            e.preventDefault();
        try{
            const {data} = await axios.post('/api/bookings/create',{car:id,pickupDate,returnDate});
            if(data.success){
                toast.success(data.message);
                navigate('/my-bookings');
            }else{
                toast.error(data.message)
            }
        }catch(error){
            toast.error(error.message)
        }
    }
 

    useEffect(() => {
        setCarData(cars.find(car => car._id === id));
    }, [cars ,id]);


    return carData ? (
        <div className='px-6 md:px-16 lg:px-24 xl:px-32 mt-16'>

            <button onClick={() => navigate(-1)}
                className='flex items-center gap-2 mb-6 text-gray-500 cursor-pointer'>
                <img src={assets.arrow_icon} alt='arrow' className='rotate-180 opacity-65'/>
                Back to all cars
            </button>

            <div className='grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12'>

                <div className='lg:col-span-2'>
                    <img src={carData.image} alt='car-image' 
                        className='w-full h-auto md:max-h-100 object-cover rounded-xl mb-6 shadow-md'
                    />
                    <div className='space-y-6'>
                        <div>
                            <h1 className='text-3xl font-bold'>{carData.brand} {carData.model}</h1>
                            <p className='text-gray-500 text-lg'>{carData.category} • {carData.year}</p>
                        </div>

                        <hr className='border-borderColor my-6' />
                        <div className='grid grid-cols-2 sm:grid-cols-4 gap-4'>
                            <div className='flex flex-col items-center bg-light p-4 rounded-lg'>
                                <img src={assets.users_icon} alt='seat icon' className='h-5 mb-2'/>
                                {carData.seating_capacity} Seats
                            </div>
                            <div className='flex flex-col items-center bg-light p-4 rounded-lg'>
                                <img src={assets.fuel_icon} alt='fuel icon' className='h-5 mb-2'/>
                                {carData.fuel_type}
                            </div>
                            <div className='flex flex-col items-center bg-light p-4 rounded-lg'>
                                <img src={assets.car_icon} alt='car icon' className='h-5 mb-2'/>
                                {carData.transmission}
                            </div>
                            <div className='flex flex-col items-center bg-light p-4 rounded-lg'>
                                <img src={assets.location_icon} alt='location icon' className='h-5 mb-2'/>
                                {carData.location}
                            </div>
                        </div>

                        <div>
                            <h1 className="text-xl font-medium mb-3">Description</h1>
                            <p className="text-gray-500">{carData.description}</p>
                        </div>

                        <div>
                            <h1 className="text-xl font-medium mb-3">Features</h1>
                            <ul className='grid grid-cols-1 sm:grid-cols-2 gap-2'>
                                {
                                    Features.map((feature, index) => (
                                        <li key={index} className='flex items-center text-gray-500'>
                                            <img src={assets.check_icon} alt='check icon' className='h-4 mr-2'/>
                                            {feature}
                                        </li>
                                    ))
                                }
                            </ul>
                        </div>
                    </div>
                </div>

                <form onSubmit={handleSubmit}  className='shadow-lg h-max sticky top-18 rounded-xl p-6 space-y-6 text-gray-500'>

                    <p className='flex items-center justify-between text-2xl text-gray-800 font-semibold'>
                        ${carData.pricePerDay}
                        <span className="text-base text-gray-400 font-normal">per day</span>
                    </p>

                    <hr className="border-borderColor my-6" />

                    <div className='flex flex-col gap-2'>
                        <label htmlFor="pickup-date">Pickup Date</label>
                        <input
                            className="border border-borderColor px-3 py-2 rounded-lg"
                            required
                            id="pickup-date"
                            min={new Date().toISOString().split('T')[0]}
                            type="date"
                            value={pickupDate}
                            onChange={(e)=>setPickupDate(e.target.value)}
                        />
                    </div>
                    <div className='flex flex-col gap-2'>
                        <label htmlFor="return-date">Return Date</label>
                        <input
                            className="border border-borderColor px-3 py-2 rounded-lg"
                            required
                            id="return-date"
                            min={new Date().toISOString().split('T')[0]}
                            type="date"
                            value={returnDate}
                            onChange={(e)=>setReturnDate(e.target.value)}
                        />
                    </div>

                    <button className="w-full bg-primary hover:bg-primary-dull transition-all py-3 font-medium text-white rounded-xl cursor-pointer">
                        Book Now
                    </button>

                    <p className="text-center text-sm">No credit card required to reserve</p>
                </form>

            </div>

        </div>
    ): <Loader />
}

export default CarDetails