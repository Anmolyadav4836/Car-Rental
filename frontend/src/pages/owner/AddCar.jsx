import React, { useState } from 'react'
import Title from '../../components/owner/Title'
import { assets } from '../../assets/assets'
import { useAppContext } from '../../context/AppContext'
import {toast} from 'react-hot-toast';
import { motion } from 'framer-motion'
import Loader from '../../components/Loader'

const inputLayout1 = [
    {label: "Brand", placeholder: "e.g. BMW, mercedes, Audi...", type: "text", name: "brand", required: true},
    {label: "Model", placeholder: "e.g. X5, E-Class, M4...", type: "text", name: "model", required: true},
]

const AddCar = () => {

  const {axios} = useAppContext();

  const [image , setImage] = useState(null)
  const [car, setCar] = useState({
    brand: '',
    model: '',
    year: 0,
    pricePerDay: 0,
    category: '',
    seating_capacity: 0,
    fuel_type: '',
    transmission: '',
    location: '',
    description: '',
  })

  const [isLoading , setIsLoading] = useState(false);

  const onSubmitHandler = async (e) =>{
    if(isLoading){
      return null;
    }
    setIsLoading(true);
    try{
      e.preventDefault();
      const formData = new FormData();
      formData.append('image', image);
      formData.append('cardata', JSON.stringify(car));

      const {data} = await axios.post('/api/owner/add-car',formData);

      if(data.success){
        toast.success(data.message);setImage(null);
        setCar({
          brand: '',
          model: '',
          year: 0,
          pricePerDay: 0,
          category: '',
          seating_capacity: 0,
          fuel_type: '',
          transmission: '',
          location: '',
          description: '',
        })
      }else{
        toast.error(data.message);
      }
      
    }catch(error){
      toast.error(error.message);
    }finally{
      setIsLoading(false);
    }
  }

  const onChangeHandler = (e) =>{
    setCar({...car, [e.target.name]: e.target.value});
  }

  // Show loader while submitting
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[300px] w-full">
        <Loader />
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 40 }}
      transition={{ duration: 0.7 }}
      className='px-4 py-10 md:px-10 flex-1'
    >

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
      >
        <Title title="Add New Car" subTitle={"Fill in details to list a new car for booking, including pricing, availability, and car specifications."}/>
      </motion.div>

      <motion.form
        className='flex flex-col gap-5 text-gray-500 text-sm mt-6 max-w-xl'
        onSubmit={onSubmitHandler}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.3 }}
      >
        {/* upload car image */}
        <motion.div
          className='flex items-center gap-2 w-full'
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <label htmlFor="car-image">
            <img src={image ? URL.createObjectURL(image) : assets.upload_icon} 
              alt="upload icon" className='h-14 rounded cursor-pointer'/>
            <input id="car-image" accept="image/*" hidden type="file" onChange={e => setImage(e.target.files[0])} />
          </label>
          <p className="text-sm text-gray-500">Upload a picture of your car</p>
        </motion.div>

        {/* car brand and model */}
        <motion.div
          className='grid grid-cols-1 md:grid-cols-2 gap-6 '
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          {
            inputLayout1.map((input, index) => (
              <div key={index} className='flex flex-col w-full'>
                <label htmlFor={input.name}></label>
                <p className='text-sm text-gray-500'>{input.label}</p>
                <input
                  className='px-3 py-2 mt-1 border border-borderColor rounded-md outline-none'
                  required
                  id={input.name}
                  type={input.type}
                  placeholder={input.placeholder}
                  value={car[input.name]}
                  onChange={e => setCar({...car, [input.name]: e.target.value})}
                />
              </div>
            ))
          }
        </motion.div>

        {/* year dailyrate and category */}
        <motion.div
          className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          {/* year */}
          <div className='flex flex-col w-full'>  
            <label htmlFor="year">Year</label>
            <input placeholder="2025" required className="px-3 py-2 mt-1 border border-borderColor rounded-md outline-none" type="number" value={car.year} id='year' name='year'
              onChange={onChangeHandler}
            />
          </div>
          {/* price per day */}
          <div className='flex flex-col w-full'>
            <label htmlFor="pricePerDay">Price Per Day</label>
            <input placeholder="$100" required className="px-3 py-2 mt-1 border border-borderColor rounded-md outline-none" type="number" value={car.pricePerDay} id='pricePerDay' name='pricePerDay'
              onChange={onChangeHandler}
            />
          </div>
          {/* category */}
          <div className='flex flex-col w-full'>
            <label htmlFor="category">Category</label>
            <select className="px-3 py-2 mt-1 border border-borderColor rounded-md outline-none" id='category' name='category'
              onChange={onChangeHandler}
              value={car.category}
            >
              <option value>Select a category</option>
              <option value="SUV">SUV</option>
              <option value="Sedan">Sedan</option>
              <option value="Van">Van</option>
            </select>
          </div>
        </motion.div>

        {/* Transmission , Fuel Type and Seating Capacity */}
        <motion.div
          className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          {/* Transmission */}
          <div className='flex flex-col w-full'>
            <label htmlFor="transmission">Transmission</label>
            <select className="px-3 py-2 mt-1 border border-borderColor rounded-md outline-none" id='transmission' name='transmission'
              onChange={onChangeHandler}
              value={car.transmission}
            >
              <option value>Select a transmission</option>
              <option value="Manual">Manual</option>
              <option value="Automatic">Automatic</option>
              <option value="Semi-Automatic">Semi-Automatic</option>
            </select>
          </div>
          {/* Fuel Type */}
          <div className='flex flex-col w-full'>
            <label htmlFor="fuel_type">Fuel Type</label>
            <select className="px-3 py-2 mt-1 border border-borderColor rounded-md outline-none" id='fuel_type' name='fuel_type'
              onChange={onChangeHandler}
              value={car.fuel_type}
            > 
              <option value>Select a fuel type</option>
              <option value="Gas">Gas</option>
              <option value="Diesel">Diesel</option>
              <option value="Petrol">Petrol</option>
              <option value="Electric">Electric</option> 
              <option value="Hybrid">Hybrid</option>
            </select>
          </div>
          {/* Seating Capacity */}
          <div className='flex flex-col w-full'>
            <label htmlFor="seating_capacity">Seating Capacity</label>
            <input placeholder="4" required className="px-3 py-2 mt-1 border border-borderColor rounded-md outline-none" type="number" value={car.seating_capacity} id='seating_capacity' name='seating_capacity'
              onChange={onChangeHandler}
            />
          </div>
        </motion.div>

        {/* Location */}
        <motion.div
          className='flex flex-col w-full'
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <label htmlFor="location">Location</label>
          <select className="px-3 py-2 mt-1 border border-borderColor rounded-md outline-none" id='location' name='location'
            onChange={onChangeHandler}
            value={car.location}
          >
            <option value>Select a location</option>
            <option value="New York">New York</option>
            <option value="Los Angeles">Los Angeles</option>
            <option value="Houston">Houston</option>
            <option value="Chicago">Chicago</option>
          </select>  
        </motion.div>

        {/* Description */}
        <motion.div
          className='flex flex-col w-full'
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
        >
          <label htmlFor="description">Description</label>
          <textarea rows="5" placeholder="e.g. A luxurious SUV with a spacious interior and a powerful engine." className="px-3 py-2 mt-1 border border-borderColor rounded-md outline-none" id='description' name='description'
            onChange={onChangeHandler}
            value={car.description}
          />
        </motion.div>

        {/* Submit */}
        <motion.button
          type="submit"
          className='flex items-center gap-2 px-4 py-2.5 mt-4 bg-primary text-white rounded-md font-medium w-max cursor-pointer'
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.0 }}
        >
          <img src={assets.tick_icon}/>{isLoading? 'Listing...' : 'List Your Car'}
        </motion.button>

      </motion.form>
    </motion.div>
  )
}

export default AddCar